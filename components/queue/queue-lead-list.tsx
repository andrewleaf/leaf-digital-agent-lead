"use client";

import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export type QueueLeadStatusTone =
  "needs-review" | "ready" | "missing-website" | "low-confidence" | "sent";

export type QueueLeadView = "all" | "needs-review" | "ready";

export type QueueLeadRow = {
  id: string;
  indexLabel: string;
  name: string;
  statusLabel: string;
  statusTone: QueueLeadStatusTone;
  niche: string;
  metro: string;
  domainLabel: string;
  factsLabel: string;
};

export type QueueLeadListProps = {
  rows: QueueLeadRow[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  view: QueueLeadView;
  onViewChange: (view: QueueLeadView) => void;
  query: string;
  onQueryChange: (value: string) => void;
  totalCount: number;
  pendingCount: number;
  viewCounts: { all: number; needsReview: number; ready: number };
  disabled?: boolean;
  className?: string;
};

export const QUEUE_FILTER_LABEL = "Filter queue by business or city";
export const QUEUE_FILTER_PLACEHOLDER = "Filter queue by business or city";
export const QUEUE_VIEWS_LABEL = "Queue views";
export const QUEUE_TITLE = "Queue";

export const QUEUE_LEAD_LIST_ROWS: QueueLeadRow[] = [
  {
    id: "lonestar-air",
    indexLabel: "#01",
    name: "Lonestar Air & Heating",
    statusLabel: "Needs Review",
    statusTone: "needs-review",
    niche: "HVAC",
    metro: "South Austin",
    domainLabel: "lonestarair-tx.com",
    factsLabel: "2 Verified Facts",
  },
  {
    id: "round-rock-comfort",
    indexLabel: "#02",
    name: "Round Rock Comfort Pros",
    statusLabel: "Needs Review",
    statusTone: "needs-review",
    niche: "HVAC",
    metro: "Round Rock",
    domainLabel: "comfortpros…",
    factsLabel: "2 Verified Facts",
  },
  {
    id: "cedar-park-hvac",
    indexLabel: "#03",
    name: "Cedar Park HVAC Sp.",
    statusLabel: "Ready",
    statusTone: "ready",
    niche: "HVAC",
    metro: "Cedar Park",
    domainLabel: "cedarparkhv…",
    factsLabel: "3 Verified Facts",
  },
  {
    id: "apex-cool",
    indexLabel: "#04",
    name: "Apex Cool Mechanical",
    statusLabel: "Missing Website",
    statusTone: "missing-website",
    niche: "HVAC",
    metro: "Austin",
    domainLabel: "Google Maps Only",
    factsLabel: "0 Website Facts",
  },
  {
    id: "barton-springs",
    indexLabel: "#05",
    name: "Barton Springs HVAC",
    statusLabel: "Low Confidence",
    statusTone: "low-confidence",
    niche: "HVAC",
    metro: "Austin",
    domainLabel: "bartonspringsh…",
    factsLabel: "1 Candidate Fact",
  },
  {
    id: "hill-country",
    indexLabel: "#06",
    name: "Hill Country Climate Solutions",
    statusLabel: "Needs Review",
    statusTone: "needs-review",
    niche: "HVAC",
    metro: "Cedar Park",
    domainLabel: "hcclimatesolut…",
    factsLabel: "2 Verified Facts",
  },
  {
    id: "capital-city-heat",
    indexLabel: "#07",
    name: "Capital City Heat",
    statusLabel: "Sent (Yesterday)",
    statusTone: "sent",
    niche: "HVAC",
    metro: "Austin",
    domainLabel: "capitalcityheat…",
    factsLabel: "Dispatched Manual",
  },
];

const FILTER_ID = "queue-lead-list-filter";

const VIEWS = [
  { value: "all", label: "All" },
  { value: "needs-review", label: "Needs Review" },
  { value: "ready", label: "Ready" },
] as const satisfies readonly { value: QueueLeadView; label: string }[];

const STATUS_BADGE_CLASS: Record<QueueLeadStatusTone, string> = {
  "needs-review": "border-[#99F6E4] bg-[#F0FDFA] text-[#0F766E]",
  ready: "border-[#A7F3D0] bg-[#ECFDF5] text-[#047857]",
  "missing-website": "border-[#FECDD3] bg-[#FFF1F2] text-[#E11D48]",
  "low-confidence": "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]",
  sent: "border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B]",
};

function isQueueLeadView(value: string): value is QueueLeadView {
  return VIEWS.some((view) => view.value === value);
}

function viewCount(
  value: QueueLeadView,
  counts: QueueLeadListProps["viewCounts"],
) {
  switch (value) {
    case "all":
      return counts.all;
    case "needs-review":
      return counts.needsReview;
    case "ready":
      return counts.ready;
  }
}

function viewChipLabel(
  value: QueueLeadView,
  label: string,
  counts: QueueLeadListProps["viewCounts"],
) {
  if (value === "ready") {
    return label;
  }
  return `${label} (${viewCount(value, counts)})`;
}

function factsTextClass(factsLabel: string) {
  if (/verified facts/i.test(factsLabel)) {
    return "text-[#047857]";
  }
  if (factsLabel === "0 Website Facts") {
    return "text-[#E11D48]";
  }
  if (factsLabel === "1 Candidate Fact") {
    return "text-[#D97706]";
  }
  return "text-[#64748B]";
}

function rowMeta(row: QueueLeadRow) {
  return [row.niche, row.metro, row.domainLabel].filter(Boolean).join(" • ");
}

export function QueueLeadList({
  rows,
  selectedId,
  onSelect,
  view,
  onViewChange,
  query,
  onQueryChange,
  totalCount,
  pendingCount,
  viewCounts,
  disabled = false,
  className,
}: QueueLeadListProps) {
  return (
    <section
      className={cn(
        "flex flex-col rounded-[8px] border border-[#E2E8F0] bg-white",
        className,
      )}
    >
      <header className="flex items-center gap-2 px-3 pt-3">
        <h2 className="text-[15px] leading-5 font-semibold text-[#0F172A]">
          {QUEUE_TITLE}
        </h2>
        <span className="text-[13px] leading-[18px] text-[#64748B]">
          {totalCount}
        </span>
        <Badge className="ml-auto h-5 rounded-[4px] border border-[#FDE68A] bg-[#FFFBEB] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#D97706]">
          {pendingCount} PENDING
        </Badge>
      </header>

      <div className="px-3 pt-3">
        <Label htmlFor={FILTER_ID} className="sr-only">
          {QUEUE_FILTER_LABEL}
        </Label>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-[#94A3B8]"
          />
          <Input
            id={FILTER_ID}
            type="search"
            value={query}
            disabled={disabled}
            placeholder={QUEUE_FILTER_PLACEHOLDER}
            onChange={(event) => onQueryChange(event.target.value)}
            className="h-8 rounded-[6px] border-[#CBD5E1] bg-white pl-8 text-[12px] leading-4 text-[#0F172A] shadow-none placeholder:text-[#94A3B8] focus-visible:border-[#0F766E] focus-visible:ring-[2px] focus-visible:ring-[rgba(15,118,110,0.15)]"
          />
        </div>
      </div>

      <ToggleGroup
        type="single"
        value={view}
        disabled={disabled}
        spacing={1}
        aria-label={QUEUE_VIEWS_LABEL}
        onValueChange={(next) => {
          if (!next || !isQueueLeadView(next)) {
            return;
          }
          onViewChange(next);
        }}
        className="flex-wrap px-3 pt-3"
      >
        {VIEWS.map((item) => (
          <ToggleGroupItem
            key={item.value}
            value={item.value}
            className="h-8 rounded-[6px] border-0 bg-transparent px-2.5 text-[12px] leading-4 font-medium tracking-[0.01em] text-[#475569] shadow-none hover:bg-[#F8FAFC] hover:text-[#475569] data-[state=on]:bg-[#0F766E] data-[state=on]:font-semibold data-[state=on]:text-white"
          >
            {viewChipLabel(item.value, item.label, viewCounts)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ul className="flex flex-col px-1 py-2">
        {rows.map((row) => {
          const selected = row.id === selectedId;
          return (
            <li key={row.id}>
              <Button
                type="button"
                variant="ghost"
                disabled={disabled}
                aria-pressed={selected}
                onClick={() => onSelect(row.id)}
                className={cn(
                  "h-11 w-full min-w-0 shrink justify-start gap-2 overflow-hidden rounded-[6px] px-2 text-left font-normal whitespace-nowrap shadow-none hover:bg-[#F8FAFC] hover:text-[#0F172A]",
                  selected &&
                    "bg-[#F0FDFA] shadow-[inset_0_0_0_2px_#0F766E] hover:bg-[#F0FDFA]",
                )}
              >
                <span className="min-w-0 flex-1 truncate text-[13px] leading-[18px] font-medium text-[#0F172A]">
                  {row.name}
                </span>
                <Badge
                  className={cn(
                    "h-5 rounded-[4px] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em]",
                    STATUS_BADGE_CLASS[row.statusTone],
                  )}
                >
                  {row.statusLabel}
                </Badge>
                <span className="min-w-0 truncate text-[12px] leading-4 text-[#64748B]">
                  {rowMeta(row)}
                </span>
                <span
                  className={cn(
                    "shrink-0 text-[12px] leading-4 font-medium",
                    factsTextClass(row.factsLabel),
                  )}
                >
                  {row.factsLabel}
                </span>
                <span className="shrink-0 font-mono text-[12px] leading-4 font-normal text-[#94A3B8]">
                  {row.indexLabel}
                </span>
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
