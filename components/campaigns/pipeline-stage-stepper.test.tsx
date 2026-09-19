import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  EMPTY_PIPELINE_RUN_STAGES,
  PIPELINE_RUN_STAGES,
  PIPELINE_STEPPER_EYEBROW,
  PIPELINE_STEPPER_TITLE,
  PipelineStageStepper,
} from "./pipeline-stage-stepper";

describe("PipelineStageStepper", () => {
  it("renders the filled Stitch mock header, legend, and stages", () => {
    render(
      <PipelineStageStepper
        stages={PIPELINE_RUN_STAGES}
        completedCount={4}
        activeCount={1}
        pendingCount={1}
      />,
    );

    expect(screen.getByText(PIPELINE_STEPPER_EYEBROW)).toBeInTheDocument();
    expect(screen.getByText(PIPELINE_STEPPER_TITLE)).toBeInTheDocument();
    expect(screen.getByText("Completed (4)")).toBeInTheDocument();
    expect(screen.getByText("Active (1)")).toBeInTheDocument();
    expect(screen.getByText("Pending (1)")).toBeInTheDocument();

    const items = screen.getAllByRole("listitem");
    const stages = items.slice(-6);
    expect(
      stages.map((item) => within(item).getByRole("heading").textContent),
    ).toEqual([
      "Campaign Setup",
      "Discovery",
      "Website Matching",
      "Public Scrapes",
      "Draft Generation",
      "Human Review",
    ]);

    expect(
      screen.getByText("Austin, Round Rock, Cedar Park HVAC taxonomy"),
    ).toBeInTheDocument();
    expect(screen.getByText("Geo Parameters")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(
      screen.getByText(
        "128 businesses indexed via Google Maps & Secretary of State",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Discovered")).toBeInTheDocument();
    expect(screen.getByText("128 / 128")).toBeInTheDocument();
    expect(
      screen.getByText(
        "121 verified domains resolved (7 flagged for operator review)",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Domain Match")).toBeInTheDocument();
    expect(screen.getByText("94.5%")).toBeInTheDocument();
    expect(
      screen.getByText(
        "114 sites parsed for team size, awards, license #s (7 incomplete)",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Crawl Yield")).toBeInTheDocument();
    expect(screen.getByText("114 / 121")).toBeInTheDocument();
    expect(
      screen.getByText(
        "98 personalized drafts generated; 16 remaining in pipeline",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Synthesis Progress")).toBeInTheDocument();
    expect(screen.getByText("88%")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Strict manual operator gate. 0 blast risk. 14 ready right now.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Ready in Queue")).toBeInTheDocument();
    expect(screen.getByText("14 Leads")).toBeInTheDocument();

    expect(screen.getByLabelText("Geo Parameters 100%")).toHaveAttribute(
      "data-slot",
      "progress",
    );
    expect(screen.getByLabelText("Domain Match 94.5%")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Ready in Queue 14 Leads"),
    ).toBeInTheDocument();
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("highlights Draft Generation and keeps Human Review as Manual Only", () => {
    const { container } = render(
      <PipelineStageStepper
        stages={PIPELINE_RUN_STAGES}
        completedCount={4}
        activeCount={1}
        pendingCount={1}
      />,
    );

    const draft = screen.getByText("Draft Generation").closest("li");
    expect(draft).toHaveAttribute("aria-current", "step");
    expect(draft).toHaveClass("ring-2");
    expect(within(draft!).getByText("In Progress")).toBeInTheDocument();
    expect(within(draft!).getByRole("progressbar")).toHaveAttribute(
      "data-slot",
      "progress",
    );
    expect(draft!.querySelector("svg")).toBeNull();

    const review = screen.getByText("Human Review").closest("li");
    expect(review).not.toHaveAttribute("aria-current");
    expect(within(review!).getByText("Manual Only")).toBeInTheDocument();
    expect(within(review!).queryByText("Done")).toBeNull();
    expect(container.querySelector("button")).toBeNull();
  });

  it("does not invent yield numbers in the empty pending mock", () => {
    render(
      <PipelineStageStepper
        stages={EMPTY_PIPELINE_RUN_STAGES}
        completedCount={0}
        activeCount={0}
        pendingCount={6}
      />,
    );

    expect(screen.getByText("Completed (0)")).toBeInTheDocument();
    expect(screen.getByText("Active (0)")).toBeInTheDocument();
    expect(screen.getByText("Pending (6)")).toBeInTheDocument();
    expect(screen.getAllByText("Pending")).toHaveLength(6);
    expect(screen.queryByText("128 / 128")).not.toBeInTheDocument();
    expect(screen.queryByText("94.5%")).not.toBeInTheDocument();
    expect(screen.queryByText("114 / 121")).not.toBeInTheDocument();
    expect(screen.queryByText("14 Leads")).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "128 businesses indexed via Google Maps & Secretary of State",
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("progressbar", { name: "Geo Parameters" }),
    ).toHaveAttribute("aria-valuenow", "0");
  });
});
