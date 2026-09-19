"use client";

import { FilePen, LoaderCircle, PauseCircle, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const PAUSE_RESEARCH_LABEL = "Pause Research";
export const CAMPAIGN_SETTINGS_LABEL = "Campaign Settings";

export function jumpToReviewQueueLabel(readyCount: number) {
  return `Jump to Review Queue (${readyCount} Ready)`;
}

export type CampaignPipelineActionsProps = {
  readyCount: number;
  onPause: () => void;
  onSettings: () => void;
  onJumpToQueue: () => void;
  disabled?: boolean;
  pauseDisabled?: boolean;
  pending?: boolean;
  className?: string;
};

export function CampaignPipelineActions({
  readyCount,
  onPause,
  onSettings,
  onJumpToQueue,
  disabled = false,
  pauseDisabled = false,
  pending = false,
  className,
}: CampaignPipelineActionsProps) {
  const pauseBusy = disabled || pauseDisabled;
  const settingsBusy = disabled;
  const jumpBusy = pending || disabled;
  const jumpLabel = jumpToReviewQueueLabel(readyCount);

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Button
        type="button"
        variant="outline"
        disabled={pauseBusy}
        onClick={onPause}
        className="h-9 rounded-[6px] border border-[#E2E8F0] bg-white px-4 text-[13px] leading-[18px] font-medium text-[#0F172A] shadow-none hover:border-[#CBD5E1] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
      >
        <PauseCircle aria-hidden="true" className="size-4 text-[#64748B]" />
        {PAUSE_RESEARCH_LABEL}
      </Button>
      <Button
        type="button"
        variant="outline"
        disabled={settingsBusy}
        onClick={onSettings}
        className="h-9 rounded-[6px] border border-[#E2E8F0] bg-white px-4 text-[13px] leading-[18px] font-medium text-[#0F172A] shadow-none hover:border-[#CBD5E1] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
      >
        <SlidersHorizontal aria-hidden="true" className="size-4 text-[#64748B]" />
        {CAMPAIGN_SETTINGS_LABEL}
      </Button>
      <Button
        type="button"
        disabled={jumpBusy}
        aria-busy={pending || undefined}
        onClick={onJumpToQueue}
        className="h-9 rounded-[6px] bg-[#0F766E] px-4 text-[13px] leading-[18px] font-medium text-white shadow-none hover:bg-[#115E59]"
      >
        {pending ? (
          <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
        ) : (
          <FilePen aria-hidden="true" className="size-4" />
        )}
        {jumpLabel}
      </Button>
    </div>
  );
}
