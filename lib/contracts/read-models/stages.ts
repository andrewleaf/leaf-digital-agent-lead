import type { PipelineStageKey, StageExecutionStatus, Tone } from "../shared";

/**
 * Presentation vocabulary for the canonical stage keys. These labels are
 * derived output only: a command may never send one back as authority.
 */
export const STAGE_LABELS: Record<PipelineStageKey, string> = {
  discovery: "Discovery",
  "website-matching": "Website matching",
  "public-scrape": "Public website research",
  "fact-extraction": "Fact extraction",
  "draft-generation": "Draft generation",
  "human-review": "Human review",
};

export const STAGE_STATUS_LABELS: Record<StageExecutionStatus, string> = {
  pending: "Pending",
  running: "Running",
  succeeded: "Done",
  failed: "Failed",
  skipped: "Skipped",
};

export const STAGE_STATUS_TONES: Record<StageExecutionStatus, Tone> = {
  pending: "neutral",
  running: "active",
  succeeded: "success",
  failed: "danger",
  skipped: "warning",
};
