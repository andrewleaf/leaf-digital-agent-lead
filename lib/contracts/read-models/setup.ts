import { z } from "zod";

import type { CampaignSource } from "../campaign-sources";
import {
  campaignLifecycleSchema,
  utcDateTimeSchema,
  uuidSchema,
} from "../shared";

export const REQUIRED_SETUP_FIELDS = [
  "niches",
  "geographies",
  "offerSummary",
  "callToAction",
] as const;

export const requiredSetupFieldSchema = z.enum(REQUIRED_SETUP_FIELDS);

export const readinessIndicatorSchema = z.strictObject({
  ready: z.boolean(),
  label: z.string().min(1),
});

export const setupReadModelSchema = z.strictObject({
  kind: z.literal("setup-read-model"),
  campaignId: uuidSchema,
  version: z.number().int().min(1),
  lifecycle: campaignLifecycleSchema,
  autosavedAt: utcDateTimeSchema.nullable(),
  autosavedLabel: z.string(),
  completeness: z.strictObject({
    complete: z.boolean(),
    percent: z.number().int().min(0).max(100),
    missingFields: z.array(requiredSetupFieldSchema),
  }),
  prohibitionCount: z.number().int().min(0),
  localBoundary: readinessIndicatorSchema,
  websiteGate: readinessIndicatorSchema,
  initialization: z.strictObject({
    available: z.boolean(),
    reasons: z.array(z.string().min(1)),
  }),
});

export type RequiredSetupField = z.infer<typeof requiredSetupFieldSchema>;
export type ReadinessIndicator = z.infer<typeof readinessIndicatorSchema>;
export type SetupReadModel = z.infer<typeof setupReadModelSchema>;

const MISSING_FIELD_REASONS: Record<RequiredSetupField, string> = {
  niches: "Add at least one target niche.",
  geographies: "Add at least one geography.",
  offerSummary: "Describe the offer.",
  callToAction: "Add a call to action.",
};

function hasText(value: string | null | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function missingRequiredFields(source: CampaignSource): RequiredSetupField[] {
  const missing: RequiredSetupField[] = [];

  if (source.niches.length === 0) missing.push("niches");
  if (source.geographies.length === 0) missing.push("geographies");
  if (!hasText(source.offerSummary)) missing.push("offerSummary");
  if (!hasText(source.callToAction)) missing.push("callToAction");

  return missing;
}

export function autosavedLabel(autosavedAt: string | null, now: Date): string {
  if (autosavedAt === null) {
    return "Not autosaved yet";
  }

  const elapsedMs = now.getTime() - new Date(autosavedAt).getTime();
  const minutes = Math.floor(elapsedMs / 60_000);

  if (minutes < 1) return "Autosaved just now";
  if (minutes < 60) {
    return `Autosaved ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `Autosaved ${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  const days = Math.floor(hours / 24);
  return `Autosaved ${days} ${days === 1 ? "day" : "days"} ago`;
}

export function toSetupReadModel(
  source: CampaignSource,
  options: { now: Date },
): SetupReadModel {
  const missingFields = missingRequiredFields(source);
  const complete = missingFields.length === 0;
  const metros = source.geographies.length;
  const websiteGateEnabled = source.discoverySettings.requireWebsite === true;

  const reasons = missingFields.map((field) => MISSING_FIELD_REASONS[field]);
  if (source.lifecycle !== "draft") {
    reasons.push("Campaign is already initialized.");
  }

  return {
    kind: "setup-read-model",
    campaignId: source.campaignId,
    version: source.version,
    lifecycle: source.lifecycle,
    autosavedAt: source.autosavedAt,
    autosavedLabel: autosavedLabel(source.autosavedAt, options.now),
    completeness: {
      complete,
      percent: Math.round(
        ((REQUIRED_SETUP_FIELDS.length - missingFields.length) /
          REQUIRED_SETUP_FIELDS.length) *
          100,
      ),
      missingFields,
    },
    prohibitionCount: source.constraints.length,
    localBoundary: {
      ready: metros > 0,
      label:
        metros === 0
          ? "No metro selected"
          : `${metros} ${metros === 1 ? "metro" : "metros"} selected`,
    },
    websiteGate: {
      ready: websiteGateEnabled,
      label: websiteGateEnabled ? "Website required" : "Website optional",
    },
    initialization: {
      available: reasons.length === 0,
      reasons,
    },
  };
}
