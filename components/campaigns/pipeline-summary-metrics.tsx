import type { ReactNode } from "react";
import {
  BadgeCheck,
  Check,
  MailCheck,
  Search,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type PipelineDiscoveredMetrics = {
  value: number;
  atx: number;
  rr: number;
  cp: number;
};

export type PipelineMatchedMetrics = {
  value: number;
  of: number;
  resolutionRate: string;
  offline: number;
};

export type PipelineCitationMetrics = {
  value: number;
  avgFactsPerOrg: string;
};

export type PipelineAttentionMetrics = {
  value: number;
  missingUrls: number;
  lowConfidence: number;
};

export type PipelineDraftsReadyMetrics = {
  value: number;
};

export type PipelineSummaryMetricsProps = {
  discovered: PipelineDiscoveredMetrics;
  matched: PipelineMatchedMetrics;
  citations: PipelineCitationMetrics;
  attention: PipelineAttentionMetrics;
  draftsReady: PipelineDraftsReadyMetrics;
  className?: string;
};

const metroChipClassName =
  "h-5 rounded-[4px] border-0 bg-[#F1F5F9] px-1.5 font-mono text-[11px] leading-[14px] font-normal tracking-[0.02em] text-[#475569]";

function MetricCard({
  label,
  icon: Icon,
  iconClassName,
  children,
  footer,
}: {
  label: string;
  icon: LucideIcon;
  iconClassName: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <Card className="gap-3 rounded-lg border border-[#E2E8F0] bg-white py-0 shadow-none">
      <CardHeader className="gap-2 px-3 pt-3 pb-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B] uppercase">
            {label}
          </p>
          <Icon aria-hidden="true" className={cn("size-4 shrink-0", iconClassName)} />
        </div>
        <CardTitle className="font-semibold tracking-normal">{children}</CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3">{footer}</CardContent>
    </Card>
  );
}

function HeroNumber({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <span
      data-slot="metric-hero"
      className={cn(
        "text-[28px] leading-9 font-semibold text-[#0F172A]",
        className,
      )}
    >
      {value}
    </span>
  );
}

export function PipelineSummaryMetrics({
  discovered,
  matched,
  citations,
  attention,
  draftsReady,
  className,
}: PipelineSummaryMetricsProps) {
  const attentionEmphasis = attention.value > 0;
  const draftsEmphasis = draftsReady.value > 0;

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5",
        className,
      )}
    >
      <MetricCard
        label="Businesses Discovered"
        icon={Search}
        iconClassName="text-[#64748B]"
        footer={
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className={metroChipClassName}>
              ATX: {discovered.atx}
            </Badge>
            <Badge variant="secondary" className={metroChipClassName}>
              RR: {discovered.rr}
            </Badge>
            <Badge variant="secondary" className={metroChipClassName}>
              CP: {discovered.cp}
            </Badge>
          </div>
        }
      >
        <HeroNumber value={discovered.value} />
      </MetricCard>

      <MetricCard
        label="Websites Matched"
        icon={BadgeCheck}
        iconClassName="text-[#64748B]"
        footer={
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="flex items-center gap-1 text-[12px] leading-4 font-medium tracking-[0.01em] text-[#047857]">
              <Check aria-hidden="true" className="size-3.5" />
              {matched.resolutionRate} resolution rate
            </p>
            <p className="text-[12px] leading-4 tracking-[0.01em] text-[#64748B]">
              {matched.offline} offline
            </p>
          </div>
        }
      >
        <HeroNumber value={matched.value} />
        <span className="ml-1 text-[12px] leading-4 font-normal tracking-[0.01em] text-[#64748B]">
          / {matched.of} targets
        </span>
      </MetricCard>

      <MetricCard
        label="Fact Citations"
        icon={BadgeCheck}
        iconClassName="text-[#64748B]"
        footer={
          <div className="flex flex-col gap-0.5">
            <p className="text-[12px] leading-4 tracking-[0.01em] text-[#64748B]">
              Avg. Extracted Payload
            </p>
            <p className="text-[13px] leading-[18px] font-medium text-[#0F766E]">
              {citations.avgFactsPerOrg}
            </p>
          </div>
        }
      >
        <HeroNumber value={citations.value} />
      </MetricCard>

      <MetricCard
        label="Attention Required"
        icon={TriangleAlert}
        iconClassName={attentionEmphasis ? "text-[#E11D48]" : "text-[#64748B]"}
        footer={
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] leading-4 tracking-[0.01em]">
            <p className="text-[#64748B]">
              Missing URLs{" "}
              <span className="font-medium text-[#0F172A]">
                {attention.missingUrls}
              </span>
            </p>
            <p className="text-[#64748B]">
              Low Confidence{" "}
              <span className="font-medium text-[#0F172A]">
                {attention.lowConfidence}
              </span>
            </p>
          </div>
        }
      >
        <HeroNumber
          value={attention.value}
          className={attentionEmphasis ? "text-[#E11D48]" : undefined}
        />
      </MetricCard>

      <MetricCard
        label="Drafts Ready"
        icon={MailCheck}
        iconClassName={draftsEmphasis ? "text-[#0F766E]" : "text-[#64748B]"}
        footer={
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[12px] leading-4 tracking-[0.01em] text-[#64748B]">
              Triage Desk Ready
            </p>
            <Badge
              variant="secondary"
              className={cn(
                "h-5 rounded-[4px] border-0 px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em]",
                draftsEmphasis
                  ? "bg-[#F0FDFA] text-[#0F766E]"
                  : metroChipClassName,
              )}
            >
              Manual Send
            </Badge>
          </div>
        }
      >
        <HeroNumber
          value={draftsReady.value}
          className={draftsEmphasis ? "text-[#0F766E]" : undefined}
        />
      </MetricCard>
    </div>
  );
}
