"use client";

import type { LucideIcon } from "lucide-react";
import {
  CircleAlert,
  CircleHelp,
  Eye,
  FilePen,
  FlaskConical,
  Globe,
  Link,
  ListChecks,
  Shield,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type PipelineWorkbenchRow = {
  id: string;
  initials: string;
  name: string;
  detail: string;
  metro: string;
  stageLabel: string;
  stageTone: "ready" | "missing" | "low-confidence" | "generating";
  citationsLabel: string;
  citationsDetail?: string;
  citationsTone: "verified" | "warning" | "amber" | "complete";
  actionLabel: string;
  actionTone: "primary" | "secondary";
  category: "ready-review" | "needs-attention" | "completed";
};

export type PipelineWorkbenchTableProps = {
  rows: PipelineWorkbenchRow[];
  onAction: (id: string) => void;
  className?: string;
};

const COLUMN_HEADERS = [
  "Business Name",
  "Metro Location",
  "Pipeline Stage",
  "Confidence & Citations",
  "Operator Next Action",
] as const;

export const PIPELINE_WORKBENCH_ROWS: PipelineWorkbenchRow[] = [
  {
    id: "lonestar-air",
    initials: "LA",
    name: "Lonestar Air & Heating",
    detail: "lonestarairtx.com • TDLR #TACLA019822E",
    metro: "Austin, TX",
    stageLabel: "Stage 6: Ready for Review",
    stageTone: "ready",
    citationsLabel: "3 Verified Facts",
    citationsDetail: "Austin Chronicle '23 Best Pick, 24/7 Dispatch",
    citationsTone: "verified",
    actionLabel: "Review Draft",
    actionTone: "primary",
    category: "ready-review",
  },
  {
    id: "round-rock-comfort",
    initials: "RR",
    name: "Round Rock Comfort Pros",
    detail: "rrcomfortpros.net • Carrier Authorized",
    metro: "Round Rock, TX",
    stageLabel: "Stage 6: Ready for Review",
    stageTone: "ready",
    citationsLabel: "2 Verified Facts",
    citationsDetail: "14 Techs, Lennox Premier Dealer Status",
    citationsTone: "verified",
    actionLabel: "Review Draft",
    actionTone: "primary",
    category: "ready-review",
  },
  {
    id: "apex-cool",
    initials: "AC",
    name: "Apex Cool Mechanical",
    detail: "Registered entity: APEX COOL LLC",
    metro: "Austin, TX",
    stageLabel: "Stage 3: Missing Website",
    stageTone: "missing",
    citationsLabel: "Warning: Primary domain unreachable / DNS error",
    citationsTone: "warning",
    actionLabel: "Add Website URL",
    actionTone: "secondary",
    category: "needs-attention",
  },
  {
    id: "barton-springs",
    initials: "BS",
    name: "Barton Springs HVAC",
    detail: "bartonspringshvac.com • South Lamar Blvd",
    metro: "Austin, TX",
    stageLabel: "Stage 4: Low Confidence",
    stageTone: "low-confidence",
    citationsLabel: "Amber: Commercial service hours conflict",
    citationsTone: "amber",
    actionLabel: "Verify Source",
    actionTone: "secondary",
    category: "needs-attention",
  },
  {
    id: "hill-country",
    initials: "HC",
    name: "Hill Country Climate Solutions",
    detail: "hillcountryclimate.com • Bell Blvd",
    metro: "Cedar Park, TX",
    stageLabel: "Stage 5: Generating Draft",
    stageTone: "generating",
    citationsLabel: "Research Complete",
    citationsDetail: "Awaiting AI synthesis queue slot #3",
    citationsTone: "complete",
    actionLabel: "View Live Research",
    actionTone: "secondary",
    category: "completed",
  },
];

const STAGE_ICON: Record<PipelineWorkbenchRow["stageTone"], LucideIcon | null> =
  {
    ready: ListChecks,
    missing: Globe,
    "low-confidence": Shield,
    generating: null,
  };

const ACTION_ICON: Record<string, LucideIcon> = {
  "Review Draft": FilePen,
  "Add Website URL": Link,
  "Verify Source": Eye,
  "View Live Research": FlaskConical,
};

function stageBadgeClass(tone: PipelineWorkbenchRow["stageTone"]) {
  if (tone === "ready") {
    return "border-[#99F6E4] bg-[#F0FDFA] text-[#0F766E]";
  }
  if (tone === "generating") {
    return "border-[#BAE6FD] bg-[#F0F9FF] text-[#0284C7]";
  }
  return "border-[#E2E8F0] bg-[#F1F5F9] text-[#475569]";
}

function initialsTileClass(tone: PipelineWorkbenchRow["stageTone"]) {
  if (tone === "missing") {
    return "bg-[#F0F9FF] text-[#0284C7]";
  }
  return "bg-[#F0FDFA] text-[#0F766E]";
}

export function PipelineWorkbenchTable({
  rows,
  onAction,
  className,
}: PipelineWorkbenchTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[8px] border border-[#E2E8F0] bg-white",
        className,
      )}
    >
      <Table className="text-[13px] leading-[18px]">
        <TableHeader>
          <TableRow className="border-[#E2E8F0] hover:bg-[#F8FAFC]">
            {COLUMN_HEADERS.map((header) => (
              <TableHead
                key={header}
                className={cn(
                  "h-10 bg-[#F8FAFC] px-3 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B] uppercase",
                  header === "Operator Next Action" && "text-right",
                )}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
            const StageIcon = STAGE_ICON[row.stageTone];
            const ActionIcon = ACTION_ICON[row.actionLabel];
            const attention = row.category === "needs-attention" &&
              row.citationsTone === "warning";

            return (
              <TableRow
                key={row.id}
                data-category={row.category}
                className={cn(
                  "group border-[#F1F5F9] hover:bg-[#F8FAFC]",
                  attention && "bg-[#E11D48]/5 hover:bg-[#E11D48]/10",
                )}
              >
                <TableCell className="min-w-[16rem] whitespace-normal px-3 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "inline-flex size-7 shrink-0 items-center justify-center rounded-[6px] font-mono text-[12px] leading-4 font-semibold tracking-[0.01em]",
                        initialsTileClass(row.stageTone),
                      )}
                    >
                      {row.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] leading-[18px] font-semibold text-[#0F172A] group-hover:text-[#0F766E]">
                        {row.name}
                      </p>
                      <p className="font-mono text-[12px] leading-4 text-[#64748B]">
                        {row.detail}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-2.5">
                  <Badge
                    variant="outline"
                    className="h-5 rounded-[4px] border-transparent bg-[#F1F5F9] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#475569]"
                  >
                    {row.metro}
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-2.5">
                  <Badge
                    variant="outline"
                    className={cn(
                      "h-5 gap-1 rounded-[4px] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em]",
                      stageBadgeClass(row.stageTone),
                    )}
                  >
                    {row.stageTone === "generating" ? (
                      <span
                        aria-hidden="true"
                        className="size-1.5 animate-pulse rounded-full bg-[#0284C7]"
                      />
                    ) : StageIcon ? (
                      <StageIcon aria-hidden="true" className="size-3" />
                    ) : null}
                    {row.stageLabel}
                  </Badge>
                </TableCell>
                <TableCell className="min-w-[14rem] whitespace-normal px-3 py-2.5">
                  {row.citationsTone === "verified" ? (
                    <div className="flex flex-col gap-0.5">
                      <span className="inline-flex items-center gap-1.5 text-[12px] leading-4 font-semibold text-[#047857]">
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-[#047857]"
                        />
                        {row.citationsLabel}
                      </span>
                      {row.citationsDetail ? (
                        <span className="text-[12px] leading-4 text-[#64748B]">
                          {row.citationsDetail}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                  {row.citationsTone === "warning" ? (
                    <span className="inline-flex items-start gap-1.5 text-[12px] leading-4 font-medium text-[#E11D48]">
                      <CircleAlert
                        aria-hidden="true"
                        className="mt-0.5 size-3.5 shrink-0"
                      />
                      {row.citationsLabel}
                    </span>
                  ) : null}
                  {row.citationsTone === "amber" ? (
                    <span className="inline-flex items-start gap-1.5 text-[12px] leading-4 font-medium text-[#D97706]">
                      <CircleHelp
                        aria-hidden="true"
                        className="mt-0.5 size-3.5 shrink-0"
                      />
                      {row.citationsLabel}
                    </span>
                  ) : null}
                  {row.citationsTone === "complete" ? (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[12px] leading-4 font-semibold text-[#0F172A]">
                        {row.citationsLabel}
                      </span>
                      {row.citationsDetail ? (
                        <span className="text-[12px] leading-4 text-[#64748B]">
                          {row.citationsDetail}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-2.5 text-right">
                  <Button
                    type="button"
                    variant={
                      row.actionTone === "primary" ? "default" : "outline"
                    }
                    onClick={() => onAction(row.id)}
                    className={cn(
                      "h-7 rounded-[6px] px-2.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] shadow-none",
                      row.actionTone === "primary"
                        ? "bg-[#0F766E] text-white hover:bg-[#115E59]"
                        : "border border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] hover:text-[#0F172A]",
                    )}
                  >
                    {ActionIcon ? (
                      <ActionIcon aria-hidden="true" className="size-3" />
                    ) : null}
                    {row.actionLabel}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
