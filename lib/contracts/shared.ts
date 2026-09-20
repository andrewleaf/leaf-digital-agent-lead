import { z } from "zod";

export const uuidSchema = z.uuid();

export const utcDateTimeSchema = z.iso.datetime();

export const campaignLifecycleSchema = z.enum([
  "draft",
  "active",
  "paused",
  "archived",
]);

export const pipelineStageKeySchema = z.enum([
  "discovery",
  "website-matching",
  "public-scrape",
  "fact-extraction",
  "draft-generation",
  "human-review",
]);

export const stageExecutionStatusSchema = z.enum([
  "pending",
  "running",
  "succeeded",
  "failed",
  "skipped",
]);

export const queueStatusSchema = z.enum([
  "new",
  "enriched",
  "drafted",
  "needs-edit",
  "no-email",
  "skipped",
  "ready",
  "sent",
  "replied",
  "follow-up-due",
]);

export const confidenceSchema = z.enum(["high", "medium", "low", "unknown"]);

export const voiceProfileSchema = z.enum([
  "helpful-direct",
  "peer-collegial",
  "concise-technical",
  "audit-led",
  "conversational",
]);

/** v1 never authorises invention: an unverifiable fact is flagged, not written. */
export const fallbackActionSchema = z.literal("flag-unverified");

/** Presentation emphasis emitted by read models; never accepted as a write field. */
export const toneSchema = z.enum([
  "neutral",
  "active",
  "success",
  "warning",
  "danger",
]);

export const PIPELINE_STAGE_KEYS = pipelineStageKeySchema.options;

export const PIPELINE_STAGE_ORDINALS: Record<PipelineStageKey, number> = {
  discovery: 1,
  "website-matching": 2,
  "public-scrape": 3,
  "fact-extraction": 4,
  "draft-generation": 5,
  "human-review": 6,
};

export type CampaignLifecycle = z.infer<typeof campaignLifecycleSchema>;
export type PipelineStageKey = z.infer<typeof pipelineStageKeySchema>;
export type StageExecutionStatus = z.infer<typeof stageExecutionStatusSchema>;
export type QueueStatus = z.infer<typeof queueStatusSchema>;
export type Confidence = z.infer<typeof confidenceSchema>;
export type VoiceProfile = z.infer<typeof voiceProfileSchema>;
export type FallbackAction = z.infer<typeof fallbackActionSchema>;
export type Tone = z.infer<typeof toneSchema>;
