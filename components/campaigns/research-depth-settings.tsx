"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const RESEARCH_DEPTH_EYEBROW = "Fact Engine";
export const REQUIRE_WEBSITE_LABEL =
  "Require verified public website before draft generation";
export const REQUIRE_WEBSITE_HELPER =
  "Discards directories, blank landing pages, or unregistered domains. Only analyzes active storefront sites.";
export const REQUIRE_WEBSITE_SEVERITY = "Strict";
export const EXTRACT_PROOF_POINTS_LABEL =
  "Extract booking capabilities, emergency hours, and founding year";
export const EXTRACT_PROOF_POINTS_HELPER =
  'Pulls specific proof points into the lead profile for genuine operator context (e.g. "Family owned since 1994", "24/7 Dispatch").';
export const FALLBACK_ACTION_LABEL =
  "Fallback action for low-confidence crawl:";
export const DENSITY_CAPTION =
  "High Verification Density Guardrails actively protect domain deliverability and response rates.";

export const FALLBACK_ACTIONS = [
  {
    value: "flag-unverified",
    label: "Flag unverified websites for manual operator check",
  },
] as const;

export type ResearchDepthSettingsProps = {
  requireWebsite: boolean;
  onRequireWebsiteChange: (value: boolean) => void;
  extractProofPoints: boolean;
  onExtractProofPointsChange: (value: boolean) => void;
  fallbackAction: string | null;
  onFallbackActionChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

const REQUIRE_WEBSITE_ID = "research-depth-require-website";
const EXTRACT_PROOF_POINTS_ID = "research-depth-extract-proof-points";
const FALLBACK_LABEL_ID = "research-depth-fallback-label";

export function ResearchDepthSettings({
  requireWebsite,
  onRequireWebsiteChange,
  extractProofPoints,
  onExtractProofPointsChange,
  fallbackAction,
  onFallbackActionChange,
  disabled = false,
  className,
}: ResearchDepthSettingsProps) {
  return (
    <Card
      className={cn(
        "gap-0 rounded-lg border border-[#E2E8F0] bg-white py-0 shadow-none",
        className,
      )}
    >
      <CardContent className="flex flex-col gap-0 px-4 py-4">
        <p className="mb-3 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B]">
          {RESEARCH_DEPTH_EYEBROW}
        </p>

        <div className="flex min-h-11 items-start gap-3 border-b border-[#F1F5F9] py-3">
          <Switch
            id={REQUIRE_WEBSITE_ID}
            checked={requireWebsite}
            disabled={disabled}
            onCheckedChange={onRequireWebsiteChange}
            className="mt-0.5 data-[state=checked]:bg-[#0F766E]"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label
                htmlFor={REQUIRE_WEBSITE_ID}
                className="text-[13px] leading-[18px] font-medium text-[#0F172A]"
              >
                {REQUIRE_WEBSITE_LABEL}
              </Label>
              {requireWebsite ? (
                <Badge className="h-5 rounded-[4px] border border-[#A7F3D0] bg-[#ECFDF5] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#047857]">
                  {REQUIRE_WEBSITE_SEVERITY}
                </Badge>
              ) : null}
            </div>
            <p className="text-[12px] leading-4 font-normal tracking-[0.01em] text-[#64748B]">
              {REQUIRE_WEBSITE_HELPER}
            </p>
          </div>
        </div>

        <div className="flex min-h-11 items-start gap-3 border-b border-[#F1F5F9] py-3">
          <Checkbox
            id={EXTRACT_PROOF_POINTS_ID}
            checked={extractProofPoints}
            disabled={disabled}
            onCheckedChange={(checked) =>
              onExtractProofPointsChange(checked === true)
            }
            className="mt-0.5 size-4 rounded-[4px] border-[#CBD5E1] data-[state=checked]:border-[#0F766E] data-[state=checked]:bg-[#0F766E]"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <Label
              htmlFor={EXTRACT_PROOF_POINTS_ID}
              className="text-[13px] leading-[18px] font-medium text-[#0F172A]"
            >
              {EXTRACT_PROOF_POINTS_LABEL}
            </Label>
            <p className="text-[12px] leading-4 font-normal tracking-[0.01em] text-[#64748B]">
              {EXTRACT_PROOF_POINTS_HELPER}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-3">
          <p
            id={FALLBACK_LABEL_ID}
            className="text-[12px] leading-4 font-medium tracking-[0.01em] text-[#0F172A]"
          >
            {FALLBACK_ACTION_LABEL}
          </p>
          <RadioGroup
            value={fallbackAction ?? ""}
            disabled={disabled}
            aria-labelledby={FALLBACK_LABEL_ID}
            onValueChange={onFallbackActionChange}
            className="gap-2"
          >
            {FALLBACK_ACTIONS.map((action) => {
              const itemId = `research-depth-fallback-${action.value}`;
              return (
                <div key={action.value} className="flex items-center gap-2">
                  <RadioGroupItem
                    id={itemId}
                    value={action.value}
                    className="border-[#CBD5E1] text-[#0F766E]"
                  />
                  <Label
                    htmlFor={itemId}
                    className="text-[13px] leading-[18px] font-normal text-[#0F172A]"
                  >
                    {action.label}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        <p className="pt-1 text-[12px] leading-4 font-normal tracking-[0.01em] text-[#64748B]">
          {DENSITY_CAPTION}
        </p>
      </CardContent>
    </Card>
  );
}
