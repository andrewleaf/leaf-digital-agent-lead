"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const CALL_TO_ACTION_LABEL = "Primary Call to Action (Soft Ask)";
export const CALL_TO_ACTION_STATUS = "Zero-friction alignment";
export const CALL_TO_ACTION_HELPER =
  "Low friction outreach yields 3.4x higher reply rates over direct sales calendar links.";

export type CallToActionFieldProps = {
  value: string;
  onChange: (value: string) => void;
  frictionStatus?: string | null;
  disabled?: boolean;
  className?: string;
};

const TEXTAREA_ID = "call-to-action";
const HELPER_ID = "call-to-action-helper";

export function CallToActionField({
  value,
  onChange,
  frictionStatus = CALL_TO_ACTION_STATUS,
  disabled = false,
  className,
}: CallToActionFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex min-h-5 flex-wrap items-center justify-between gap-2">
        <Label
          htmlFor={TEXTAREA_ID}
          className="text-[12px] leading-4 font-medium tracking-[0.01em] text-[#0F172A]"
        >
          {CALL_TO_ACTION_LABEL}
        </Label>
        {frictionStatus ? (
          <Badge className="h-5 rounded-[4px] border border-[#A7F3D0] bg-[#ECFDF5] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#047857]">
            {frictionStatus}
          </Badge>
        ) : null}
      </div>

      <Textarea
        id={TEXTAREA_ID}
        value={value}
        disabled={disabled}
        aria-describedby={HELPER_ID}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-[72px] rounded-[6px] border border-[#CBD5E1] bg-white px-3 py-2 text-[13px] leading-[18px] text-[#0F172A] shadow-none placeholder:text-[#94A3B8] focus-visible:border-[#0F766E] focus-visible:ring-[2px] focus-visible:ring-[rgba(15,118,110,0.15)]"
      />

      <p
        id={HELPER_ID}
        className="text-[12px] leading-4 font-normal tracking-[0.01em] text-[#64748B]"
      >
        {CALL_TO_ACTION_HELPER}
      </p>
    </div>
  );
}
