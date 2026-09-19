import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  DASHBOARD_TELEMETRY_EMPTY,
  DASHBOARD_TELEMETRY_MOCK,
  DashboardTelemetryMetrics,
} from "./dashboard-telemetry-metrics";

const LABELS = [
  "Active Pipelines",
  "Live Domain Valid",
  "Avg Triage Time",
  "Citation Integrity",
  "Owner Reply Rate",
];

describe("DashboardTelemetryMetrics", () => {
  it("renders five KPI cards with Stitch labels", () => {
    render(<DashboardTelemetryMetrics {...DASHBOARD_TELEMETRY_MOCK} />);

    for (const label of LABELS) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    expect(screen.queryByText("1,428")).not.toBeInTheDocument();
  });

  it("renders the filled Stitch mock from props", () => {
    render(<DashboardTelemetryMetrics {...DASHBOARD_TELEMETRY_MOCK} />);

    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("2 Paused")).toBeInTheDocument();
    expect(screen.getByText("1 Archived")).toBeInTheDocument();
    expect(screen.getByText("94.2%")).toBeInTheDocument();
    expect(screen.getByText("1,345 live")).toBeInTheDocument();
    expect(screen.getByText("42s")).toBeInTheDocument();
    expect(screen.getByText("-6s goal")).toBeInTheDocument();
    expect(screen.getByText("312 approved this wk")).toBeInTheDocument();
    expect(screen.getByText("99.4%")).toBeInTheDocument();
    expect(screen.getByText("0 halluc.")).toBeInTheDocument();
    expect(screen.getByText("8 flagged for review")).toBeInTheDocument();
    expect(screen.getByText("26.8%")).toBeInTheDocument();
    expect(screen.getByText("+4.2%")).toBeInTheDocument();
    expect(screen.getByText("High intent conversations")).toBeInTheDocument();
  });

  it("keeps the five labels on the empty mock and does not invent 1,428", () => {
    render(<DashboardTelemetryMetrics {...DASHBOARD_TELEMETRY_EMPTY} />);

    for (const label of LABELS) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    expect(screen.getAllByText("0%").length).toBeGreaterThan(0);
    expect(screen.getByText("0s")).toBeInTheDocument();
    expect(screen.getByText("0 Paused")).toBeInTheDocument();
    expect(screen.getByText("0 Archived")).toBeInTheDocument();
    expect(screen.getByText("0 live")).toBeInTheDocument();
    expect(screen.queryByText("1,428")).not.toBeInTheDocument();
    expect(screen.queryByText("94.2%")).not.toBeInTheDocument();
  });
});
