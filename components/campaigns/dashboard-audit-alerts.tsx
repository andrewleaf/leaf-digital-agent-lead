import { ShieldAlert, TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export type DashboardAuditAlert = {
  id: string;
  tone: "attention" | "guardrail";
  title: string;
  body: string;
};

export type DashboardAuditAlertsProps = {
  heading?: string;
  alerts: DashboardAuditAlert[];
  className?: string;
};

export const DASHBOARD_AUDIT_ALERTS_HEADING =
  "Stage Bottlenecks & Audit Alerts";

export const DASHBOARD_AUDIT_ALERTS_MOCK: DashboardAuditAlert[] = [
  {
    id: "missing-domains",
    tone: "attention",
    title: "14 Missing Storefront Domains",
    body: "Targets in Denver & Phoenix require operator manual URL resolution before citation scrape.",
  },
  {
    id: "guardrail-intercepts",
    tone: "guardrail",
    title: "3 Guardrail Intercepts",
    body: "Unverifiable revenue claim detected in drafted snippet; held back for citation re-verification.",
  },
];

export function DashboardAuditAlerts({
  heading = DASHBOARD_AUDIT_ALERTS_HEADING,
  alerts,
  className,
}: DashboardAuditAlertsProps) {
  return (
    <section className={cn("flex flex-col gap-2", className)}>
      <h2 className="text-[15px] leading-5 font-semibold text-[#0F172A]">
        {heading}
      </h2>
      <div className="flex flex-col gap-2">
        {alerts.map((alert) => {
          const attention = alert.tone === "attention";

          return (
            <Alert
              key={alert.id}
              className={cn(
                "rounded-[8px] px-3 py-3 shadow-none",
                attention
                  ? "border border-[#FDE68A] bg-[#FFFBEB] text-[#B45309] [&>svg]:text-[#D97706]"
                  : "border border-[#FECDD3] bg-[#FFF1F2] text-[#BE123C] [&>svg]:text-[#E11D48]",
              )}
            >
              {attention ? (
                <TriangleAlert aria-hidden="true" />
              ) : (
                <ShieldAlert aria-hidden="true" />
              )}
              <AlertTitle
                className={cn(
                  "line-clamp-none text-[12px] leading-4 font-medium tracking-[0.01em]",
                  attention ? "text-[#B45309]" : "text-[#BE123C]",
                )}
              >
                {alert.title}
              </AlertTitle>
              <AlertDescription
                className={cn(
                  "text-[12px] leading-4",
                  attention ? "text-[#D97706]" : "text-[#E11D48]",
                )}
              >
                {alert.body}
              </AlertDescription>
            </Alert>
          );
        })}
      </div>
    </section>
  );
}
