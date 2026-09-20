import { z } from "zod";

import {
  campaignProofInputSchema,
  discoverySettingsSchema,
  orderedLabelSchema,
  researchSettingsSchema,
} from "./campaign-commands";
import {
  campaignLifecycleSchema,
  confidenceSchema,
  pipelineStageKeySchema,
  queueStatusSchema,
  stageExecutionStatusSchema,
  utcDateTimeSchema,
  uuidSchema,
  voiceProfileSchema,
} from "./shared";

/**
 * Source records are the persisted shape the query side reads. They hold no
 * labels, tones, percentages, or captions: every such value is derived by a
 * read-model mapper and is never written back as command authority.
 */

export const campaignSourceSchema = z.strictObject({
  campaignId: uuidSchema,
  name: z.string().nullable(),
  lifecycle: campaignLifecycleSchema,
  version: z.number().int().min(1),
  createdAt: utcDateTimeSchema,
  updatedAt: utcDateTimeSchema,
  initializedAt: utcDateTimeSchema.nullable(),
  autosavedAt: utcDateTimeSchema.nullable(),
  niches: z.array(orderedLabelSchema),
  geographies: z.array(orderedLabelSchema),
  offerSummary: z.string().nullable(),
  callToAction: z.string().nullable(),
  voiceProfile: voiceProfileSchema.nullable(),
  proofs: z.array(campaignProofInputSchema),
  constraints: z.array(orderedLabelSchema),
  discoverySettings: discoverySettingsSchema,
  researchSettings: researchSettingsSchema,
});

export const discoveryPreviewSourceSchema = z.strictObject({
  /** Provider-observed candidate count; null when no provider observation exists. */
  estimatedYield: z.number().int().min(0).nullable(),
  observedAt: utcDateTimeSchema.nullable(),
  expiresAt: utcDateTimeSchema.nullable(),
  /** Operator geography labels the preview was requested for, in operator order. */
  requestedGeographies: z.array(z.string().min(1)),
  /** Subset of the requested geographies the provider actually returned. */
  sampledGeographies: z.array(z.string().min(1)),
});

export const pipelineStageRunSourceSchema = z.strictObject({
  key: pipelineStageKeySchema,
  status: stageExecutionStatusSchema,
  attemptCount: z.number().int().min(0),
  startedAt: utcDateTimeSchema.nullable(),
  completedAt: utcDateTimeSchema.nullable(),
  processedCount: z.number().int().min(0).nullable(),
  totalCount: z.number().int().min(0).nullable(),
  errorSummary: z.string().min(1).nullable(),
});

export const listingQueueSourceSchema = z.strictObject({
  listingId: uuidSchema,
  businessName: z.string().min(1),
  queueStatus: queueStatusSchema,
  currentStage: pipelineStageKeySchema,
  citationCount: z.number().int().min(0),
  draftConfidence: confidenceSchema.nullable(),
  needsManualResearch: z.boolean(),
  suppressed: z.boolean(),
});

export const pipelineSourceSchema = z.strictObject({
  campaignId: uuidSchema,
  campaignName: z.string().min(1),
  lifecycle: campaignLifecycleSchema,
  runId: uuidSchema,
  stages: z.array(pipelineStageRunSourceSchema).max(6),
  listings: z.array(listingQueueSourceSchema),
  generatedAt: utcDateTimeSchema,
});

export const portfolioCampaignSourceSchema = z.strictObject({
  campaignId: uuidSchema,
  name: z.string().min(1),
  lifecycle: campaignLifecycleSchema,
  currentStage: pipelineStageKeySchema.nullable(),
  listingCount: z.number().int().min(0),
  readyCount: z.number().int().min(0),
  sentCount: z.number().int().min(0),
});

export const auditFindingSourceSchema = z.strictObject({
  id: uuidSchema,
  code: z.enum([
    "missing-citation",
    "thin-record",
    "low-confidence-draft",
    "suppression-match",
    "forbidden-claim",
    "failed-stage",
  ]),
  count: z.number().int().min(0),
});

export const velocitySourceSchema = z.strictObject({
  windowHours: z.number().min(0),
  discovered: z.number().int().min(0),
  enriched: z.number().int().min(0),
  drafted: z.number().int().min(0),
  reviewed: z.number().int().min(0),
  sent: z.number().int().min(0),
  replied: z.number().int().min(0),
});

export const dashboardSourceSchema = z.strictObject({
  campaigns: z.array(portfolioCampaignSourceSchema),
  /** Stage keys with no observed listings may be omitted; mappers default them to zero. */
  stageCounts: z.partialRecord(pipelineStageKeySchema, z.number().int().min(0)),
  velocity: velocitySourceSchema,
  auditFindings: z.array(auditFindingSourceSchema),
  generatedAt: utcDateTimeSchema,
});

export type CampaignSource = z.infer<typeof campaignSourceSchema>;
export type DiscoveryPreviewSource = z.infer<
  typeof discoveryPreviewSourceSchema
>;
export type PipelineStageRunSource = z.infer<
  typeof pipelineStageRunSourceSchema
>;
export type ListingQueueSource = z.infer<typeof listingQueueSourceSchema>;
export type PipelineSource = z.infer<typeof pipelineSourceSchema>;
export type PortfolioCampaignSource = z.infer<
  typeof portfolioCampaignSourceSchema
>;
export type AuditFindingSource = z.infer<typeof auditFindingSourceSchema>;
export type VelocitySource = z.infer<typeof velocitySourceSchema>;
export type DashboardSource = z.infer<typeof dashboardSourceSchema>;
