import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  DEFAULT_DISCOVERY_DETAIL,
  PIPELINE_SEQUENCE_META,
  PIPELINE_SEQUENCE_TITLE,
  PIPELINE_STAGES,
  PipelineSequenceRail,
} from "./pipeline-sequence-rail";

describe("PipelineSequenceRail", () => {
  it("renders the header and six Stitch stages in order", () => {
    render(<PipelineSequenceRail />);

    expect(screen.getByText(PIPELINE_SEQUENCE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(PIPELINE_SEQUENCE_META)).toBeInTheDocument();

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(6);
    expect(items.map((item) => item.textContent)).toEqual(
      PIPELINE_STAGES.map(
        (stage) => `${stage.id}${stage.title}${stage.detail}`,
      ),
    );
    expect(screen.getByText(DEFAULT_DISCOVERY_DETAIL)).toBeInTheDocument();
  });

  it("substitutes the stage-1 geography line from discoveryDetail", () => {
    render(<PipelineSequenceRail discoveryDetail="Dallas, Fort Worth" />);

    expect(screen.getByText("Dallas, Fort Worth")).toBeInTheDocument();
    expect(
      screen.queryByText(DEFAULT_DISCOVERY_DETAIL),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Filter domain health & active status"),
    ).toBeInTheDocument();
  });

  it("highlights the current stage without adding job controls", () => {
    const { container } = render(<PipelineSequenceRail currentStage={3} />);

    const current = screen.getByText("Fact Extraction Engine").closest("li");
    expect(current).toHaveAttribute("aria-current", "step");
    expect(current).toHaveClass("bg-[#F0FDFA]");
    expect(container.querySelector("button")).toBeNull();
    expect(container.querySelector('[data-slot="progress"]')).toBeNull();
  });
});
