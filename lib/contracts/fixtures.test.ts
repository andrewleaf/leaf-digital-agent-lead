import { describe, expect, it } from "vitest";

import {
  campaignSourceSchema,
  dashboardSourceSchema,
  discoveryPreviewSourceSchema,
  pipelineSourceSchema,
} from "./campaign-sources";
import {
  EMPTY_CAMPAIGN_SOURCE,
  EMPTY_DISCOVERY_SOURCE,
  EMPTY_PIPELINE_SOURCE,
  FAILED_PIPELINE_SOURCE,
  FILLED_CAMPAIGN_SOURCE,
  FILLED_DASHBOARD_SOURCE,
  FILLED_DISCOVERY_SOURCE,
  FILLED_PIPELINE_SOURCE,
  PAUSED_CAMPAIGN_SOURCE,
  PAUSED_DASHBOARD_SOURCE,
  STALE_DISCOVERY_SOURCE,
} from "./fixtures";

describe("contract fixtures", () => {
  it.each([
    ["filled", FILLED_CAMPAIGN_SOURCE],
    ["empty", EMPTY_CAMPAIGN_SOURCE],
    ["paused", PAUSED_CAMPAIGN_SOURCE],
  ])("validates the %s campaign source", (_state, fixture) => {
    expect(campaignSourceSchema.safeParse(fixture).success).toBe(true);
  });

  it.each([
    ["filled", FILLED_DISCOVERY_SOURCE],
    ["empty", EMPTY_DISCOVERY_SOURCE],
    ["stale", STALE_DISCOVERY_SOURCE],
  ])("validates the %s discovery source", (_state, fixture) => {
    expect(discoveryPreviewSourceSchema.safeParse(fixture).success).toBe(true);
  });

  it.each([
    ["filled", FILLED_PIPELINE_SOURCE],
    ["empty", EMPTY_PIPELINE_SOURCE],
    ["failed", FAILED_PIPELINE_SOURCE],
  ])("validates the %s pipeline source", (_state, fixture) => {
    expect(pipelineSourceSchema.safeParse(fixture).success).toBe(true);
  });

  it.each([
    ["filled", FILLED_DASHBOARD_SOURCE],
    ["paused", PAUSED_DASHBOARD_SOURCE],
  ])("validates the %s dashboard source", (_state, fixture) => {
    expect(dashboardSourceSchema.safeParse(fixture).success).toBe(true);
  });
});
