import { describe, expect, it } from "vitest";

import {
  EMPTY_PIPELINE_SOURCE,
  FAILED_PIPELINE_SOURCE,
  FILLED_PIPELINE_SOURCE,
} from "../fixtures";
import { pipelineReadModelSchema, toPipelineReadModel } from "./pipeline";

describe("toPipelineReadModel", () => {
  it("preserves canonical run, listing, and queue keys alongside labels", () => {
    const model = toPipelineReadModel(FILLED_PIPELINE_SOURCE);

    expect(pipelineReadModelSchema.safeParse(model).success).toBe(true);
    expect(model.runId).toBe(FILLED_PIPELINE_SOURCE.runId);
    expect(model.stages.map((stage) => stage.key)).toEqual([
      "discovery",
      "draft-generation",
    ]);
    expect(model.rows.map((row) => row.listingId)).toEqual(
      FILLED_PIPELINE_SOURCE.listings.map((listing) => listing.listingId),
    );
    expect(model.rows.map((row) => row.queueStatus)).toEqual([
      "ready",
      "no-email",
      "sent",
    ]);
  });

  it("derives stage ordinals, progress, and processing state", () => {
    const model = toPipelineReadModel(FILLED_PIPELINE_SOURCE);
    const [discovery, drafting] = model.stages;

    expect(discovery).toMatchObject({
      ordinal: 1,
      label: "Discovery",
      statusLabel: "Done",
      tone: "success",
      progress: 100,
      metricValue: "128 / 128",
    });
    expect(drafting).toMatchObject({
      ordinal: 5,
      statusLabel: "Running",
      tone: "active",
      progress: 86,
    });
    expect(model.processing).toBe(true);
  });

  it("counts attention, ready, and completed rows", () => {
    const model = toPipelineReadModel(FILLED_PIPELINE_SOURCE);

    expect(model.counts).toEqual({
      all: 3,
      needsAttention: 1,
      readyReview: 1,
      completed: 1,
    });
    expect(model.rows[1]).toMatchObject({
      needsAttention: true,
      citationsLabel: "Manual research required",
      actionLabel: "Add contact",
    });
  });

  it("returns an empty, non-processing workbench for a campaign with no run", () => {
    const model = toPipelineReadModel(EMPTY_PIPELINE_SOURCE);

    expect(pipelineReadModelSchema.safeParse(model).success).toBe(true);
    expect(model.stages).toEqual([]);
    expect(model.rows).toEqual([]);
    expect(model.processing).toBe(false);
    expect(model.counts).toEqual({
      all: 0,
      needsAttention: 0,
      readyReview: 0,
      completed: 0,
    });
  });

  it("surfaces a failed stage with its error summary and danger tone", () => {
    const model = toPipelineReadModel(FAILED_PIPELINE_SOURCE);

    expect(model.processing).toBe(false);
    expect(model.stages[0]).toMatchObject({
      key: "public-scrape",
      ordinal: 3,
      label: "Public website research",
      statusLabel: "Failed",
      tone: "danger",
      errorSummary: "Provider timeout; retry is available.",
    });
    expect(model.rows[0].needsAttention).toBe(true);
  });
});
