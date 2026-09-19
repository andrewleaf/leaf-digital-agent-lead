import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  DASHBOARD_FUNNEL_DESCRIPTION,
  DASHBOARD_FUNNEL_STAGES,
  DASHBOARD_FUNNEL_TITLE,
  DashboardPipelineFunnel,
} from "./dashboard-pipeline-funnel";

const SOURCE = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "dashboard-pipeline-funnel.tsx"),
  "utf8",
);

describe("DashboardPipelineFunnel", () => {
  it("renders the Stitch title, helper, and six stages", () => {
    render(<DashboardPipelineFunnel stages={DASHBOARD_FUNNEL_STAGES} />);

    expect(screen.getByText(DASHBOARD_FUNNEL_TITLE)).toBeInTheDocument();
    expect(screen.getByText(DASHBOARD_FUNNEL_DESCRIPTION)).toBeInTheDocument();
    expect(screen.getByText("Setup & Perimeter Spec")).toBeInTheDocument();
    expect(screen.getByText("Geographic radius & criteria")).toBeInTheDocument();
    expect(screen.getByText("6 Specs")).toBeInTheDocument();
    expect(screen.getByText("Maps & Registry Discovery")).toBeInTheDocument();
    expect(screen.getByText("1,428 Targets")).toBeInTheDocument();
    expect(screen.getByText("Domain & SSL Matching")).toBeInTheDocument();
    expect(screen.getByText("1,345 (94.2%)")).toBeInTheDocument();
    expect(screen.getByText("Public Fact Extraction")).toBeInTheDocument();
    expect(screen.getByText("3,120 Facts")).toBeInTheDocument();
    expect(screen.getByText("Grounded Draft Assembly")).toBeInTheDocument();
    expect(screen.getByText("118 in Draft")).toBeInTheDocument();
    expect(screen.getByText("Human Review & Native Send")).toBeInTheDocument();
    expect(screen.getByText("91 Queue")).toBeInTheDocument();
  });

  it("does not invent stages when empty and does not import pipeline steppers", () => {
    render(<DashboardPipelineFunnel stages={[]} />);

    expect(screen.getByText(DASHBOARD_FUNNEL_TITLE)).toBeInTheDocument();
    expect(screen.getByText(DASHBOARD_FUNNEL_DESCRIPTION)).toBeInTheDocument();
    expect(screen.queryByText("Setup & Perimeter Spec")).not.toBeInTheDocument();
    expect(screen.queryByText("Directory & Maps Discovery")).not.toBeInTheDocument();
    expect(SOURCE).not.toMatch("PipelineSequenceRail");
    expect(SOURCE).not.toMatch("PipelineStageStepper");
  });
});
