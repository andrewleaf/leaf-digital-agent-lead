import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  DASHBOARD_AUDIT_ALERTS_HEADING,
  DASHBOARD_AUDIT_ALERTS_MOCK,
  DashboardAuditAlerts,
} from "./dashboard-audit-alerts";

const SOURCE = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "dashboard-audit-alerts.tsx"),
  "utf8",
);

describe("DashboardAuditAlerts", () => {
  it("renders the heading and both Stitch alerts", () => {
    render(<DashboardAuditAlerts alerts={DASHBOARD_AUDIT_ALERTS_MOCK} />);

    expect(screen.getByText(DASHBOARD_AUDIT_ALERTS_HEADING)).toBeInTheDocument();
    expect(screen.getByText("14 Missing Storefront Domains")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Targets in Denver & Phoenix require operator manual URL resolution before citation scrape.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("3 Guardrail Intercepts")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Unverifiable revenue claim detected in drafted snippet; held back for citation re-verification.",
      ),
    ).toBeInTheDocument();

    const missing = screen.getByText("14 Missing Storefront Domains").closest(
      '[data-slot="alert"]',
    );
    const intercept = screen.getByText("3 Guardrail Intercepts").closest(
      '[data-slot="alert"]',
    );
    expect(missing).toHaveClass("bg-[#FFFBEB]", "border-[#FDE68A]");
    expect(intercept).toHaveClass("bg-[#FFF1F2]", "border-[#FECDD3]");
  });

  it("renders the heading with no invented incidents when empty", () => {
    render(<DashboardAuditAlerts alerts={[]} />);

    expect(screen.getByText(DASHBOARD_AUDIT_ALERTS_HEADING)).toBeInTheDocument();
    expect(
      screen.queryByText("14 Missing Storefront Domains"),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(SOURCE).not.toMatch("GuardrailProtocolBanner");
  });
});
