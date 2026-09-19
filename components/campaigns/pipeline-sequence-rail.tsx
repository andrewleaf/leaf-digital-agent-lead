import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const PIPELINE_SEQUENCE_TITLE = "Pipeline Sequence";
export const PIPELINE_SEQUENCE_META = "6 STAGES";
export const DEFAULT_DISCOVERY_DETAIL = "Austin, Round Rock, Cedar Park";

export const PIPELINE_STAGES = [
  {
    id: 1,
    title: "Directory & Maps Discovery",
    detail: DEFAULT_DISCOVERY_DETAIL,
  },
  {
    id: 2,
    title: "Public Website Verification",
    detail: "Filter domain health & active status",
  },
  {
    id: 3,
    title: "Fact Extraction Engine",
    detail: "Mobile booking flow & service hours",
  },
  {
    id: 4,
    title: "Safety Guardrail Intercept",
    detail: "Strip forbidden claims and promises",
  },
  {
    id: 5,
    title: "Operator Review Queue",
    detail: "Physical human approval required",
  },
  {
    id: 6,
    title: "Manual Dispatch Desk",
    detail: "One-by-one verification and send",
  },
] as const;

export type PipelineSequenceRailProps = {
  discoveryDetail?: string;
  currentStage?: number | null;
  className?: string;
};

export function PipelineSequenceRail({
  discoveryDetail = DEFAULT_DISCOVERY_DETAIL,
  currentStage = null,
  className,
}: PipelineSequenceRailProps) {
  return (
    <Card
      className={cn(
        "gap-0 rounded-lg border border-[#E2E8F0] bg-white py-0 shadow-none",
        className,
      )}
    >
      <CardHeader className="px-3 pt-3 pb-2">
        <CardTitle className="text-[15px] leading-5 font-semibold tracking-normal text-[#0F172A]">
          {PIPELINE_SEQUENCE_TITLE}
        </CardTitle>
        <CardAction>
          <span className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B]">
            {PIPELINE_SEQUENCE_META}
          </span>
        </CardAction>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <ol className="flex flex-col">
          {PIPELINE_STAGES.map((stage) => {
            const isCurrent = currentStage === stage.id;
            const detail = stage.id === 1 ? discoveryDetail : stage.detail;

            return (
              <li
                key={stage.id}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "flex min-h-11 items-start gap-2 rounded-[6px] px-1 py-2",
                  isCurrent && "bg-[#F0FDFA] shadow-[inset_2px_0_0_0_#0F766E]",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[12px] leading-4 font-semibold",
                    isCurrent
                      ? "bg-[#0F766E] text-white"
                      : "bg-[#F1F5F9] text-[#0F766E]",
                  )}
                >
                  {stage.id}
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-[12px] leading-4 font-medium tracking-[0.01em] text-[#0F172A]">
                    {stage.title}
                  </span>
                  <span className="text-[12px] leading-4 font-normal text-[#64748B]">
                    {detail}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
