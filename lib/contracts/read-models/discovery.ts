import { z } from "zod";

import type { DiscoveryPreviewSource } from "../campaign-sources";
import { confidenceSchema, utcDateTimeSchema } from "../shared";

export const discoveryPreviewReadModelSchema = z.strictObject({
  kind: z.literal("discovery-preview-read-model"),
  estimatedYield: z.number().int().min(0).nullable(),
  confidence: confidenceSchema,
  detailCaption: z.string(),
  observedAt: utcDateTimeSchema.nullable(),
  expiresAt: utcDateTimeSchema.nullable(),
  stale: z.boolean(),
});

export type DiscoveryPreviewReadModel = z.infer<
  typeof discoveryPreviewReadModelSchema
>;

function isStale(source: DiscoveryPreviewSource, now: Date): boolean {
  if (source.observedAt === null || source.expiresAt === null) {
    return true;
  }

  return new Date(source.expiresAt).getTime() <= now.getTime();
}

/**
 * Confidence describes how much of the requested perimeter the provider
 * actually answered for. A stale or absent observation is never high.
 */
function confidenceFrom(
  source: DiscoveryPreviewSource,
  stale: boolean,
): DiscoveryPreviewReadModel["confidence"] {
  if (
    source.estimatedYield === null ||
    source.requestedGeographies.length === 0
  ) {
    return "unknown";
  }

  if (stale) {
    return "low";
  }

  const coverage =
    source.sampledGeographies.length / source.requestedGeographies.length;

  if (coverage >= 0.9) return "high";
  if (coverage >= 0.6) return "medium";
  if (coverage > 0) return "low";

  return "unknown";
}

/** The caption lists the locality of each requested geography, not its region suffix. */
function detailCaption(source: DiscoveryPreviewSource): string {
  return source.requestedGeographies
    .map((label) => label.split(",")[0].trim())
    .filter((locality) => locality.length > 0)
    .join(", ");
}

export function toDiscoveryPreviewReadModel(
  source: DiscoveryPreviewSource,
  options: { now: Date },
): DiscoveryPreviewReadModel {
  const stale = isStale(source, options.now);

  return {
    kind: "discovery-preview-read-model",
    estimatedYield: source.estimatedYield,
    confidence: confidenceFrom(source, stale),
    detailCaption: detailCaption(source),
    observedAt: source.observedAt,
    expiresAt: source.expiresAt,
    stale,
  };
}
