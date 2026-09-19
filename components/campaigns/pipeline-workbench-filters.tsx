"use client";

import { Download, ListFilter } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export type WorkbenchView =
  | "all"
  | "needs-attention"
  | "ready-review"
  | "completed";

export const WORKBENCH_VIEWS = [
  { value: "all", label: "All Pipeline Items" },
  { value: "needs-attention", label: "Needs Attention" },
  { value: "ready-review", label: "Ready for Review" },
  { value: "completed", label: "Completed" },
] as const satisfies readonly { value: WorkbenchView; label: string }[];

export const WORKBENCH_FILTER_LABEL = "Filter company or city";
export const WORKBENCH_FILTER_PLACEHOLDER = "Filter company or city...";
export const WORKBENCH_EXPORT_LABEL = "Export CSV";
export const WORKBENCH_VIEWS_LABEL = "Pipeline views";

export type PipelineWorkbenchFiltersProps = {
  value: WorkbenchView;
  onValueChange: (value: WorkbenchView) => void;
  counts: {
    all: number;
    needsAttention: number;
    readyReview: number;
    completed: number;
  };
  query: string;
  onQueryChange: (value: string) => void;
  onExport: () => void;
  disabled?: boolean;
  className?: string;
};

const FILTER_ID = "pipeline-workbench-filter";

function countForView(
  value: WorkbenchView,
  counts: PipelineWorkbenchFiltersProps["counts"],
) {
  switch (value) {
    case "all":
      return counts.all;
    case "needs-attention":
      return counts.needsAttention;
    case "ready-review":
      return counts.readyReview;
    case "completed":
      return counts.completed;
  }
}

function isWorkbenchView(value: string): value is WorkbenchView {
  return WORKBENCH_VIEWS.some((view) => view.value === value);
}

export function PipelineWorkbenchFilters({
  value,
  onValueChange,
  counts,
  query,
  onQueryChange,
  onExport,
  disabled = false,
  className,
}: PipelineWorkbenchFiltersProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 bg-[#F8FAFC]/40 p-3",
        className,
      )}
    >
      <ToggleGroup
        type="single"
        value={value}
        disabled={disabled}
        spacing={1}
        aria-label={WORKBENCH_VIEWS_LABEL}
        onValueChange={(next) => {
          if (!next || !isWorkbenchView(next)) {
            return;
          }
          onValueChange(next);
        }}
        className="flex-wrap"
      >
        {WORKBENCH_VIEWS.map((view) => {
          const count = countForView(view.value, counts);
          const showBadge =
            view.value === "needs-attention" || view.value === "ready-review";

          return (
            <ToggleGroupItem
              key={view.value}
              value={view.value}
              className="h-8 gap-1.5 rounded-[6px] border-0 bg-transparent px-2.5 text-[12px] leading-4 font-medium tracking-[0.01em] text-[#475569] shadow-none hover:bg-[#F8FAFC] hover:text-[#475569] data-[state=on]:bg-[#F1F5F9] data-[state=on]:font-semibold data-[state=on]:text-[#0F172A]"
            >
              {view.label}
              {showBadge ? (
                <Badge
                  className={cn(
                    "h-5 rounded-[4px] border-transparent px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em]",
                    view.value === "needs-attention"
                      ? "bg-[#FFF1F2] text-[#E11D48]"
                      : "bg-[#F0FDFA] text-[#0F766E]",
                  )}
                >
                  {count}
                </Badge>
              ) : (
                <span className="font-mono text-[12px] leading-4 font-normal text-[#64748B]">
                  {count}
                </span>
              )}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex items-center">
          <Label htmlFor={FILTER_ID} className="sr-only">
            {WORKBENCH_FILTER_LABEL}
          </Label>
          <ListFilter
            aria-hidden="true"
            className="pointer-events-none absolute left-2.5 size-3.5 text-[#94A3B8]"
          />
          <Input
            id={FILTER_ID}
            type="search"
            value={query}
            disabled={disabled}
            placeholder={WORKBENCH_FILTER_PLACEHOLDER}
            onChange={(event) => onQueryChange(event.target.value)}
            className="h-8 w-52 rounded-[6px] border-[#CBD5E1] bg-white pl-8 text-[12px] leading-4 text-[#0F172A] shadow-none placeholder:text-[#94A3B8] focus-visible:border-[#0F766E] focus-visible:ring-[2px] focus-visible:ring-[rgba(15,118,110,0.15)]"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={onExport}
          className="h-8 rounded-[6px] border border-[#E2E8F0] bg-white px-3 text-[12px] leading-4 font-medium text-[#0F172A] shadow-none hover:border-[#CBD5E1] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
        >
          <Download aria-hidden="true" className="size-3.5" />
          {WORKBENCH_EXPORT_LABEL}
        </Button>
      </div>
    </div>
  );
}
