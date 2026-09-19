import { CircleCheck, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const PIPELINE_STEPPER_EYEBROW = "Deterministic Workflow";
export const PIPELINE_STEPPER_TITLE = "Six-Stage Pipeline Progress";

export type PipelineRunStageStatus = "done" | "in-progress" | "pending";

export type PipelineRunStage = {
  index: string;
  title: string;
  status: PipelineRunStageStatus;
  statusLabel: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  progress: number;
};

export type PipelineStageStepperProps = {
  stages: PipelineRunStage[];
  completedCount: number;
  activeCount: number;
  pendingCount: number;
  className?: string;
};

export const PIPELINE_RUN_STAGES: PipelineRunStage[] = [
  {
    index: "01",
    title: "Campaign Setup",
    status: "done",
    statusLabel: "Done",
    description: "Austin, Round Rock, Cedar Park HVAC taxonomy",
    metricLabel: "Geo Parameters",
    metricValue: "100%",
    progress: 100,
  },
  {
    index: "02",
    title: "Discovery",
    status: "done",
    statusLabel: "Done",
    description: "128 businesses indexed via Google Maps & Secretary of State",
    metricLabel: "Discovered",
    metricValue: "128 / 128",
    progress: 100,
  },
  {
    index: "03",
    title: "Website Matching",
    status: "done",
    statusLabel: "Done",
    description:
      "121 verified domains resolved (7 flagged for operator review)",
    metricLabel: "Domain Match",
    metricValue: "94.5%",
    progress: 94.5,
  },
  {
    index: "04",
    title: "Public Scrapes",
    status: "done",
    statusLabel: "Done",
    description:
      "114 sites parsed for team size, awards, license #s (7 incomplete)",
    metricLabel: "Crawl Yield",
    metricValue: "114 / 121",
    progress: 94.2,
  },
  {
    index: "05",
    title: "Draft Generation",
    status: "in-progress",
    statusLabel: "In Progress",
    description: "98 personalized drafts generated; 16 remaining in pipeline",
    metricLabel: "Synthesis Progress",
    metricValue: "88%",
    progress: 88,
  },
  {
    index: "06",
    title: "Human Review",
    status: "pending",
    statusLabel: "Manual Only",
    description:
      "Strict manual operator gate. 0 blast risk. 14 ready right now.",
    metricLabel: "Ready in Queue",
    metricValue: "14 Leads",
    progress: 14,
  },
];

export const EMPTY_PIPELINE_RUN_STAGES: PipelineRunStage[] =
  PIPELINE_RUN_STAGES.map((stage) => ({
    ...stage,
    status: "pending",
    statusLabel: "Pending",
    description: "",
    metricValue: "",
    progress: 0,
  }));

function statusChipClassName(status: PipelineRunStageStatus) {
  if (status === "done") {
    return "border-[#A7F3D0] bg-[#ECFDF5] text-[#047857]";
  }
  if (status === "in-progress") {
    return "border-transparent bg-[#0F766E] text-white";
  }
  return "border-[#BAE6FD] bg-[#F0F9FF] text-[#0284C7]";
}

function meterClassName(status: PipelineRunStageStatus) {
  if (status === "done") {
    return "[&_[data-slot=progress-indicator]]:bg-[#059669]";
  }
  if (status === "in-progress") {
    return "[&_[data-slot=progress-indicator]]:bg-[#0F766E]";
  }
  return "[&_[data-slot=progress-indicator]]:bg-[#0284C7]";
}

function StageStatusIcon({
  status,
  statusLabel,
}: {
  status: PipelineRunStageStatus;
  statusLabel: string;
}) {
  if (status === "done") {
    return (
      <CircleCheck aria-hidden="true" className="size-3.5 text-[#059669]" />
    );
  }
  if (status === "in-progress") {
    return (
      <span
        aria-hidden="true"
        className="size-1.5 animate-pulse rounded-full bg-[#0F766E]"
      />
    );
  }
  if (statusLabel === "Manual Only") {
    return <Lock aria-hidden="true" className="size-3.5 text-[#0284C7]" />;
  }
  return null;
}

export function PipelineStageStepper({
  stages,
  completedCount,
  activeCount,
  pendingCount,
  className,
}: PipelineStageStepperProps) {
  return (
    <Card
      className={cn(
        "gap-3 rounded-lg border border-[#E2E8F0] bg-white py-0 shadow-none",
        className,
      )}
    >
      <CardHeader className="flex flex-col gap-2 px-4 pt-4 pb-0 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B] uppercase">
            {PIPELINE_STEPPER_EYEBROW}
          </p>
          <CardTitle className="text-[15px] leading-5 font-semibold tracking-normal text-[#0F172A]">
            {PIPELINE_STEPPER_TITLE}
          </CardTitle>
        </div>
        <ul className="flex flex-wrap items-center gap-3 font-mono text-[12px] leading-4 font-normal text-[#475569]">
          <li className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-[#059669]"
            />
            Completed ({completedCount})
          </li>
          <li className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-[#0284C7]"
            />
            Active ({activeCount})
          </li>
          <li className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-[#94A3B8]"
            />
            Pending ({pendingCount})
          </li>
        </ul>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <ol className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-6">
          {stages.map((stage) => {
            const isActive = stage.status === "in-progress";
            const meterName = stage.metricValue
              ? `${stage.metricLabel} ${stage.metricValue}`
              : stage.metricLabel;

            return (
              <li
                key={stage.index}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex flex-col gap-2 rounded-lg p-3",
                  isActive
                    ? "bg-white ring-2 ring-[#0F766E]/40"
                    : "bg-[#F8FAFC]",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "font-mono text-[12px] leading-4",
                      isActive
                        ? "font-semibold text-[#0F766E]"
                        : "font-normal text-[#64748B]",
                    )}
                  >
                    {stage.index}
                  </span>
                  <Badge
                    className={cn(
                      "h-5 rounded-[4px] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em]",
                      statusChipClassName(stage.status),
                    )}
                  >
                    <StageStatusIcon
                      status={stage.status}
                      statusLabel={stage.statusLabel}
                    />
                    {stage.statusLabel}
                  </Badge>
                </div>
                <h3 className="text-[13px] leading-[18px] font-semibold text-[#0F172A]">
                  {stage.title}
                </h3>
                {stage.description ? (
                  <p className="text-[12px] leading-4 font-normal text-[#475569]">
                    {stage.description}
                  </p>
                ) : null}
                <div className="mt-auto flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B]">
                      {stage.metricLabel}
                    </span>
                    {stage.metricValue ? (
                      <span className="font-mono text-[12px] leading-4 font-normal text-[#0F172A]">
                        {stage.metricValue}
                      </span>
                    ) : null}
                  </div>
                  <Progress
                    value={stage.progress}
                    aria-label={meterName}
                    className={cn(
                      "h-1.5 rounded-full bg-[#E2E8F0]",
                      meterClassName(stage.status),
                    )}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
