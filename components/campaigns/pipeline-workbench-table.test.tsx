import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  PIPELINE_WORKBENCH_ROWS,
  PipelineWorkbenchTable,
} from "./pipeline-workbench-table";

describe("PipelineWorkbenchTable", () => {
  it("renders Stitch column headers as table header cells", () => {
    render(
      <PipelineWorkbenchTable
        rows={PIPELINE_WORKBENCH_ROWS}
        onAction={vi.fn()}
      />,
    );

    const headers = screen.getAllByRole("columnheader");
    expect(headers.map((header) => header.textContent)).toEqual([
      "Business Name",
      "Metro Location",
      "Pipeline Stage",
      "Confidence & Citations",
      "Operator Next Action",
    ]);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders the five Stitch mock businesses with verbatim copy", () => {
    render(
      <PipelineWorkbenchTable
        rows={PIPELINE_WORKBENCH_ROWS}
        onAction={vi.fn()}
      />,
    );

    expect(screen.getByText("Lonestar Air & Heating")).toBeInTheDocument();
    expect(
      screen.getByText("lonestarairtx.com • TDLR #TACLA019822E"),
    ).toBeInTheDocument();
    expect(screen.getByText("Round Rock Comfort Pros")).toBeInTheDocument();
    expect(
      screen.getByText("rrcomfortpros.net • Carrier Authorized"),
    ).toBeInTheDocument();
    expect(screen.getByText("Apex Cool Mechanical")).toBeInTheDocument();
    expect(
      screen.getByText("Registered entity: APEX COOL LLC"),
    ).toBeInTheDocument();
    expect(screen.getByText("Barton Springs HVAC")).toBeInTheDocument();
    expect(
      screen.getByText("bartonspringshvac.com • South Lamar Blvd"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Hill Country Climate Solutions"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("hillcountryclimate.com • Bell Blvd"),
    ).toBeInTheDocument();

    expect(screen.getAllByText("Austin, TX")).toHaveLength(3);
    expect(screen.getByText("Round Rock, TX")).toBeInTheDocument();
    expect(screen.getByText("Cedar Park, TX")).toBeInTheDocument();

    expect(screen.getAllByText("Stage 6: Ready for Review")).toHaveLength(2);
    expect(screen.getByText("Stage 3: Missing Website")).toBeInTheDocument();
    expect(screen.getByText("Stage 4: Low Confidence")).toBeInTheDocument();
    expect(screen.getByText("Stage 5: Generating Draft")).toBeInTheDocument();

    expect(screen.getByText("3 Verified Facts")).toBeInTheDocument();
    expect(
      screen.getByText("Austin Chronicle '23 Best Pick, 24/7 Dispatch"),
    ).toBeInTheDocument();
    expect(screen.getByText("2 Verified Facts")).toBeInTheDocument();
    expect(
      screen.getByText("14 Techs, Lennox Premier Dealer Status"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Warning: Primary domain unreachable / DNS error"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Amber: Commercial service hours conflict"),
    ).toBeInTheDocument();
    expect(screen.getByText("Research Complete")).toBeInTheDocument();
    expect(
      screen.getByText("Awaiting AI synthesis queue slot #3"),
    ).toBeInTheDocument();
  });

  it("uses primary Review Draft and secondary next-actions, calling onAction(id)", () => {
    const onAction = vi.fn();

    render(
      <PipelineWorkbenchTable
        rows={PIPELINE_WORKBENCH_ROWS}
        onAction={onAction}
      />,
    );

    const reviewButtons = screen.getAllByRole("button", { name: "Review Draft" });
    expect(reviewButtons).toHaveLength(2);
    expect(reviewButtons[0]).toHaveClass("bg-[#0F766E]");

    const addWebsite = screen.getByRole("button", { name: "Add Website URL" });
    const verifySource = screen.getByRole("button", { name: "Verify Source" });
    const viewResearch = screen.getByRole("button", {
      name: "View Live Research",
    });

    expect(addWebsite).toHaveClass("bg-white");
    expect(verifySource).toHaveClass("border-[#E2E8F0]");
    expect(viewResearch).toHaveClass("text-[#0F172A]");

    fireEvent.click(reviewButtons[0]);
    fireEvent.click(addWebsite);
    expect(onAction).toHaveBeenNthCalledWith(1, "lonestar-air");
    expect(onAction).toHaveBeenNthCalledWith(2, "apex-cool");
  });

  it("tints the Apex Cool attention row and keeps warning copy visible", () => {
    const { container } = render(
      <PipelineWorkbenchTable
        rows={PIPELINE_WORKBENCH_ROWS}
        onAction={vi.fn()}
      />,
    );

    const apexRow = container.querySelector('[data-category="needs-attention"]');
    expect(apexRow).toHaveClass("bg-[#E11D48]/5");
    expect(
      screen.getByText("Warning: Primary domain unreachable / DNS error"),
    ).toHaveClass("text-[#E11D48]");
  });

  it("renders headers with an empty body when rows is empty", () => {
    render(<PipelineWorkbenchTable rows={[]} onAction={vi.fn()} />);

    expect(screen.getAllByRole("columnheader")).toHaveLength(5);
    expect(screen.queryByText("Lonestar Air & Heating")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(within(screen.getByRole("table")).queryAllByRole("row")).toHaveLength(
      1,
    );
  });
});
