import { z } from "zod";

import {
  campaignLifecycleSchema,
  fallbackActionSchema,
  utcDateTimeSchema,
  uuidSchema,
  voiceProfileSchema,
} from "./shared";

export const orderedLabelSchema = z.strictObject({
  id: uuidSchema.optional(),
  label: z.string().min(1).max(160),
  /** Server-derived comparison key; ignored when supplied by an untrusted client. */
  normalizedValue: z.string().min(1).max(160).optional(),
  order: z.number().int().min(0),
});

export const campaignProofInputSchema = z.strictObject({
  id: uuidSchema.optional(),
  text: z.string().min(1).max(500),
  order: z.number().int().min(0),
  authorship: z.literal("operator").optional(),
});

export const discoverySettingsSchema = z.strictObject({
  requireWebsite: z.boolean().optional(),
  requireEmail: z.boolean().optional(),
  minimumRating: z.number().min(0).max(5).nullable().optional(),
  minimumReviewCount: z.number().int().min(0).nullable().optional(),
});

export const researchSettingsSchema = z.strictObject({
  extractProofPoints: z.boolean().optional(),
  fallbackAction: fallbackActionSchema.optional(),
});

/** Every property is optional so a syntactically valid incomplete draft can be saved. */
export const campaignDraftDataSchema = z.strictObject({
  name: z.string().max(160).optional(),
  niches: z.array(orderedLabelSchema).max(25).optional(),
  geographies: z.array(orderedLabelSchema).max(25).optional(),
  offerSummary: z.string().max(2000).optional(),
  callToAction: z.string().max(1000).optional(),
  voiceProfile: voiceProfileSchema.nullable().optional(),
  proofs: z.array(campaignProofInputSchema).max(50).optional(),
  constraints: z.array(orderedLabelSchema).max(50).optional(),
  discoverySettings: discoverySettingsSchema.optional(),
  researchSettings: researchSettingsSchema.optional(),
});

export const campaignInitializationDataSchema = campaignDraftDataSchema.extend({
  niches: z.array(orderedLabelSchema).min(1).max(25),
  geographies: z.array(orderedLabelSchema).min(1).max(25),
  offerSummary: z.string().min(1).max(2000),
  callToAction: z.string().min(1).max(1000),
});

export const saveCampaignDraftInputSchema = z.strictObject({
  kind: z.literal("save-campaign-draft"),
  requestId: uuidSchema,
  campaignId: uuidSchema.optional(),
  expectedVersion: z.number().int().min(0).optional(),
  data: campaignDraftDataSchema,
});

export const initializeCampaignInputSchema = z.strictObject({
  kind: z.literal("initialize-campaign"),
  requestId: uuidSchema,
  campaignId: uuidSchema,
  expectedVersion: z.number().int().min(1),
  idempotencyKey: z
    .string()
    .min(16)
    .max(200)
    .regex(/^[A-Za-z0-9._:-]+$/),
  data: campaignInitializationDataSchema,
});

export const actionErrorCodeSchema = z.enum([
  "validation",
  "stale-version",
  "duplicate-initialization",
  "invalid-transition",
  "persistence-failure",
]);

export const actionErrorSchema = z.strictObject({
  code: actionErrorCodeSchema,
  message: z.string().min(1).max(500),
  fieldPath: z
    .array(z.union([z.string().min(1), z.number().int().min(0)]))
    .optional(),
  retryable: z.boolean(),
});

export const actionFailureSchema = z.strictObject({
  ok: z.literal(false),
  requestId: uuidSchema,
  errors: z.array(actionErrorSchema).min(1),
});

export const campaignWriteReceiptSchema = z.strictObject({
  campaignId: uuidSchema,
  lifecycle: campaignLifecycleSchema,
  version: z.number().int().min(1),
  createdAt: utcDateTimeSchema,
  updatedAt: utcDateTimeSchema,
  initializedAt: utcDateTimeSchema.nullable(),
});

export const saveCampaignDraftSuccessSchema = z.strictObject({
  ok: z.literal(true),
  requestId: uuidSchema,
  campaign: campaignWriteReceiptSchema,
  /** Saving a draft never starts execution. */
  pipelineRunId: z.null(),
});

export const initializeCampaignSuccessSchema = z.strictObject({
  ok: z.literal(true),
  requestId: uuidSchema,
  campaign: campaignWriteReceiptSchema,
  pipelineRun: z.strictObject({
    id: uuidSchema,
    status: z.literal("pending"),
    createdAt: utcDateTimeSchema,
  }),
});

export const saveCampaignDraftResultSchema = z.union([
  saveCampaignDraftSuccessSchema,
  actionFailureSchema,
]);

export const initializeCampaignResultSchema = z.union([
  initializeCampaignSuccessSchema,
  actionFailureSchema,
]);

export type OrderedLabel = z.infer<typeof orderedLabelSchema>;
export type CampaignProofInput = z.infer<typeof campaignProofInputSchema>;
export type DiscoverySettings = z.infer<typeof discoverySettingsSchema>;
export type ResearchSettings = z.infer<typeof researchSettingsSchema>;
export type CampaignDraftData = z.infer<typeof campaignDraftDataSchema>;
export type CampaignInitializationData = z.infer<
  typeof campaignInitializationDataSchema
>;
export type SaveCampaignDraftInput = z.infer<
  typeof saveCampaignDraftInputSchema
>;
export type InitializeCampaignInput = z.infer<
  typeof initializeCampaignInputSchema
>;
export type ActionErrorCode = z.infer<typeof actionErrorCodeSchema>;
export type ActionError = z.infer<typeof actionErrorSchema>;
export type ActionFailure = z.infer<typeof actionFailureSchema>;
export type CampaignWriteReceipt = z.infer<typeof campaignWriteReceiptSchema>;
export type SaveCampaignDraftResult = z.infer<
  typeof saveCampaignDraftResultSchema
>;
export type InitializeCampaignResult = z.infer<
  typeof initializeCampaignResultSchema
>;

const RETRYABLE_CODES: ReadonlySet<ActionErrorCode> = new Set([
  "stale-version",
  "persistence-failure",
]);

export function actionError(
  code: ActionErrorCode,
  message: string,
  fieldPath?: ActionError["fieldPath"],
): ActionError {
  return {
    code,
    message,
    ...(fieldPath === undefined ? {} : { fieldPath }),
    retryable: RETRYABLE_CODES.has(code),
  };
}

export function actionFailure(
  requestId: string,
  errors: readonly [ActionError, ...ActionError[]],
): ActionFailure {
  return { ok: false, requestId, errors: [...errors] };
}

/** Turns a schema rejection into the bounded failure envelope the surfaces render. */
export function validationFailure(
  requestId: string,
  error: z.ZodError,
): ActionFailure {
  const errors = error.issues.map((issue) =>
    actionError(
      "validation",
      issue.message,
      issue.path.filter(
        (segment): segment is string | number =>
          typeof segment === "string" || typeof segment === "number",
      ),
    ),
  );

  return {
    ok: false,
    requestId,
    errors:
      errors.length > 0
        ? errors
        : [actionError("validation", "Request payload is invalid.")],
  };
}
