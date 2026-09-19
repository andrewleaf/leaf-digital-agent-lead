import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CampaignPipelineHeader } from "./campaign-pipeline-header";

const filled = {
  campaignId: "CAM-TX-0491",
  statusLabel: "Active • Stage 5 of 6 Processing",
  guardLabel: "Manual Dispatch Guard Active",
  title: "Central Texas HVAC Outbound (Austin, Round Rock, Cedar Park)",
  createdLabel: "Created Today at 09:15 AM by Alex M.",
  targetLabel: "Target: Licensed HVAC Contractors",
  ruleLabel: "Rule: Single Domain Enriched per Business",
} as const;

describe("CampaignPipelineHeader", () => {
  it("renders the filled Stitch mock in identity, title, then meta order", () => {
    render(<CampaignPipelineHeader {...filled} processing />);

    expect(screen.getByText("CAM-TX-0491")).toBeInTheDocument();
    expect(
      screen.getByText("Active • Stage 5 of 6 Processing"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Manual Dispatch Guard Active"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Central Texas HVAC Outbound (Austin, Round Rock, Cedar Park)",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Created Today at 09:15 AM by Alex M."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Target: Licensed HVAC Contractors"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Rule: Single Domain Enriched per Business"),
    ).toBeInTheDocument();

    const created = screen.getByText("Created Today at 09:15 AM by Alex M.");
    const target = screen.getByText("Target: Licensed HVAC Contractors");
    const rule = screen.getByText("Rule: Single Domain Enriched per Business");
    expect(
      created.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      target.compareDocumentPosition(rule) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders all visible strings from props, not hard-coded campaign facts", () => {
    render(
      <CampaignPipelineHeader
        campaignId="CAM-OK-0001"
        statusLabel="Paused • Stage 2 of 6 Idle"
        guardLabel="Dispatch Guard Off"
        title="Tulsa Roofing Outbound"
        createdLabel="Created Yesterday at 04:00 PM by Jordan K."
        targetLabel="Target: Licensed Roofers"
        ruleLabel="Rule: Dual Domain Review"
      />,
    );

    expect(screen.getByText("CAM-OK-0001")).toBeInTheDocument();
    expect(screen.getByText("Paused • Stage 2 of 6 Idle")).toBeInTheDocument();
    expect(screen.getByText("Dispatch Guard Off")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Tulsa Roofing Outbound" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("CAM-TX-0491")).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Central Texas HVAC Outbound (Austin, Round Rock, Cedar Park)",
      ),
    ).not.toBeInTheDocument();
  });

  it("uses a teal processing badge and pinging id-chip dot when processing is true", () => {
    const { container } = render(
      <CampaignPipelineHeader {...filled} processing />,
    );

    expect(container.querySelector(".animate-ping")).toBeInTheDocument();
    expect(
      screen.getByText("Active • Stage 5 of 6 Processing"),
    ).toHaveClass("bg-[#0F766E]", "text-white");
  });

  it("uses a muted status badge and a static id-chip dot when processing is false", () => {
    const { container } = render(
      <CampaignPipelineHeader
        {...filled}
        statusLabel="Idle • Stage 1 of 6 Queued"
        processing={false}
      />,
    );

    expect(container.querySelector(".animate-ping")).not.toBeInTheDocument();
    expect(screen.getByText("Idle • Stage 1 of 6 Queued")).toHaveClass(
      "text-[#94A3B8]",
    );
  });

  it("renders the actions slot on the header row when provided and omits it otherwise", () => {
    const { rerender } = render(<CampaignPipelineHeader {...filled} />);

    expect(screen.queryByText("Pause Research")).not.toBeInTheDocument();

    rerender(
      <CampaignPipelineHeader
        {...filled}
        actions={<button type="button">Pause Research</button>}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Pause Research" }),
    ).toBeInTheDocument();
  });

  it("uses Operator Core card surface tokens", () => {
    const { container } = render(<CampaignPipelineHeader {...filled} />);
    const card = container.querySelector('[data-slot="card"]');

    expect(card).toHaveClass(
      "rounded-[8px]",
      "border-[#E2E8F0]",
      "bg-white",
    );
  });
});
