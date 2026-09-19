"use client";

import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SAVE_DRAFT_LABEL = "Save as Draft";
export const INITIALIZE_PIPELINE_LABEL = "Initialize Campaign Pipeline";

export type CampaignSetupActionsProps = {
  onSaveDraft: () => void;
  onInitialize: () => void;
  disabled?: boolean;
  initializeDisabled?: boolean;
  pending?: boolean;
  className?: string;
};

export function CampaignSetupActions({
  onSaveDraft,
  onInitialize,
  disabled = false,
  initializeDisabled = false,
  pending = false,
  className,
}: CampaignSetupActionsProps) {
  const saveDisabled = disabled;
  const initializeBusy = pending || disabled || initializeDisabled;

  return (
    <div
      className={cn("flex flex-wrap items-center justify-end gap-2", className)}
    >
      <Button
        type="button"
        variant="outline"
        disabled={saveDisabled}
        onClick={onSaveDraft}
        className="h-9 rounded-[6px] border border-[#E2E8F0] bg-white px-4 text-[13px] leading-[18px] font-medium text-[#0F172A] shadow-none hover:border-[#CBD5E1] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
      >
        {SAVE_DRAFT_LABEL}
      </Button>
      <Button
        type="button"
        disabled={initializeBusy}
        aria-busy={pending || undefined}
        onClick={onInitialize}
        className="h-9 rounded-[6px] bg-[#0F766E] px-4 text-[13px] leading-[18px] font-medium text-white shadow-none hover:bg-[#115E59]"
      >
        {pending ? (
          <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
        ) : null}
        {INITIALIZE_PIPELINE_LABEL}
      </Button>
    </div>
  );
}
