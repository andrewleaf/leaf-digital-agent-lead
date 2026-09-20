import { z } from "zod";

import type {
  ListingQueueSource,
  PipelineSource,
  PipelineStageRunSource,
} from "../campaign-sources";
import {
  campaignLifecycleSchema,
  PIPELINE_STAGE_ORDINALS,
  pipelineStageKeySchema,
  queueStatusSchema,
  stageExecutionStatusSchema,
  toneSchema,
  utcDateTimeSchema,
  uuidSchema,
  type QueueStatus,
  type Tone,
} from "../shared";
import {
  STAGE_LABELS,
  STAGE_STATUS_LABELS,
  STAGE_STATUS_TONES,
} from "./stages";

export const pipelineStageReadModelSchema = z.strictObject({
  key: pipelineStageKeySchema,
  ordinal: z.number().int().min(1).max(6),
  status: stageExecutionStatusSchema,
  label: z.string().min(1),
  statusLabel: z.string().min(1),
  tone: toneSchema,
  progress: z.number().int().min(0).max(100).nullable(),
  metricLabel: z.string().nullable(),
  metricValue: z.string().nullable(),
  errorSummary: z.string().nullable(),
});

export const workbenchRowReadModelSchema = z.strictObject({
  listingId: uuidSchema,
  businessName: z.string().min(1),
  queueStatus: queueStatusSchema,
  stageLabel: z.string().min(1),
  stageTone: toneSchema,
  citationsLabel: z.string(),
  actionLabel: z.string().min(1),
  needsAttention: z.boolean(),
});

export const pipelineReadModelSchema = z.strictObject({
  kind: z.literal("pipeline-read-model"),
  campaignId: uuidSchema,
  runId: uuidSchema,
  lifecycle: campaignLifecycleSchema,
  title: z.string().min(1),
  processing: z.boolean(),
  stages: z.array(pipelineStageReadModelSchema).max(6),
  counts: z.strictObject({
    all: z.number().int().min(0),
    needsAttention: z.number().int().min(0),
    readyReview: z.number().int().min(0),
    completed: z.number().int().min(0),
  }),
  rows: z.array(workbenchRowReadModelSchema),
  generatedAt: utcDateTimeSchema,
});

export type PipelineStageReadModel = z.infer<
  typeof pipelineStageReadModelSchema
>;
export type WorkbenchRowReadModel = z.infer<typeof workbenchRowReadModelSchema>;
export type PipelineReadModel = z.infer<typeof pipelineReadModelSchema>;

const QUEUE_STATUS_TONES: Record<QueueStatus, Tone> = {
  new: "neutral",
  enriched: "active",
  drafted: "active",
  "needs-edit": "warning",
  "no-email": "warning",
  skipped: "neutral",
  ready: "success",
  sent: "success",
  replied: "success",
  "follow-up-due": "warning",
};

const QUEUE_STATUS_ACTIONS: Record<QueueStatus, string> = {
  new: "View research",
  enriched: "View research",
  drafted: "Review draft",
  "needs-edit": "Edit draft",
  "no-email": "Add contact",
  skipped: "Restore listing",
  ready: "Review draft",
  sent: "View outreach",
  replied: "Log reply",
  "follow-up-due": "Send follow-up",
};

const ATTENTION_STATUSES: ReadonlySet<QueueStatus> = new Set([
  "needs-edit",
  "no-email",
  "follow-up-due",
]);

const COMPLETED_STATUSES: ReadonlySet<QueueStatus> = new Set([
  "sent",
  "replied",
]);

function stageProgress(stage: PipelineStageRunSource): number | null {
  if (stage.status === "succeeded") return 100;
  if (stage.status === "pending") return 0;
  if (stage.totalCount === null || stage.totalCount === 0) return null;
  if (stage.processedCount === null) return null;

  return Math.min(
    100,
    Math.round((stage.processedCount / stage.totalCount) * 100),
  );
}

function stageMetric(
  stage: PipelineStageRunSource,
): Pick<PipelineStageReadModel, "metricLabel" | "metricValue"> {
  if (stage.totalCount === null || stage.processedCount === null) {
    return { metricLabel: null, metricValue: null };
  }

  return {
    metricLabel: "Processed",
    metricValue: `${stage.processedCount} / ${stage.totalCount}`,
  };
}

export function toPipelineStageReadModel(
  stage: PipelineStageRunSource,
): PipelineStageReadModel {
  return {
    key: stage.key,
    ordinal: PIPELINE_STAGE_ORDINALS[stage.key],
    status: stage.status,
    label: STAGE_LABELS[stage.key],
    statusLabel: STAGE_STATUS_LABELS[stage.status],
    tone: STAGE_STATUS_TONES[stage.status],
    progress: stageProgress(stage),
    ...stageMetric(stage),
    errorSummary: stage.errorSummary,
  };
}

function citationsLabel(listing: ListingQueueSource): string {
  if (listing.citationCount > 0) {
    return `${listing.citationCount} verified ${
      listing.citationCount === 1 ? "fact" : "facts"
    }`;
  }

  return listing.needsManualResearch
    ? "Manual research required"
    : "No citable facts yet";
}

export function toWorkbenchRowReadModel(
  listing: ListingQueueSource,
): WorkbenchRowReadModel {
  const needsAttention =
    ATTENTION_STATUSES.has(listing.queueStatus) ||
    listing.needsManualResearch ||
    listing.suppressed ||
    listing.draftConfidence === "low";

  return {
    listingId: listing.listingId,
    businessName: listing.businessName,
    queueStatus: listing.queueStatus,
    stageLabel: STAGE_LABELS[listing.currentStage],
    stageTone: QUEUE_STATUS_TONES[listing.queueStatus],
    citationsLabel: citationsLabel(listing),
    actionLabel: QUEUE_STATUS_ACTIONS[listing.queueStatus],
    needsAttention,
  };
}

export function toPipelineReadModel(source: PipelineSource): PipelineReadModel {
  const stages = [...source.stages]
    .sort(
      (a, b) => PIPELINE_STAGE_ORDINALS[a.key] - PIPELINE_STAGE_ORDINALS[b.key],
    )
    .map(toPipelineStageReadModel);
  const rows = source.listings.map(toWorkbenchRowReadModel);

  return {
    kind: "pipeline-read-model",
    campaignId: source.campaignId,
    runId: source.runId,
    lifecycle: source.lifecycle,
    title: source.campaignName,
    processing: source.stages.some((stage) => stage.status === "running"),
    stages,
    counts: {
      all: rows.length,
      needsAttention: rows.filter((row) => row.needsAttention).length,
      readyReview: rows.filter((row) => row.queueStatus === "ready").length,
      completed: rows.filter((row) => COMPLETED_STATUSES.has(row.queueStatus))
        .length,
    },
    rows,
    generatedAt: source.generatedAt,
  };
}
