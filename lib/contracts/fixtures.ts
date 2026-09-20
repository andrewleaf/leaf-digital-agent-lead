import type {
  InitializeCampaignInput,
  SaveCampaignDraftInput,
} from "./campaign-commands";
import type {
  CampaignSource,
  DashboardSource,
  DiscoveryPreviewSource,
  PipelineSource,
} from "./campaign-sources";

/**
 * Contract fixtures for the five states the campaign surfaces must handle:
 * filled, empty, stale, paused, and failed. They are the inputs the mapper
 * tests run against, and they mirror the JSON examples on
 * `campaign-actions-and-read-model-contracts-2026-09-19`.
 */

export const FIXTURE_NOW = new Date("2026-09-20T00:01:00.000Z");

export const FILLED_CAMPAIGN_SOURCE: CampaignSource = {
  campaignId: "2e4133a0-39b7-4c41-bdef-6654d7c38dc5",
  name: "Austin HVAC",
  lifecycle: "draft",
  version: 7,
  createdAt: "2026-09-18T15:00:00.000Z",
  updatedAt: "2026-09-19T23:58:00.000Z",
  initializedAt: null,
  autosavedAt: "2026-09-19T23:58:00.000Z",
  niches: [{ label: "HVAC Contractors", order: 0 }],
  geographies: [
    { label: "Austin, TX", order: 0 },
    { label: "Round Rock, TX", order: 1 },
  ],
  offerSummary:
    "Website conversion review and mobile booking-flow recommendations",
  callToAction:
    "Ask whether they would like a short 3-minute video review of their booking flow",
  voiceProfile: "helpful-direct",
  proofs: [
    { text: "Rebuilt booking flow for two Austin trades businesses", order: 0 },
  ],
  constraints: [
    { label: "Do not claim guaranteed revenue improvements", order: 0 },
    { label: "Do not imply past relationship or acquaintance", order: 1 },
    { label: "Do not cite pricing or competitor comparisons", order: 2 },
  ],
  discoverySettings: {
    requireWebsite: true,
    requireEmail: false,
    minimumRating: 3.5,
    minimumReviewCount: 10,
  },
  researchSettings: {
    extractProofPoints: true,
    fallbackAction: "flag-unverified",
  },
};

export const EMPTY_CAMPAIGN_SOURCE: CampaignSource = {
  campaignId: "d2f71b45-1d0f-4a21-8a0b-8f9c0d4b9f21",
  name: null,
  lifecycle: "draft",
  version: 1,
  createdAt: "2026-09-20T00:00:00.000Z",
  updatedAt: "2026-09-20T00:00:00.000Z",
  initializedAt: null,
  autosavedAt: null,
  niches: [],
  geographies: [],
  offerSummary: null,
  callToAction: null,
  voiceProfile: null,
  proofs: [],
  constraints: [],
  discoverySettings: {},
  researchSettings: {},
};

export const PAUSED_CAMPAIGN_SOURCE: CampaignSource = {
  ...FILLED_CAMPAIGN_SOURCE,
  campaignId: "91dbe025-0cab-4317-9060-3c403ec451ab",
  lifecycle: "paused",
  version: 12,
  initializedAt: "2026-09-19T12:00:00.000Z",
  autosavedAt: "2026-09-19T12:00:00.000Z",
};

export const FILLED_DISCOVERY_SOURCE: DiscoveryPreviewSource = {
  estimatedYield: 128,
  observedAt: "2026-09-19T23:40:00.000Z",
  expiresAt: "2026-09-20T23:40:00.000Z",
  requestedGeographies: ["Austin, TX", "Round Rock, TX", "Cedar Park, TX"],
  sampledGeographies: ["Austin, TX", "Round Rock, TX", "Cedar Park, TX"],
};

