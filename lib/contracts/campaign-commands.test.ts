import { describe, expect, it } from "vitest";

import {
  campaignInitializationDataSchema,
  initializeCampaignInputSchema,
  saveCampaignDraftInputSchema,
  saveCampaignDraftResultSchema,
  validationFailure,
} from "./campaign-commands";
import {
  EMPTY_SAVE_DRAFT_INPUT,
  FILLED_CAMPAIGN_SOURCE,
  FILLED_INITIALIZE_INPUT,
} from "./fixtures";

describe("save campaign draft contract", () => {
  it("accepts an empty draft so partial setup can be saved", () => {
    expect(
      saveCampaignDraftInputSchema.safeParse(EMPTY_SAVE_DRAFT_INPUT).success,
    ).toBe(true);
  });

  it("models a draft receipt with identity, version, timestamps and no run", () => {
    const result = saveCampaignDraftResultSchema.safeParse({
      ok: true,
      requestId: "1fd453e6-bcda-4d37-843f-cdbebf640d4f",
      campaign: {
        campaignId: FILLED_CAMPAIGN_SOURCE.campaignId,
        lifecycle: "draft",
        version: 8,
        createdAt: FILLED_CAMPAIGN_SOURCE.createdAt,
        updatedAt: "2026-09-20T00:01:00.000Z",
        initializedAt: null,
      },
      pipelineRunId: null,
    });

    expect(result.success).toBe(true);
  });

  it("rejects a draft receipt that claims a pipeline run", () => {
    const result = saveCampaignDraftResultSchema.safeParse({
      ok: true,
      requestId: "1fd453e6-bcda-4d37-843f-cdbebf640d4f",
      campaign: {
        campaignId: FILLED_CAMPAIGN_SOURCE.campaignId,
        lifecycle: "active",
        version: 8,
        createdAt: FILLED_CAMPAIGN_SOURCE.createdAt,
        updatedAt: "2026-09-20T00:01:00.000Z",
        initializedAt: "2026-09-20T00:01:00.000Z",
      },
      pipelineRunId: "662f84ab-0434-4efe-a8e4-34404048a2ab",
    });

    expect(result.success).toBe(false);
  });
});

describe("initialize campaign contract", () => {
  it("accepts the complete aggregate with version and idempotency key", () => {
    expect(
      initializeCampaignInputSchema.safeParse(FILLED_INITIALIZE_INPUT).success,
    ).toBe(true);
  });

  it.each([
    ["niches", { niches: [] }],
    ["geographies", { geographies: [] }],
    ["offerSummary", { offerSummary: "" }],
    ["callToAction", { callToAction: "" }],
  ])("rejects initialization missing %s", (_field, override) => {
    const result = campaignInitializationDataSchema.safeParse({
      ...FILLED_INITIALIZE_INPUT.data,
      ...override,
    });

    expect(result.success).toBe(false);
  });

  it("requires an expected version and an idempotency key", () => {
    const { expectedVersion: _version, ...withoutVersion } =
      FILLED_INITIALIZE_INPUT;
    const { idempotencyKey: _key, ...withoutKey } = FILLED_INITIALIZE_INPUT;

    expect(
      initializeCampaignInputSchema.safeParse(withoutVersion).success,
    ).toBe(false);
    expect(initializeCampaignInputSchema.safeParse(withoutKey).success).toBe(
      false,
    );
  });
});

describe("write-authority boundaries", () => {
  it.each([
    ["prose status label", { statusLabel: "Running discovery" }],
    ["tone", { statusTone: "warning" }],
    ["colour", { badgeColor: "#0F766E" }],
    ["percentage", { completenessPercent: 100 }],
    ["counter", { readyCount: 14 }],
    ["employee count", { employeeCount: 24 }],
    ["revenue", { annualRevenue: 1_800_000 }],
  ])("rejects %s as a campaign write field", (_name, override) => {
    const result = saveCampaignDraftInputSchema.safeParse({
      ...EMPTY_SAVE_DRAFT_INPUT,
      data: { ...EMPTY_SAVE_DRAFT_INPUT.data, ...override },
    });

    expect(result.success).toBe(false);
  });
});

describe("action failures", () => {
  it("reports validation errors with a bounded code and a field path", () => {
    const parsed = initializeCampaignInputSchema.safeParse({
      ...FILLED_INITIALIZE_INPUT,
      data: { ...FILLED_INITIALIZE_INPUT.data, callToAction: "" },
    });

    expect(parsed.success).toBe(false);
    if (parsed.success) return;

    const failure = validationFailure(
      FILLED_INITIALIZE_INPUT.requestId,
      parsed.error,
    );

    expect(failure.ok).toBe(false);
    expect(failure.errors[0].code).toBe("validation");
    expect(failure.errors[0].retryable).toBe(false);
    expect(failure.errors.map((error) => error.fieldPath)).toContainEqual([
      "data",
      "callToAction",
    ]);
  });
});
