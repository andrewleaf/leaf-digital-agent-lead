"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type CampaignOption = {
  id: string;
  label: string;
};

export type EngineStatus = "Active" | "Idle";

export type CampaignSetupStatusBarProps = {
  campaigns: CampaignOption[];
  selectedCampaignId: string | null;
  onCampaignChange: (id: string) => void;
  engineStatus: EngineStatus;
  autosavedAt: string | null;
  disabled?: boolean;
  className?: string;
};

const SELECT_ID = "target-campaign";

export function CampaignSetupStatusBar({
  campaigns,
  selectedCampaignId,
  onCampaignChange,
  engineStatus,
  autosavedAt,
  disabled = false,
  className,
}: CampaignSetupStatusBarProps) {
  const selectDisabled = disabled || campaigns.length === 0;
  const selectedCampaign = campaigns.find(
    (campaign) => campaign.id === selectedCampaignId,
  );

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2",
        className,
      )}
    >
      <div className="flex min-w-[16rem] items-center gap-2">
        <Label
          htmlFor={SELECT_ID}
          className="text-[12px] leading-4 font-medium tracking-[0.01em] text-[#0F172A]"
        >
          Target Campaign
        </Label>
        <Select
          value={selectedCampaign?.id}
          onValueChange={onCampaignChange}
          disabled={selectDisabled}
        >
          <SelectTrigger
            id={SELECT_ID}
            size="sm"
            aria-label="Target Campaign"
            className="h-8 min-w-[12rem] rounded-[6px] border border-[#CBD5E1] bg-white text-[13px] leading-[18px] text-[#0F172A] shadow-none focus-visible:border-[#0F766E] focus-visible:ring-[2px] focus-visible:ring-[rgba(15,118,110,0.15)]"
          >
            <SelectValue placeholder="Select a campaign" />
          </SelectTrigger>
          <SelectContent>
            {campaigns.map((campaign) => (
              <SelectItem key={campaign.id} value={campaign.id}>
                {campaign.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator
        orientation="vertical"
        className="hidden h-5 bg-[#F1F5F9] sm:block"
      />

      {engineStatus === "Active" ? (
        <Badge className="h-5 rounded-[4px] border border-[#A7F3D0] bg-[#ECFDF5] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#047857]">
          Lead Engine: Active
        </Badge>
      ) : (
        <Badge
          variant="outline"
          className="h-5 rounded-[4px] border border-[#E2E8F0] bg-white px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#94A3B8]"
        >
          Lead Engine: Idle
        </Badge>
      )}

      <p className="ml-auto flex items-baseline gap-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B]">
        <span>AUTOSAVED</span>
        {autosavedAt ? (
          <time className="font-mono text-[12px] leading-4 font-normal tracking-normal text-[#475569]">
            {autosavedAt}
          </time>
        ) : null}
      </p>
    </div>
  );
}
