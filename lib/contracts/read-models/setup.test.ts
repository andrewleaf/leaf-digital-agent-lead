import { describe, expect, it } from "vitest";

import { campaignDraftDataSchema } from "../campaign-commands";
import {
  EMPTY_CAMPAIGN_SOURCE,
  FILLED_CAMPAIGN_SOURCE,
  FIXTURE_NOW,
  PAUSED_CAMPAIGN_SOURCE,
} from "../fixtures";
import { setupReadModelSchema, toSetupReadModel } from "./setup";

describe("toSetupReadModel", () => {
  it("derives the filled setup surface from source fields", () => {
    const model = toSetupReadModel(FILLED_CAMPAIGN_SOURCE, {
      now: FIXTURE_NOW,
    });

    expect(setupReadModelSchema.safeParse(model).success).toBe(true);
    expect(model.autosavedLabel).toBe("Autosaved 3 minutes ago");
    expect(model.completeness).toEqual({
      complete: true,
      percent: 100,
      missingFields: [],
    });
    expect(model.prohibitionCount).toBe(3);
    expect(model.localBoundary).toEqual({
      ready: true,
      label: "2 metros selected",
    });
    expect(model.websiteGate).toEqual({
      ready: true,
      label: "Website required",
    });
    expect(model.initialization).toEqual({ available: true, reasons: [] });
  });

  it("reports every missing requirement on an empty draft", () => {
    const model = toSetupReadModel(EMPTY_CAMPAIGN_SOURCE, { now: FIXTURE_NOW });

    expect(setupReadModelSchema.safeParse(model).success).toBe(true);
    expect(model.autosavedLabel).toBe("Not autosaved yet");
    expect(model.completeness).toEqual({
      complete: false,
      percent: 0,
      missingFields: ["niches", "geographies", "offerSummary", "callToAction"],
    });
    expect(model.localBoundary).toEqual({
      ready: false,
      label: "No metro selected",
    });
    expect(model.websiteGate).toEqual({
      ready: false,
      label: "Website optional",
    });
    expect(model.initialization.available).toBe(false);
    expect(model.initialization.reasons).toHaveLength(4);
  });

  it("blocks initialization once the campaign has left draft", () => {
    const model = toSetupReadModel(PAUSED_CAMPAIGN_SOURCE, {
      now: FIXTURE_NOW,
    });

    expect(model.completeness.complete).toBe(true);
    expect(model.initialization).toEqual({
      available: false,
      reasons: ["Campaign is already initialized."],
    });
  });

  it("counts partial completion in quarters", () => {
    const model = toSetupReadModel(
      { ...EMPTY_CAMPAIGN_SOURCE, niches: FILLED_CAMPAIGN_SOURCE.niches },
      { now: FIXTURE_NOW },
    );

    expect(model.completeness.percent).toBe(25);
    expect(model.completeness.missingFields).not.toContain("niches");
  });

  it("keeps derived readiness copy out of the write contract", () => {
    const model = toSetupReadModel(FILLED_CAMPAIGN_SOURCE, {
      now: FIXTURE_NOW,
    });

    const result = campaignDraftDataSchema.safeParse({
      autosavedLabel: model.autosavedLabel,
      prohibitionCount: model.prohibitionCount,
    });

    expect(result.success).toBe(false);
  });
});
