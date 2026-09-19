"use client";

import { useState } from "react";

import {
  CAMPAIGN_PORTFOLIO_ROWS,
  CampaignPortfolioTable,
} from "@/components/campaigns/campaign-portfolio-table";
import {
  CAMPAIGNS_DASHBOARD_DESCRIPTION,
  CAMPAIGNS_DASHBOARD_EYEBROW,
  CAMPAIGNS_DASHBOARD_GUARD_LABEL,
  CAMPAIGNS_DASHBOARD_METROS,
  CAMPAIGNS_DASHBOARD_TITLE,
  CampaignsDashboardHeader,
} from "@/components/campaigns/campaigns-dashboard-header";
import {
  DASHBOARD_AUDIT_ALERTS_MOCK,
  DashboardAuditAlerts,
} from "@/components/campaigns/dashboard-audit-alerts";
import {
  DASHBOARD_FUNNEL_STAGES,
  DashboardPipelineFunnel,
} from "@/components/campaigns/dashboard-pipeline-funnel";
import {
  DASHBOARD_TELEMETRY_MOCK,
  DashboardTelemetryMetrics,
} from "@/components/campaigns/dashboard-telemetry-metrics";
import {
  OPERATOR_VELOCITY_MOCK,
  OperatorVelocityCards,
} from "@/components/campaigns/operator-velocity-cards";
import {
  PLATFORM_GUARDRAILS_MOCK,
  PlatformGuardrailsStrip,
} from "@/components/campaigns/platform-guardrails-strip";

const MOCK = {
  title: CAMPAIGNS_DASHBOARD_TITLE,
  eyebrow: CAMPAIGNS_DASHBOARD_EYEBROW,
  description: CAMPAIGNS_DASHBOARD_DESCRIPTION,
  guardLabel: CAMPAIGNS_DASHBOARD_GUARD_LABEL,
  metros: CAMPAIGNS_DASHBOARD_METROS,
  telemetry: DASHBOARD_TELEMETRY_MOCK,
  rows: CAMPAIGN_PORTFOLIO_ROWS,
  operators: OPERATOR_VELOCITY_MOCK,
  stages: DASHBOARD_FUNNEL_STAGES,
  alerts: DASHBOARD_AUDIT_ALERTS_MOCK,
  guardrails: PLATFORM_GUARDRAILS_MOCK,
};

export default function CampaignsDashboardPage() {
  const [selectedMetroId, setSelectedMetroId] = useState("all");

  return (
    <div className="flex w-full flex-col gap-6 pt-4">
      <CampaignsDashboardHeader
        title={MOCK.title}
        eyebrow={MOCK.eyebrow}
        description={MOCK.description}
        guardLabel={MOCK.guardLabel}
        metros={MOCK.metros}
        selectedMetroId={selectedMetroId}
        onMetroChange={setSelectedMetroId}
      />

      <DashboardTelemetryMetrics {...MOCK.telemetry} />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <CampaignPortfolioTable
            monitoredCount={MOCK.rows.length}
            rows={MOCK.rows}
            onAction={() => undefined}
          />
          <OperatorVelocityCards operators={MOCK.operators} />
        </div>

        <aside className="flex flex-col gap-4 lg:col-span-4">
          <DashboardPipelineFunnel stages={MOCK.stages} />
          <DashboardAuditAlerts alerts={MOCK.alerts} />
          <PlatformGuardrailsStrip {...MOCK.guardrails} />
        </aside>
      </div>
    </div>
  );
}
