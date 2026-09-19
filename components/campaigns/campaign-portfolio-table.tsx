"use client";

import {
  CheckCircle2,
  EllipsisVertical,
  PauseCircle,
  Reply,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

export type CampaignPortfolioStageTone =
  | "active"
  | "scrape"
  | "review"
  | "discovery"
  | "paused"
  | "follow-up";

export type CampaignPortfolioRow = {
  id: string;
  initials: string;
  name: string;
  metros: string;
  stageLabel: string;
  stageTone: CampaignPortfolioStageTone;
  targetsLabel: string;
  verifiedLabel: string;
  queuePrimary: string;
  queueSecondary?: string;
  operatorName: string;
  operatorInitials?: string;
  integrityLabel: string;
  actionLabel: string;
  actionTone: "primary" | "secondary";
};

export type CampaignPortfolioTableProps = {
  title?: string;
  monitoredCount: number;
  rows: CampaignPortfolioRow[];
  onAction: (id: string) => void;
  onMore?: (id: string) => void;
  className?: string;
};

export const CAMPAIGN_PORTFOLIO_TITLE = "Campaign Portfolio & Health";

const COLUMN_HEADERS = [
  "Campaign & Metro",
  "Pipeline Stage",
  "Targets",
  "Desk Queue",
  "Operator",
  "Integrity",
  "Actions",
] as const;

export const CAMPAIGN_PORTFOLIO_ROWS: CampaignPortfolioRow[] = [
  {
    id: "central-texas-hvac",
    initials: "A",
    name: "Central Texas HVAC Outbound",
    metros: "Austin, Round Rock, Cedar Park",
    stageLabel: "Stage 5/6 Draft Assembly",
    stageTone: "active",
    targetsLabel: "128 targets",
    verifiedLabel: "121 verified (94.5%)",
    queuePrimary: "14 ready",
    queueSecondary: "84 sent",
    operatorName: "Alex M.",
    operatorInitials: "A",
    integrityLabel: "98%",
    actionLabel: "Triage",
    actionTone: "primary",
  },
  {
    id: "dfw-roofing",
    initials: "S",
    name: "DFW Commercial Roofing & Restoration",
    metros: "Dallas, Fort Worth, Plano",
    stageLabel: "Stage 4/6 Public Scrapes",
    stageTone: "scrape",
    targetsLabel: "340 targets",
    verifiedLabel: "318 verified (93.5%)",
    queuePrimary: "42 in scrape",
    operatorName: "Sarah K.",
    operatorInitials: "S",
    integrityLabel: "96%",
    actionLabel: "Triage",
    actionTone: "primary",
  },
  {
    id: "chicago-mechanical",
    initials: "M",
    name: "Greater Chicago Mechanical & Boiler",
    metros: "Chicago, Evanston, Naperville",
    stageLabel: "Stage 6/6 Human Review",
    stageTone: "review",
    targetsLabel: "215 targets",
    verifiedLabel: "208 verified (96.7%)",
    queuePrimary: "32 ready",
    queueSecondary: "140 sent",
    operatorName: "Marcus T.",
    operatorInitials: "M",
    integrityLabel: "100%",
    actionLabel: "Triage",
    actionTone: "primary",
  },
  {
    id: "denver-auto-detail",
    initials: "E",
    name: "Denver Metro High-End Auto Detail",
    metros: "Denver, Boulder, Aurora",
    stageLabel: "Stage 2/6 Discovery",
    stageTone: "discovery",
    targetsLabel: "184 targets",
    verifiedLabel: "172 live sites",
    queuePrimary: "Indexing maps...",
    operatorName: "Elena R.",
    operatorInitials: "E",
    integrityLabel: "94%",
    actionLabel: "Triage",
    actionTone: "primary",
  },
  {
    id: "phoenix-plumbing",
    initials: "P",
    name: "Phoenix Valley Emergency Plumbing",
    metros: "Phoenix, Scottsdale, Mesa",
    stageLabel: "Paused: Capacity Guard",
    stageTone: "paused",
    targetsLabel: "290 targets",
    verifiedLabel: "275 verified",
    queuePrimary: "45 held",
    operatorName: "Unassigned",
    integrityLabel: "Check",
    actionLabel: "Resume",
    actionTone: "secondary",
  },
  {
    id: "atlanta-ortho",
    initials: "S",
    name: "Atlanta Metro Orthodontic & Pediatric Clinics",
    metros: "Buckhead, Alpharetta, Midtown",
    stageLabel: "Follow-up Cycle",
    stageTone: "follow-up",
    targetsLabel: "271 targets",
    verifiedLabel: "261 verified",
    queuePrimary: "58 (27.6%) Replies",
    operatorName: "Sarah K.",
    operatorInitials: "S",
    integrityLabel: "100%",
    actionLabel: "Audit",
    actionTone: "secondary",
  },
];

function stageBadgeClass(tone: CampaignPortfolioStageTone) {
  if (tone === "active" || tone === "review") {
    return "border-[#99F6E4] bg-[#F0FDFA] text-[#0F766E]";
  }
  if (tone === "discovery" || tone === "scrape") {
    return "border-[#BAE6FD] bg-[#F0F9FF] text-[#0284C7]";
  }
  if (tone === "paused") {
    return "border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]";
  }
  return "border-[#A7F3D0] bg-[#ECFDF5] text-[#047857]";
}

function integrityClass(label: string) {
  if (label === "100%") {
    return "text-[#047857]";
  }
  if (label === "Check") {
    return "text-[#D97706]";
  }
  return "text-[#0F172A]";
}

export function CampaignPortfolioTable({
  title = CAMPAIGN_PORTFOLIO_TITLE,
  monitoredCount,
  rows,
  onAction,
  onMore,
  className,
}: CampaignPortfolioTableProps) {
  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-[18px] leading-6 font-semibold tracking-[-0.01em] text-[#0F172A]">
          {title}
        </h2>
        <Badge className="h-5 rounded-[4px] border-transparent bg-[#F0FDFA] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#0F766E]">
          {monitoredCount} Monitored
        </Badge>
      </div>

      <div className="overflow-hidden rounded-[8px] border border-[#E2E8F0] bg-white">
        <Table className="text-[13px] leading-[18px]">
          <TableHeader>
            <TableRow className="border-[#E2E8F0] hover:bg-[#F8FAFC]">
              {COLUMN_HEADERS.map((header) => (
                <TableHead
                  key={header}
                  className={cn(
                    "h-10 bg-[#F8FAFC] px-3 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B] uppercase",
                    header === "Actions" && "text-right",
                  )}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                data-stage-tone={row.stageTone}
                className={cn(
                  "border-[#F1F5F9] hover:bg-[#F8FAFC]",
                  row.stageTone === "paused" && "bg-[#FFFBEB]/60 hover:bg-[#FFFBEB]",
                )}
              >
                <TableCell className="min-w-[16rem] whitespace-normal px-3 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="size-8 rounded-[6px]">
                      <AvatarFallback className="rounded-[6px] bg-[#F0FDFA] text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#0F766E]">
                        {row.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-[13px] leading-[18px] font-semibold text-[#0F172A]">
                        {row.name}
                      </p>
                      <p className="text-[12px] leading-4 text-[#64748B]">
                        {row.metros}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-2.5">
                  <Badge
                    variant="outline"
                    className={cn(
                      "h-5 gap-1 rounded-[4px] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em]",
                      stageBadgeClass(row.stageTone),
                    )}
                  >
                    {row.stageTone === "paused" ? (
                      <PauseCircle aria-hidden="true" className="size-3" />
                    ) : null}
                    {row.stageTone === "follow-up" ? (
                      <CheckCircle2 aria-hidden="true" className="size-3" />
                    ) : null}
                    {row.stageLabel}
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-normal px-3 py-2.5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] leading-[18px] text-[#0F172A]">
                      {row.targetsLabel}
                    </span>
                    <span className="text-[12px] leading-4 text-[#64748B]">
                      {row.verifiedLabel}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="whitespace-normal px-3 py-2.5">
                  <div className="flex flex-col gap-0.5">
                    <span className="inline-flex items-center gap-1 text-[13px] leading-[18px] text-[#0F172A]">
                      {row.stageTone === "follow-up" ? (
                        <Reply aria-hidden="true" className="size-3 text-[#047857]" />
                      ) : null}
                      {row.queuePrimary}
                    </span>
                    {row.queueSecondary ? (
                      <span className="text-[12px] leading-4 text-[#64748B]">
                        {row.queueSecondary}
                      </span>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-2.5">
                  {row.operatorName === "Unassigned" ? (
                    <span className="text-[13px] leading-[18px] text-[#64748B]">
                      {row.operatorName}
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback className="bg-[#F0FDFA] text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#0F766E]">
                          {row.operatorInitials ?? row.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-[13px] leading-[18px] text-[#0F172A]">
                        {row.operatorName}
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-2.5">
                  <span
                    className={cn(
                      "text-[13px] leading-[18px] font-semibold",
                      integrityClass(row.integrityLabel),
                    )}
                  >
                    {row.integrityLabel}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-2.5">
                  <div className="flex items-center justify-end gap-1">
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
                      {row.actionLabel}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onMore?.(row.id)}
                      aria-label={`More actions for ${row.name}`}
                      className="size-7 rounded-[6px] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                    >
                      <EllipsisVertical aria-hidden="true" className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
