import type { ReactNode } from "react";
import {
  BadgeCheck,
  MessagesSquare,
  Share2,
  Shield,
  Timer,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type DashboardPipelinesMetrics = {
  value: number;
  paused: number;
  archived: number;
};

export type DashboardDomainValidMetrics = {
  rate: string;
  liveCount: number;
};

export type DashboardTriageMetrics = {
  avg: string;
  delta: string;
  approvedThisWeek: number;
};

export type DashboardCitationMetrics = {
  rate: string;
  hallucinations: number;
  flagged: number;
};

export type DashboardReplyRateMetrics = {
  rate: string;
  delta: string;
  caption: string;
};

export type DashboardTelemetryMetricsProps = {
  pipelines: DashboardPipelinesMetrics;
  domainValid: DashboardDomainValidMetrics;
  triage: DashboardTriageMetrics;
  citations: DashboardCitationMetrics;
  replyRate: DashboardReplyRateMetrics;
  className?: string;
};

export const DASHBOARD_TELEMETRY_MOCK: DashboardTelemetryMetricsProps = {
  pipelines: { value: 6, paused: 2, archived: 1 },
  domainValid: { rate: "94.2%", liveCount: 1345 },
  triage: { avg: "42s", delta: "-6s goal", approvedThisWeek: 312 },
  citations: { rate: "99.4%", hallucinations: 0, flagged: 8 },
  replyRate: {
    rate: "26.8%",
    delta: "+4.2%",
    caption: "High intent conversations",
  },
};

export const DASHBOARD_TELEMETRY_EMPTY: DashboardTelemetryMetricsProps = {
  pipelines: { value: 0, paused: 0, archived: 0 },
  domainValid: { rate: "0%", liveCount: 0 },
  triage: { avg: "0s", delta: "0s goal", approvedThisWeek: 0 },
  citations: { rate: "0%", hallucinations: 0, flagged: 0 },
  replyRate: { rate: "0%", delta: "0%", caption: "High intent conversations" },
};

const mutedChipClassName =
  "h-5 rounded-[4px] border-0 bg-[#F1F5F9] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#475569]";

function MetricCard({
  label,
  icon: Icon,
  children,
  footer,
}: {
  label: string;
  icon: LucideIcon;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <Card className="gap-3 rounded-[8px] border border-[#E2E8F0] bg-white py-0 shadow-none">
      <CardHeader className="gap-2 px-3 pt-3 pb-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B] uppercase">
            {label}
          </p>
          <Icon aria-hidden="true" className="size-4 shrink-0 text-[#64748B]" />
        </div>
        <CardTitle className="font-semibold tracking-normal">{children}</CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3">{footer}</CardContent>
    </Card>
  );
}

function HeroValue({
  value,
  className,
}: {
  value: string | number;
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

export function DashboardTelemetryMetrics({
  pipelines,
  domainValid,
  triage,
  citations,
  replyRate,
  className,
}: DashboardTelemetryMetricsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5",
        className,
      )}
    >
      <MetricCard
        label="Active Pipelines"
        icon={Share2}
        footer={
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className={mutedChipClassName}>
              {pipelines.paused} Paused
            </Badge>
            <Badge variant="secondary" className={mutedChipClassName}>
              {pipelines.archived} Archived
            </Badge>
          </div>
        }
      >
        <HeroValue value={pipelines.value} />
      </MetricCard>

      <MetricCard
        label="Live Domain Valid"
        icon={BadgeCheck}
        footer={
          <p className="text-[12px] leading-4 tracking-[0.01em] text-[#64748B]">
            {domainValid.liveCount.toLocaleString("en-US")} live
          </p>
        }
      >
        <HeroValue value={domainValid.rate} className="text-[#047857]" />
      </MetricCard>

      <MetricCard
        label="Avg Triage Time"
        icon={Timer}
        footer={
          <div className="flex flex-col gap-0.5">
            <p className="text-[12px] leading-4 font-medium tracking-[0.01em] text-[#047857]">
              {triage.delta}
            </p>
            <p className="text-[12px] leading-4 tracking-[0.01em] text-[#64748B]">
              {triage.approvedThisWeek.toLocaleString("en-US")} approved this wk
            </p>
          </div>
        }
      >
        <HeroValue value={triage.avg} />
      </MetricCard>

      <MetricCard
        label="Citation Integrity"
        icon={Shield}
        footer={
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] leading-4 tracking-[0.01em]">
            <p className="text-[#64748B]">{citations.hallucinations} halluc.</p>
            <p className="text-[#D97706]">
              {citations.flagged} flagged for review
            </p>
          </div>
        }
      >
        <HeroValue value={citations.rate} className="text-[#047857]" />
      </MetricCard>

      <MetricCard
        label="Owner Reply Rate"
        icon={MessagesSquare}
        footer={
          <div className="flex flex-col gap-0.5">
            <p className="text-[12px] leading-4 font-medium tracking-[0.01em] text-[#047857]">
              {replyRate.delta}
            </p>
            <p className="text-[12px] leading-4 tracking-[0.01em] text-[#64748B]">
              {replyRate.caption}
            </p>
          </div>
        }
      >
        <HeroValue value={replyRate.rate} />
      </MetricCard>
    </div>
  );
}