export const STALE_DISCOVERY_SOURCE: DiscoveryPreviewSource = {
  estimatedYield: 118,
  observedAt: "2026-08-14T09:00:00.000Z",
  expiresAt: "2026-09-13T09:00:00.000Z",
  requestedGeographies: ["Austin, TX", "Round Rock, TX", "Cedar Park, TX"],
  sampledGeographies: ["Austin, TX", "Round Rock, TX"],
};

export const EMPTY_DISCOVERY_SOURCE: DiscoveryPreviewSource = {
  estimatedYield: null,
  observedAt: null,
  expiresAt: null,
  requestedGeographies: [],
  sampledGeographies: [],
};

export const FILLED_PIPELINE_SOURCE: PipelineSource = {
  campaignId: "2e4133a0-39b7-4c41-bdef-6654d7c38dc5",
  campaignName: "Austin HVAC",
  lifecycle: "active",
  runId: "662f84ab-0434-4efe-a8e4-34404048a2ab",
  stages: [
    {
      key: "discovery",
      status: "succeeded",
      attemptCount: 1,
      startedAt: "2026-09-19T20:00:00.000Z",
      completedAt: "2026-09-19T20:12:00.000Z",
      processedCount: 128,
      totalCount: 128,
      errorSummary: null,
    },
    {
      key: "draft-generation",
      status: "running",
      attemptCount: 1,
      startedAt: "2026-09-19T23:10:00.000Z",
      completedAt: null,
      processedCount: 98,
      totalCount: 114,
      errorSummary: null,
    },
  ],
  listings: [
    {
      listingId: "0c0f3c4a-4a2f-4f27-9f4e-0b7bb0a1a001",
      businessName: "Lonestar Air & Heating",
      queueStatus: "ready",
      currentStage: "human-review",
      citationCount: 3,
      draftConfidence: "high",
      needsManualResearch: false,
      suppressed: false,
    },
    {
      listingId: "0c0f3c4a-4a2f-4f27-9f4e-0b7bb0a1a002",
      businessName: "Apex Cool Mechanical",
      queueStatus: "no-email",
      currentStage: "website-matching",
      citationCount: 0,
      draftConfidence: null,
      needsManualResearch: true,
      suppressed: false,
    },
    {
      listingId: "0c0f3c4a-4a2f-4f27-9f4e-0b7bb0a1a003",
      businessName: "Hill Country Climate Solutions",
      queueStatus: "sent",
      currentStage: "human-review",
      citationCount: 2,
      draftConfidence: "medium",
      needsManualResearch: false,
      suppressed: false,
    },
  ],
  generatedAt: "2026-09-20T00:00:00.000Z",
};

export const EMPTY_PIPELINE_SOURCE: PipelineSource = {
  campaignId: "d2f71b45-1d0f-4a21-8a0b-8f9c0d4b9f21",
  campaignName: "Untitled campaign",
  lifecycle: "draft",
  runId: "5f9dc0b8-6f70-4d4a-9a3a-1d37f6f9a0e1",
  stages: [],
  listings: [],
  generatedAt: "2026-09-20T00:00:00.000Z",
};

export const FAILED_PIPELINE_SOURCE: PipelineSource = {
  campaignId: "91dbe025-0cab-4317-9060-3c403ec451ab",
  campaignName: "Austin HVAC",
  lifecycle: "active",
  runId: "662f84ab-0434-4efe-a8e4-34404048a2ab",
  stages: [
    {
      key: "public-scrape",
      status: "failed",
      attemptCount: 3,
      startedAt: "2026-09-19T22:00:00.000Z",
      completedAt: "2026-09-19T22:18:00.000Z",
      processedCount: 54,
      totalCount: 128,
      errorSummary: "Provider timeout; retry is available.",
    },
  ],
  listings: [
    {
      listingId: "0c0f3c4a-4a2f-4f27-9f4e-0b7bb0a1a004",
      businessName: "Barton Springs HVAC",
      queueStatus: "needs-edit",
      currentStage: "public-scrape",
      citationCount: 1,
      draftConfidence: "low",
      needsManualResearch: false,
      suppressed: false,
    },
  ],
  generatedAt: "2026-09-20T00:00:00.000Z",
};

