"use client";

import { Shield } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export const CAMPAIGNS_DASHBOARD_TITLE = "Campaigns Admin Dashboard";
export const CAMPAIGNS_DASHBOARD_EYEBROW = "Operator Core Live Telemetry";
export const CAMPAIGNS_DASHBOARD_DESCRIPTION =
  "Global administrative view of active multi-metro pipelines, operator triage throughput, citation audit health, and strictly non-automated dispatch metrics.";
export const CAMPAIGNS_DASHBOARD_GUARD_LABEL =
  "100% Manual Gate Enforced • 6 Active Pipelines • 0 Blast Automations Permitted";
export const CAMPAIGNS_DASHBOARD_METROS_LABEL = "Filter by metro";

export type DashboardMetro = {
  id: string;
  label: string;
};

export const CAMPAIGNS_DASHBOARD_METROS: DashboardMetro[] = [
  { id: "all", label: "All Metros" },
  { id: "central-tx", label: "Central TX" },
  { id: "north-dallas", label: "North Dallas" },
  { id: "chicagoland", label: "Chicagoland" },
];

export type CampaignsDashboardHeaderProps = {
  title: string;
  eyebrow: string;
  description: string;
  guardLabel: string;
  metros: DashboardMetro[];
  selectedMetroId: string;
  onMetroChange: (id: string) => void;
  disabled?: boolean;
  className?: string;
};

export function CampaignsDashboardHeader({
  title,
  eyebrow,
  description,
  guardLabel,
  metros,
  selectedMetroId,
  onMetroChange,
  disabled = false,
  className,
}: CampaignsDashboardHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-2">
        <p className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#0F766E] uppercase">
          {eyebrow}
        </p>
        <h1 className="text-[28px] leading-9 font-semibold tracking-[-0.02em] text-[#0F172A]">
          {title}
        </h1>
        <p className="max-w-2xl text-[15px] leading-[22px] text-[#475569]">
          {description}
        </p>
        <Badge
          variant="outline"
          className="h-5 w-fit gap-1 rounded-[4px] border border-[#A7F3D0] bg-[#ECFDF5] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#047857]"
        >
          <Shield aria-hidden="true" className="size-[15px]" />
          {guardLabel}
        </Badge>
      </div>

      {metros.length > 0 ? (
        <ToggleGroup
          type="single"
          value={selectedMetroId}
          disabled={disabled}
          spacing={1}
          aria-label={CAMPAIGNS_DASHBOARD_METROS_LABEL}
          onValueChange={(next) => {
            if (!next) {
              return;
            }
            onMetroChange(next);
          }}
          className="flex-wrap"
        >
          {metros.map((metro) => (
            <ToggleGroupItem
              key={metro.id}
              value={metro.id}
              className="h-8 rounded-[6px] border border-[#E2E8F0] bg-white px-2.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#475569] shadow-none hover:bg-[#F8FAFC] hover:text-[#475569] data-[state=on]:border-transparent data-[state=on]:bg-[#F0FDFA] data-[state=on]:text-[#0F766E] data-[state=on]:shadow-[inset_0_0_0_2px_#0F766E]"
            >
              {metro.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      ) : null}
    </div>
  );
}
