import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type DashboardFunnelStage = {
  index: number;
  title: string;
  detail: string;
  metric: string;
};

export type DashboardPipelineFunnelProps = {
  title?: string;
  description?: string;
  stages: DashboardFunnelStage[];
  className?: string;
};

export const DASHBOARD_FUNNEL_TITLE = "6-Stage Pipeline Funnel";
export const DASHBOARD_FUNNEL_DESCRIPTION =
  "Live business count across the strict 6-stage ingestion and ground truth enrichment funnel.";

export const DASHBOARD_FUNNEL_STAGES: DashboardFunnelStage[] = [
  {
    index: 1,
    title: "Setup & Perimeter Spec",
    detail: "Geographic radius & criteria",
    metric: "6 Specs",
  },
  {
    index: 2,
    title: "Maps & Registry Discovery",
    detail: "Secretary of State & Place APIs",
    metric: "1,428 Targets",
  },
  {
    index: 3,
    title: "Domain & SSL Matching",
    detail: "Live web validation & MX",
    metric: "1,345 (94.2%)",
  },
  {
    index: 4,
    title: "Public Fact Extraction",
    detail: "Owner names, years in biz, reviews",
    metric: "3,120 Facts",
  },
  {
    index: 5,
    title: "Grounded Draft Assembly",
    detail: "Variable citation synthesis",
    metric: "118 in Draft",
  },
  {
    index: 6,
    title: "Human Review & Native Send",
    detail: "Desk operator manual gate",
    metric: "91 Queue",
  },
];

export function DashboardPipelineFunnel({
  title = DASHBOARD_FUNNEL_TITLE,
  description = DASHBOARD_FUNNEL_DESCRIPTION,
  stages,
  className,
}: DashboardPipelineFunnelProps) {
  return (
    <Card
      className={cn(
        "gap-4 rounded-[8px] border border-[#E2E8F0] bg-white py-0 shadow-none",
        className,
      )}
    >
      <CardHeader className="gap-1 px-4 pt-4 pb-0">
        <CardTitle className="text-[15px] leading-5 font-semibold text-[#0F172A]">
          {title}
        </CardTitle>
        <CardDescription className="text-[12px] leading-4 text-[#64748B]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {stages.length > 0 ? (
          <ol className="flex flex-col">
            {stages.map((stage) => (
              <li
                key={stage.index}
                className="flex items-center gap-3 border-b border-[#F1F5F9] py-2.5 last:border-b-0 hover:bg-[#F8FAFC]"
              >
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-[6px] bg-[#F0FDFA] text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#0F766E]">
                  {stage.index}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] leading-[18px] font-semibold text-[#0F172A]">
                    {stage.title}
                  </p>
                  <p className="text-[12px] leading-4 text-[#64748B]">
                    {stage.detail}
                  </p>
                </div>
                <span className="shrink-0 text-[15px] leading-5 font-semibold text-[#0F766E]">
                  {stage.metric}
                </span>
              </li>
            ))}
          </ol>
        ) : null}
      </CardContent>
    </Card>
  );
}
