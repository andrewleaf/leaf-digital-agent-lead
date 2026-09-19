import { Check, ListChecks } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type OperatorRankTone = "velocity" | "volume" | "conversion";

export type OperatorVelocity = {
  id: string;
  initials: string;
  name: string;
  coverage: string;
  rankLabel: string;
  rankTone: OperatorRankTone;
  reviewed: number;
  avgSpeed: string;
  replyRate: string;
  flagLabel: string;
  nativeSentLabel: string;
};

export type OperatorVelocityCardsProps = {
  title?: string;
  caption?: string;
  operators: OperatorVelocity[];
  className?: string;
};

export const OPERATOR_VELOCITY_TITLE = "Lead Operator Velocity & Precision";
export const OPERATOR_VELOCITY_CAPTION =
  "Realtime dispatch audit (Past 7 days)";

export const OPERATOR_VELOCITY_MOCK: OperatorVelocity[] = [
  {
    id: "alex-m",
    initials: "A",
    name: "Alex M.",
    coverage: "Austin HVAC, Chicago Mech",
    rankLabel: "#1 Velocity",
    rankTone: "velocity",
    reviewed: 142,
    avgSpeed: "38s",
    replyRate: "28.4%",
    flagLabel: "0 Citation Flags",
    nativeSentLabel: "100% Native Sent",
  },
  {
    id: "sarah-k",
    initials: "S",
    name: "Sarah K.",
    coverage: "DFW Roofing, Atlanta Ortho",
    rankLabel: "High Volume",
    rankTone: "volume",
    reviewed: 118,
    avgSpeed: "46s",
    replyRate: "24.1%",
    flagLabel: "1 Flag Resolved",
    nativeSentLabel: "100% Native Sent",
  },
  {
    id: "marcus-t",
    initials: "M",
    name: "Marcus T.",
    coverage: "Chicago Mechanical Lead",
    rankLabel: "Top Conv.",
    rankTone: "conversion",
    reviewed: 94,
    avgSpeed: "41s",
    replyRate: "29.0%",
    flagLabel: "0 Citation Flags",
    nativeSentLabel: "100% Native Sent",
  },
];

function rankChipClass(tone: OperatorRankTone) {
  if (tone === "velocity") {
    return "border-transparent bg-[#0F766E] text-white";
  }
  if (tone === "conversion") {
    return "border-transparent bg-[#F0F9FF] text-[#0284C7]";
  }
  return "border-transparent bg-[#F1F5F9] text-[#475569]";
}

function flagClass(label: string) {
  if (label.startsWith("0 ")) {
    return "text-[#047857]";
  }
  return "text-[#D97706]";
}

export function OperatorVelocityCards({
  title = OPERATOR_VELOCITY_TITLE,
  caption = OPERATOR_VELOCITY_CAPTION,
  operators,
  className,
}: OperatorVelocityCardsProps) {
  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-col gap-0.5">
        <h2 className="text-[18px] leading-6 font-semibold tracking-[-0.01em] text-[#0F172A]">
          {title}
        </h2>
        <p className="text-[12px] leading-4 text-[#64748B]">{caption}</p>
      </div>

      {operators.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {operators.map((operator) => (
            <Card
              key={operator.id}
              className="gap-4 rounded-[8px] border border-[#E2E8F0] bg-white py-0 shadow-none"
            >
              <CardHeader className="flex flex-row items-start justify-between gap-3 px-4 pt-4 pb-0">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-[#F0FDFA] text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#0F766E]">
                      {operator.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-[15px] leading-5 font-semibold text-[#0F172A]">
                      {operator.name}
                    </p>
                    <p className="text-[12px] leading-4 text-[#64748B]">
                      {operator.coverage}
                    </p>
                  </div>
                </div>
                <Badge
                  className={cn(
                    "h-5 rounded-[4px] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em]",
                    rankChipClass(operator.rankTone),
                  )}
                >
                  {operator.rankLabel}
                </Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-4 pb-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[18px] leading-6 font-semibold tracking-[-0.01em] text-[#0F172A]">
                      {operator.reviewed}
                    </span>
                    <span className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B] uppercase">
                      Reviewed
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[18px] leading-6 font-semibold tracking-[-0.01em] text-[#0F172A]">
                      {operator.avgSpeed}
                    </span>
                    <span className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B] uppercase">
                      Avg Speed
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[18px] leading-6 font-semibold tracking-[-0.01em] text-[#0F172A]">
                      {operator.replyRate}
                    </span>
                    <span className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B] uppercase">
                      Reply Rate
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] leading-4 font-medium">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1",
                      flagClass(operator.flagLabel),
                    )}
                  >
                    {operator.flagLabel.startsWith("0 ") ? (
                      <Check aria-hidden="true" className="size-3.5" />
                    ) : (
                      <ListChecks aria-hidden="true" className="size-3.5" />
                    )}
                    {operator.flagLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#047857]">
                    <Check aria-hidden="true" className="size-3.5" />
                    {operator.nativeSentLabel}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </section>
  );
}
