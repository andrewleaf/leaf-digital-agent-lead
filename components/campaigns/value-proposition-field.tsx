"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const VALUE_PROPOSITION_LABEL =
  "Specific Value Proposition / Subject of Outreach";
export const VALUE_PROPOSITION_HINT = "Max 80 chars recommended";
export const VALUE_PROPOSITION_HELPER =
  "The research crawler will specifically isolate facts related to this offer (e.g. mobile responsiveness, quote inquiry speed).";
export const RECOMMENDED_MAX_CHARS = 80;

export type ValuePropositionFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
};

const TEXTAREA_ID = "value-proposition";
const HINT_ID = "value-proposition-hint";
const COUNT_ID = "value-proposition-count";
const HELPER_ID = "value-proposition-helper";

export function ValuePropositionField({
  value,
  onChange,
  disabled = false,
  maxLength,
  className,
}: ValuePropositionFieldProps) {
  const overRecommended = value.length > RECOMMENDED_MAX_CHARS;
  const showAttention = overRecommended && maxLength == null;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B]">
        Editorial Tone
      </p>

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <Label
          htmlFor={TEXTAREA_ID}
          className="text-[12px] leading-4 font-medium tracking-[0.01em] text-[#0F172A]"
        >
          {VALUE_PROPOSITION_LABEL}
        </Label>
        <span
          id={HINT_ID}
          className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B]"
        >
          {VALUE_PROPOSITION_HINT}
        </span>
      </div>

      <Textarea
        id={TEXTAREA_ID}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        aria-describedby={`${HINT_ID} ${COUNT_ID} ${HELPER_ID}`}
        aria-invalid={showAttention || undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "min-h-[72px] rounded-[6px] border bg-white px-3 py-2 text-[13px] leading-[18px] text-[#0F172A] shadow-none placeholder:text-[#94A3B8] focus-visible:ring-[2px]",
          showAttention
            ? "border-[#FDE68A] bg-[#FFFBEB] text-[#B45309] focus-visible:border-[#B45309] focus-visible:ring-[rgba(180,83,9,0.15)]"
            : "border-[#CBD5E1] focus-visible:border-[#0F766E] focus-visible:ring-[rgba(15,118,110,0.15)]",
        )}
      />

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p
          id={HELPER_ID}
          className="text-[12px] leading-4 font-normal tracking-[0.01em] text-[#64748B]"
        >
          {VALUE_PROPOSITION_HELPER}
        </p>
        <p
          id={COUNT_ID}
          className={cn(
            "text-[11px] leading-[14px] font-semibold tracking-[0.02em] tabular-nums",
            showAttention ? "text-[#B45309]" : "text-[#64748B]",
          )}
        >
          {value.length}
        </p>
      </div>
    </div>
  );
}
