import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  PipelineSummaryMetrics,
  type PipelineSummaryMetricsProps,
} from "./pipeline-summary-metrics";

const filled: PipelineSummaryMetricsProps = {
  discovered: { value: 128, atx: 78, rr: 31, cp: 19 },
  matched: {
    value: 121,
    of: 128,
    resolutionRate: "94.5%",
    offline: 7,
  },
  citations: { value: 242, avgFactsPerOrg: "2.1 facts/org" },
  attention: { value: 14, missingUrls: 7, lowConfidence: 7 },
  draftsReady: { value: 14 },
};

const empty: PipelineSummaryMetricsProps = {
  discovered: { value: 0, atx: 0, rr: 0, cp: 0 },
  matched: {
    value: 0,
    of: 0,
    resolutionRate: "0%",
    offline: 0,
  },
  citations: { value: 0, avgFactsPerOrg: "0 facts/org" },
  attention: { value: 0, missingUrls: 0, lowConfidence: 0 },
  draftsReady: { value: 0 },
};

describe("PipelineSummaryMetrics", () => {
  it("renders five KPI cards with Stitch labels", () => {
    render(<PipelineSummaryMetrics {...filled} />);

    expect(screen.getByText("Businesses Discovered")).toBeInTheDocument();
    expect(screen.getByText("Websites Matched")).toBeInTheDocument();
    expect(screen.getByText("Fact Citations")).toBeInTheDocument();
    expect(screen.getByText("Attention Required")).toBeInTheDocument();
    expect(screen.getByText("Drafts Ready")).toBeInTheDocument();
  });

  it("renders the filled Stitch mock from props", () => {
    render(<PipelineSummaryMetrics {...filled} />);

    expect(screen.getByText("128")).toBeInTheDocument();
    expect(screen.getByText("ATX: 78")).toBeInTheDocument();
    expect(screen.getByText("RR: 31")).toBeInTheDocument();
    expect(screen.getByText("CP: 19")).toBeInTheDocument();
    expect(screen.getByText("121")).toBeInTheDocument();
    expect(screen.getByText("/ 128 targets")).toBeInTheDocument();
    expect(screen.getByText("94.5% resolution rate")).toBeInTheDocument();
    expect(screen.getByText("7 offline")).toBeInTheDocument();
    expect(screen.getByText("242")).toBeInTheDocument();
    expect(screen.getByText("Avg. Extracted Payload")).toBeInTheDocument();
    expect(screen.getByText("2.1 facts/org")).toBeInTheDocument();
    expect(screen.getAllByText("14")).toHaveLength(2);
    expect(screen.getByText(/Missing URLs/)).toBeInTheDocument();
    expect(screen.getByText(/Low Confidence/)).toBeInTheDocument();
    expect(screen.getAllByText("7")).toHaveLength(2);
    expect(screen.getByText("Triage Desk Ready")).toBeInTheDocument();
    expect(screen.getByText("Manual Send")).toBeInTheDocument();
  });

  it("keeps metro chips at zero and mutes attention and drafts when empty", () => {
    const { container } = render(<PipelineSummaryMetrics {...empty} />);

    expect(screen.getByText("ATX: 0")).toBeInTheDocument();
    expect(screen.getByText("RR: 0")).toBeInTheDocument();
    expect(screen.getByText("CP: 0")).toBeInTheDocument();
    expect(screen.queryByText("ATX: 78")).not.toBeInTheDocument();
    expect(screen.getByText("0% resolution rate")).toBeInTheDocument();
    expect(screen.getByText("0 facts/org")).toBeInTheDocument();

    const heroNumbers = container.querySelectorAll('[data-slot="metric-hero"]');
    const attentionHero = heroNumbers[3];
    const draftsHero = heroNumbers[4];
    expect(attentionHero?.textContent).toBe("0");
    expect(draftsHero?.textContent).toBe("0");
    expect(attentionHero?.className).not.toContain("#E11D48");
    expect(draftsHero?.className).not.toContain("#0F766E");
  });

  it("displays prop values without inventing counts", () => {
    render(
      <PipelineSummaryMetrics
        discovered={{ value: 3, atx: 1, rr: 1, cp: 1 }}
        matched={{
          value: 2,
          of: 3,
          resolutionRate: "66.7%",
          offline: 1,
        }}
        citations={{ value: 4, avgFactsPerOrg: "1.3 facts/org" }}
        attention={{ value: 1, missingUrls: 1, lowConfidence: 0 }}
        draftsReady={{ value: 2 }}
      />,
    );

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("ATX: 1")).toBeInTheDocument();
    expect(screen.getByText("/ 3 targets")).toBeInTheDocument();
    expect(screen.getByText("66.7% resolution rate")).toBeInTheDocument();
    expect(screen.getByText("1.3 facts/org")).toBeInTheDocument();
    expect(screen.queryByText("128")).not.toBeInTheDocument();
    expect(screen.queryByText("2.1 facts/org")).not.toBeInTheDocument();
  });

  it("renders hero values as text with Operator Core card surfaces", () => {
    const { container } = render(<PipelineSummaryMetrics {...filled} />);

    expect(screen.getByText("128")).toHaveClass("text-[28px]");
    const cards = container.querySelectorAll('[data-slot="card"]');
    expect(cards).toHaveLength(5);
    expect(cards[0]).toHaveClass("bg-white");
    expect(cards[0]?.className).toContain("border-[#E2E8F0]");
  });
});
