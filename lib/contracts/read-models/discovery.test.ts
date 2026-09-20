import { describe, expect, it } from "vitest";

import {
  EMPTY_DISCOVERY_SOURCE,
  FILLED_DISCOVERY_SOURCE,
  FIXTURE_NOW,
  STALE_DISCOVERY_SOURCE,
} from "../fixtures";
import {
  discoveryPreviewReadModelSchema,
  toDiscoveryPreviewReadModel,
} from "./discovery";

describe("toDiscoveryPreviewReadModel", () => {
  it("derives yield, confidence, and caption from a fresh observation", () => {
    const model = toDiscoveryPreviewReadModel(FILLED_DISCOVERY_SOURCE, {
      now: FIXTURE_NOW,
    });

    expect(discoveryPreviewReadModelSchema.safeParse(model).success).toBe(true);
    expect(model.estimatedYield).toBe(128);
    expect(model.confidence).toBe("high");
    expect(model.detailCaption).toBe("Austin, Round Rock, Cedar Park");
    expect(model.stale).toBe(false);
  });

  it("marks an expired observation stale and downgrades confidence", () => {
    const model = toDiscoveryPreviewReadModel(STALE_DISCOVERY_SOURCE, {
      now: FIXTURE_NOW,
    });

    expect(model.stale).toBe(true);
    expect(model.confidence).toBe("low");
    expect(model.estimatedYield).toBe(118);
  });

  it("returns an unknown, stale preview when nothing has been observed", () => {
    const model = toDiscoveryPreviewReadModel(EMPTY_DISCOVERY_SOURCE, {
      now: FIXTURE_NOW,
    });

    expect(model.estimatedYield).toBeNull();
    expect(model.confidence).toBe("unknown");
    expect(model.detailCaption).toBe("");
    expect(model.stale).toBe(true);
  });

  it("reports medium confidence for partial provider coverage", () => {
    const model = toDiscoveryPreviewReadModel(
      {
        ...FILLED_DISCOVERY_SOURCE,
        sampledGeographies: ["Austin, TX", "Round Rock, TX"],
      },
      { now: FIXTURE_NOW },
    );

    expect(model.confidence).toBe("medium");
  });
});
