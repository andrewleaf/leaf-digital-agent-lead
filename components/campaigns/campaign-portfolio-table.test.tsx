import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  CAMPAIGN_PORTFOLIO_ROWS,
  CAMPAIGN_PORTFOLIO_TITLE,
  CampaignPortfolioTable,
} from "./campaign-portfolio-table";

const HEADERS = [
  "Campaign & Metro",
  "Pipeline Stage",
  "Targets",
  "Desk Queue",
  "Operator",
  "Integrity",
  "Actions",
];

describe("CampaignPortfolioTable", () => {
  it("renders Stitch column headers as table header cells", () => {
    render(
      <CampaignPortfolioTable
        monitoredCount={6}
        rows={CAMPAIGN_PORTFOLIO_ROWS}
        onAction={vi.fn()}
      />,
    );

    expect(screen.getByText(CAMPAIGN_PORTFOLIO_TITLE)).toBeInTheDocument();
    expect(screen.getByText("6 Monitored")).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader").map((header) => header.textContent)).toEqual(
      HEADERS,
    );
  });

  it("renders the six Stitch campaigns with verbatim copy", () => {
    render(
      <CampaignPortfolioTable
        monitoredCount={6}
        rows={CAMPAIGN_PORTFOLIO_ROWS}
        onAction={vi.fn()}
      />,
    );

    expect(screen.getByText("Central Texas HVAC Outbound")).toBeInTheDocument();
    expect(screen.getByText("Austin, Round Rock, Cedar Park")).toBeInTheDocument();
    expect(screen.getByText("Stage 5/6 Draft Assembly")).toBeInTheDocument();
    expect(screen.getByText("128 targets")).toBeInTheDocument();
    expect(screen.getByText("121 verified (94.5%)")).toBeInTheDocument();
    expect(screen.getByText("14 ready")).toBeInTheDocument();
    expect(screen.getByText("84 sent")).toBeInTheDocument();
    expect(screen.getByText("Alex M.")).toBeInTheDocument();
    expect(screen.getByText("98%")).toBeInTheDocument();

    expect(
      screen.getByText("DFW Commercial Roofing & Restoration"),
    ).toBeInTheDocument();
    expect(screen.getByText("Dallas, Fort Worth, Plano")).toBeInTheDocument();
    expect(screen.getByText("Stage 4/6 Public Scrapes")).toBeInTheDocument();
    expect(screen.getByText("42 in scrape")).toBeInTheDocument();

    expect(
      screen.getByText("Greater Chicago Mechanical & Boiler"),
    ).toBeInTheDocument();
    expect(screen.getByText("Stage 6/6 Human Review")).toBeInTheDocument();
    expect(screen.getByText("208 verified (96.7%)")).toBeInTheDocument();

    expect(
      screen.getByText("Denver Metro High-End Auto Detail"),
    ).toBeInTheDocument();
    expect(screen.getByText("Indexing maps...")).toBeInTheDocument();

    expect(
      screen.getByText("Phoenix Valley Emergency Plumbing"),
    ).toBeInTheDocument();
    expect(screen.getByText("Paused: Capacity Guard")).toBeInTheDocument();
    expect(screen.getByText("Unassigned")).toBeInTheDocument();
    expect(screen.getByText("Check")).toBeInTheDocument();

    expect(
      screen.getByText("Atlanta Metro Orthodontic & Pediatric Clinics"),
    ).toBeInTheDocument();
    expect(screen.getByText("Follow-up Cycle")).toBeInTheDocument();
    expect(screen.getByText("58 (27.6%) Replies")).toBeInTheDocument();
  });

  it("uses primary Triage and secondary Resume/Audit, calling onAction only", () => {
    const onAction = vi.fn();

    render(
      <CampaignPortfolioTable
        monitoredCount={6}
        rows={CAMPAIGN_PORTFOLIO_ROWS}
        onAction={onAction}
      />,
    );

    const triage = screen.getAllByRole("button", { name: "Triage" });
    expect(triage).toHaveLength(4);
    expect(triage[0]).toHaveClass("bg-[#0F766E]");

    const resume = screen.getByRole("button", { name: "Resume" });
    const audit = screen.getByRole("button", { name: "Audit" });
    expect(resume).toHaveClass("bg-white");
    expect(audit).toHaveClass("text-[#0F172A]");

    fireEvent.click(triage[0]);
    fireEvent.click(resume);
    expect(onAction).toHaveBeenNthCalledWith(1, "central-texas-hvac");
    expect(onAction).toHaveBeenNthCalledWith(2, "phoenix-plumbing");
  });

  it("renders headers with an empty body when rows is empty", () => {
    render(
      <CampaignPortfolioTable monitoredCount={0} rows={[]} onAction={vi.fn()} />,
    );

    expect(screen.getByText("0 Monitored")).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")).toHaveLength(7);
    expect(
      screen.queryByText("Central Texas HVAC Outbound"),
    ).not.toBeInTheDocument();
    expect(
      within(screen.getByRole("table")).queryAllByRole("row"),
    ).toHaveLength(1);
  });
});
