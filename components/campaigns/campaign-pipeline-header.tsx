import { Clock, RefreshCw, ShieldCheck, Target } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type CampaignPipelineHeaderProps = {
  campaignId: string;
  statusLabel: string;
  guardLabel: string;
  title: string;
  createdLabel: string;
  targetLabel: string;
  ruleLabel: string;
  processing?: boolean;
  actions?: ReactNode;
  className?: string;
};

export function CampaignPipelineHeader({
  campaignId,
  statusLabel,
  guardLabel,
  title,
  createdLabel,
  targetLabel,
  ruleLabel,
  processing = false,
  actions,
  className,
}: CampaignPipelineHeaderProps) {
  return (
    <Card
      className={cn(
        "gap-3 rounded-[8px] border border-[#E2E8F0] bg-white py-4 shadow-none",
        className,
      )}
    >
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3 px-4 py-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="h-5 gap-1.5 rounded-[4px] border-transparent bg-[#F1F5F9] px-1.5 font-mono text-[12px] leading-4 font-normal tracking-normal text-[#475569]"
          >
            <span className="relative flex size-1.5" aria-hidden="true">
              {processing ? (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#0F766E] opacity-75" />
              ) : null}
              <span className="relative inline-flex size-1.5 rounded-full bg-[#0F766E]" />
            </span>
            {campaignId}
          </Badge>
          <Badge
            className={cn(
              "h-5 gap-1 rounded-[4px] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em]",
              processing
                ? "border-transparent bg-[#0F766E] text-white"
                : "border border-[#E2E8F0] bg-[#F1F5F9] text-[#94A3B8]",
            )}
          >
            <RefreshCw aria-hidden="true" className="size-[15px]" />
            {statusLabel}
          </Badge>
          <Badge
            variant="outline"
            className="h-5 rounded-[4px] border border-[#E2E8F0] bg-[#F1F5F9] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#475569]"
          >
            {guardLabel}
          </Badge>
        </div>
        {actions ? (
          <CardAction className="relative col-auto row-auto self-start justify-self-end">
            {actions}
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-4">
        <h1 className="text-[22px] leading-7 font-semibold tracking-normal text-[#0F172A]">
          {title}
        </h1>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] leading-4 text-[#64748B]">
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden="true" className="size-[15px] text-[#64748B]" />
            {createdLabel}
          </span>
          <span aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1">
            <Target aria-hidden="true" className="size-[15px] text-[#64748B]" />
            {targetLabel}
          </span>
          <span aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck
              aria-hidden="true"
              className="size-[15px] text-[#64748B]"
            />
            {ruleLabel}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
