import { z } from "zod";

import type {
  AuditFindingSource,
  DashboardSource,
  PortfolioCampaignSource,
  VelocitySource,
} from "../campaign-sources";
import {
  campaignLifecycleSchema,
  PIPELINE_STAGE_KEYS,
  pipelineStageKeySchema,
  toneSchema,
  utcDateTimeSchema,
  uuidSchema,
  type Tone,
} from "../shared";
import { STAGE_LABELS } from "./stages";

export const portfolioRowReadModelSchema = z.strictObject({
  campaignId: uuidSchema,
  name: z.string().min(1),
  lifecycle: campaignLifecycleSchema,
  currentStage: pipelineStageKeySchema.nullable(),
  statusLabel: z.string().min(1),
  statusTone: toneSchema,
  listingCount: z.number().int().min(0),
  readyCount: z.number().int().min(0),
  sentCount: z.number().int().min(0),
});

export const funnelStageReadModelSchema = z.strictObject({
  key: pipelineStageKeySchema,
  label: z.string().min(1),
  count: z.number().int().min(0),
});

export const velocityMetricReadModelSchema = z.strictObject({
  key: z.enum([
    "discovered",
    "enriched",
    "drafted",
    "reviewed",
    "sent",
    "replied",
  ]),
  label: z.string().min(1),
  value: z.number().min(0),
  unit: z.enum(["count", "per-hour", "percent"]),
});

export const auditAlertReadModelSchema = z.strictObject({
  id: uuidSchema,
  code: z.enum([
    "missing-citation",
    "thin-record",
    "low-confidence-draft",
    "suppression-match",
    "forbidden-claim",
    "failed-stage",
  ]),
  severity: z.enum(["info", "warning", "critical"]),
  message: z.string().min(1),
  count: z.number().int().min(1),
});

export const dashboardReadModelSchema = z.strictObject({
  kind: z.literal("dashboard-read-model"),
  portfolio: z.array(portfolioRowReadModelSchema),
  funnel: z.array(funnelStageReadModelSchema).max(6),
  velocity: z.array(velocityMetricReadModelSchema),
  auditAlerts: z.array(auditAlertReadModelSchema),
  generatedAt: utcDateTimeSchema,
});

export type PortfolioRowReadModel = z.infer<typeof portfolioRowReadModelSchema>;
export type FunnelStageReadModel = z.infer<typeof funnelStageReadModelSchema>;
export type VelocityMetricReadModel = z.infer<
  typeof velocityMetricReadModelSchema
>;
export type AuditAlertReadModel = z.infer<typeof auditAlertReadModelSchema>;
export type DashboardReadModel = z.infer<typeof dashboardReadModelSchema>;

const LIFECYCLE_TONES: Record<PortfolioCampaignSource["lifecycle"], Tone> = {
  draft: "neutral",
  active: "active",
  paused: "warning",
  archived: "neutral",
};

const VELOCITY_LABELS: Record<VelocityMetricReadModel["key"], string> = {
  discovered: "Discovered",
  enriched: "Enriched",
  drafted: "Drafted",
  reviewed: "Reviewed",
  sent: "Sent",
  replied: "Replied",
};

const AUDIT_SEVERITIES: Record<
  AuditFindingSource["code"],
  AuditAlertReadModel["severity"]
> = {
  "missing-citation": "warning",
  "thin-record": "info",
  "low-confidence-draft": "warning",
  "suppression-match": "critical",
  "forbidden-claim": "critical",
  "failed-stage": "critical",
};

function auditMessage(finding: AuditFindingSource): string {
  const one = finding.count === 1;
  const noun = one ? "" : "s";

  switch (finding.code) {
    case "missing-citation":
      return `${finding.count} draft${noun} cite${one ? "s" : ""} no retained evidence.`;
    case "thin-record":
      return `${finding.count} listing${noun} hold${one ? "s" : ""} only a business name and city.`;
    case "low-confidence-draft":
      return `${finding.count} low-confidence draft${noun} need${one ? "s" : ""} human resolution.`;
    case "suppression-match":
      return `${finding.count} listing${noun} match${one ? "es" : ""} a suppression entry.`;
    case "forbidden-claim":
      return `${finding.count} draft${noun} contain${one ? "s" : ""} a prohibited claim.`;
    case "failed-stage":
      return `${finding.count} pipeline stage${noun} failed.`;
  }
}

export function toPortfolioRowReadModel(
  source: PortfolioCampaignSource,
): PortfolioRowReadModel {
  const stageLabel =
    source.currentStage === null
      ? null
      : STAGE_LABELS[source.currentStage].toLowerCase();

  let statusLabel: string;
  if (source.lifecycle === "draft") {
    statusLabel = "Draft not initialized";
  } else if (source.lifecycle === "archived") {
    statusLabel = "Archived";
  } else if (stageLabel === null) {
    statusLabel = source.lifecycle === "paused" ? "Paused" : "Awaiting run";
  } else {
    statusLabel =
      source.lifecycle === "paused"
        ? `Paused during ${stageLabel}`
        : `Running ${stageLabel}`;
  }

  return {
    campaignId: source.campaignId,
    name: source.name,
    lifecycle: source.lifecycle,
    currentStage: source.currentStage,
    statusLabel,
    statusTone: LIFECYCLE_TONES[source.lifecycle],
    listingCount: source.listingCount,
    readyCount: source.readyCount,
    sentCount: source.sentCount,
  };
}

export function toFunnelReadModel(
  stageCounts: DashboardSource["stageCounts"],
): FunnelStageReadModel[] {
  return PIPELINE_STAGE_KEYS.map((key) => ({
    key,
    label: STAGE_LABELS[key],
    count: stageCounts[key] ?? 0,
  }));
}

/**
 * Velocity is a rate whenever the source window has duration; a zero-length
 * window can only report the raw counts it observed.
 */
export function toVelocityReadModel(
  velocity: VelocitySource,
): VelocityMetricReadModel[] {
  const rate = velocity.windowHours > 0;

  return (Object.keys(VELOCITY_LABELS) as VelocityMetricReadModel["key"][]).map(
    (key) => ({
      key,
      label: VELOCITY_LABELS[key],
      value: rate
        ? Math.round((velocity[key] / velocity.windowHours) * 100) / 100
        : velocity[key],
      unit: rate ? ("per-hour" as const) : ("count" as const),
    }),
  );
}

export function toAuditAlertsReadModel(
  findings: readonly AuditFindingSource[],
): AuditAlertReadModel[] {
  return findings
    .filter((finding) => finding.count > 0)
    .map((finding) => ({
      id: finding.id,
      code: finding.code,
      severity: AUDIT_SEVERITIES[finding.code],
      message: auditMessage(finding),
      count: finding.count,
    }));
}

export function toDashboardReadModel(
  source: DashboardSource,
): DashboardReadModel {
  return {
    kind: "dashboard-read-model",
    portfolio: source.campaigns.map(toPortfolioRowReadModel),
    funnel: toFunnelReadModel(source.stageCounts),
    velocity: toVelocityReadModel(source.velocity),
    auditAlerts: toAuditAlertsReadModel(source.auditFindings),
    generatedAt: source.generatedAt,
  };
}