export const PAUSED_DASHBOARD_SOURCE: DashboardSource = {
  campaigns: [
    {
      campaignId: "91dbe025-0cab-4317-9060-3c403ec451ab",
      name: "Austin HVAC",
      lifecycle: "paused",
      currentStage: "human-review",
      listingCount: 128,
      readyCount: 14,
      sentCount: 84,
    },
  ],
  stageCounts: {},
  velocity: {
    windowHours: 0,
    discovered: 0,
    enriched: 0,
    drafted: 0,
    reviewed: 0,
    sent: 0,
    replied: 0,
  },
  auditFindings: [],
  generatedAt: "2026-09-20T00:00:00.000Z",
};

export const FILLED_DASHBOARD_SOURCE: DashboardSource = {
  campaigns: [
    {
      campaignId: "2e4133a0-39b7-4c41-bdef-6654d7c38dc5",
      name: "Austin HVAC",
      lifecycle: "active",
      currentStage: "draft-generation",
      listingCount: 128,
      readyCount: 14,
      sentCount: 36,
    },
    {
      campaignId: "d2f71b45-1d0f-4a21-8a0b-8f9c0d4b9f21",
      name: "San Antonio Roofing",
      lifecycle: "draft",
      currentStage: null,
      listingCount: 0,
      readyCount: 0,
      sentCount: 0,
    },
  ],
  stageCounts: {
    discovery: 128,
    "website-matching": 121,
    "public-scrape": 114,
    "fact-extraction": 110,
    "draft-generation": 98,
    "human-review": 14,
  },
  velocity: {
    windowHours: 8,
    discovered: 128,
    enriched: 110,
    drafted: 98,
    reviewed: 36,
    sent: 36,
    replied: 4,
  },
  auditFindings: [
    {
      id: "3c1f8f2a-7c3d-4a05-94a1-2f5f8c6e0a10",
      code: "missing-citation",
      count: 2,
    },
    {
      id: "3c1f8f2a-7c3d-4a05-94a1-2f5f8c6e0a11",
      code: "thin-record",
      count: 1,
    },
    {
      id: "3c1f8f2a-7c3d-4a05-94a1-2f5f8c6e0a12",
      code: "suppression-match",
      count: 0,
    },
  ],
  generatedAt: "2026-09-20T00:00:00.000Z",
};

export const EMPTY_SAVE_DRAFT_INPUT: SaveCampaignDraftInput = {
  kind: "save-campaign-draft",
  requestId: "1fd453e6-bcda-4d37-843f-cdbebf640d4f",
  data: {},
};

export const FILLED_INITIALIZE_INPUT: InitializeCampaignInput = {
  kind: "initialize-campaign",
  requestId: "82880d2f-27ca-4579-a115-eae5e2bc8a32",
  campaignId: "2e4133a0-39b7-4c41-bdef-6654d7c38dc5",
  expectedVersion: 7,
  idempotencyKey: "initialize-2e4133a0-39b7-4c41-bdef-6654d7c38dc5-v7",
  data: {
    name: "Austin HVAC",
    niches: FILLED_CAMPAIGN_SOURCE.niches,
    geographies: FILLED_CAMPAIGN_SOURCE.geographies,
    offerSummary: FILLED_CAMPAIGN_SOURCE.offerSummary ?? "",
    callToAction: FILLED_CAMPAIGN_SOURCE.callToAction ?? "",
    voiceProfile: "helpful-direct",
    proofs: FILLED_CAMPAIGN_SOURCE.proofs,
    constraints: FILLED_CAMPAIGN_SOURCE.constraints,
    discoverySettings: FILLED_CAMPAIGN_SOURCE.discoverySettings,
    researchSettings: FILLED_CAMPAIGN_SOURCE.researchSettings,
  },
};
