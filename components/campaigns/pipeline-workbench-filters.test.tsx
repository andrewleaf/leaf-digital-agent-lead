import type { ComponentProps } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  PipelineWorkbenchFilters,
  WORKBENCH_EXPORT_LABEL,
  WORKBENCH_FILTER_LABEL,
  WORKBENCH_FILTER_PLACEHOLDER,
  WORKBENCH_VIEWS,
  WORKBENCH_VIEWS_LABEL,
} from "./pipeline-workbench-filters";

const STITCH_ORDER = [
  "All Pipeline Items",
  "Needs Attention",
  "Ready for Review",
  "Completed",
];

const FILLED_COUNTS = {
  all: 128,
  needsAttention: 14,
  readyReview: 14,
  completed: 84,
};

function renderFilters(
  overrides: Partial<ComponentProps<typeof PipelineWorkbenchFilters>> = {},
) {
  return render(
    <PipelineWorkbenchFilters
      value="all"
      onValueChange={vi.fn()}
      counts={FILLED_COUNTS}
      query=""
      onQueryChange={vi.fn()}
      onExport={vi.fn()}
      {...overrides}
    />,
  );
}

describe("PipelineWorkbenchFilters", () => {
  it("renders four views in Stitch order with filled mock counts", () => {
    renderFilters();

    expect(
      screen.getAllByRole("radio").map((option) =>
        STITCH_ORDER.find((label) => option.textContent?.startsWith(label)),
      ),
    ).toEqual(STITCH_ORDER);
    expect(screen.getByRole("radio", { name: /All Pipeline Items/ })).toHaveTextContent(
      "128",
    );
    expect(screen.getByRole("radio", { name: /Needs Attention/ })).toHaveTextContent(
      "14",
    );
    expect(screen.getByRole("radio", { name: /Ready for Review/ })).toHaveTextContent(
      "14",
    );
    expect(screen.getByRole("radio", { name: /Completed/ })).toHaveTextContent("84");
  });

  it("selects All Pipeline Items in the filled mock", () => {
    renderFilters();

    expect(
      screen.getByRole("radio", { name: /All Pipeline Items/ }),
    ).toHaveAttribute("data-state", "on");
    expect(
      screen
        .getAllByRole("radio")
        .filter((option) => option.getAttribute("data-state") === "on"),
    ).toHaveLength(1);
  });

  it("reports the picked view through onValueChange and ignores deselect", () => {
    const onValueChange = vi.fn();

    renderFilters({ onValueChange });

    fireEvent.click(screen.getByRole("radio", { name: /Needs Attention/ }));
    expect(onValueChange).toHaveBeenCalledWith("needs-attention");

    onValueChange.mockClear();
    fireEvent.click(screen.getByRole("radio", { name: /All Pipeline Items/ }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("keeps the filter empty, filled, and disabled in isolation", () => {
    const { rerender } = renderFilters({ query: "" });

    const emptyInput = screen.getByLabelText(WORKBENCH_FILTER_LABEL);
    expect(emptyInput).toHaveValue("");
    expect(emptyInput).toHaveAttribute("placeholder", WORKBENCH_FILTER_PLACEHOLDER);

    rerender(
      <PipelineWorkbenchFilters
        value="all"
        onValueChange={vi.fn()}
        counts={FILLED_COUNTS}
        query="Austin"
        onQueryChange={vi.fn()}
        onExport={vi.fn()}
      />,
    );
    expect(screen.getByLabelText(WORKBENCH_FILTER_LABEL)).toHaveValue("Austin");

    rerender(
      <PipelineWorkbenchFilters
        value="all"
        onValueChange={vi.fn()}
        counts={FILLED_COUNTS}
        query="Austin"
        onQueryChange={vi.fn()}
        onExport={vi.fn()}
        disabled
      />,
    );
    expect(screen.getByLabelText(WORKBENCH_FILTER_LABEL)).toBeDisabled();
    expect(
      screen.getByRole("radiogroup", { name: WORKBENCH_VIEWS_LABEL }),
    ).toBeInTheDocument();
    for (const option of screen.getAllByRole("radio")) {
      expect(option).toBeDisabled();
    }
    expect(screen.getByRole("button", { name: WORKBENCH_EXPORT_LABEL })).toBeDisabled();
  });

  it("emits onQueryChange and calls onExport without writing a file", () => {
    const onQueryChange = vi.fn();
    const onExport = vi.fn();

    renderFilters({ onQueryChange, onExport });

    fireEvent.change(screen.getByLabelText(WORKBENCH_FILTER_LABEL), {
      target: { value: "Round Rock" },
    });
    expect(onQueryChange).toHaveBeenCalledWith("Round Rock");

    fireEvent.click(screen.getByRole("button", { name: WORKBENCH_EXPORT_LABEL }));
    expect(onExport).toHaveBeenCalledTimes(1);
  });

  it("shows Needs Attention and Ready for Review counts as visible rose and teal badges", () => {
    renderFilters();

    const attention = screen.getByRole("radio", { name: /Needs Attention/ });
    const ready = screen.getByRole("radio", { name: /Ready for Review/ });
    const attentionBadge = attention.querySelector("[data-slot=badge]");
    const readyBadge = ready.querySelector("[data-slot=badge]");

    expect(attentionBadge).toHaveTextContent("14");
    expect(attentionBadge).toHaveClass("bg-[#FFF1F2]", "text-[#E11D48]");
    expect(readyBadge).toHaveTextContent("14");
    expect(readyBadge).toHaveClass("bg-[#F0FDFA]", "text-[#0F766E]");
    expect(
      screen.getByRole("radio", { name: /All Pipeline Items/ }).querySelector("[data-slot=badge]"),
    ).toBeNull();
    expect(
      screen.getByRole("radio", { name: /Completed/ }).querySelector("[data-slot=badge]"),
    ).toBeNull();
  });

  it("keeps the exported view list aligned with the Stitch copy", () => {
    expect(WORKBENCH_VIEWS.map((view) => view.label)).toEqual(STITCH_ORDER);
    expect(WORKBENCH_VIEWS.map((view) => view.value)).toEqual([
      "all",
      "needs-attention",
      "ready-review",
      "completed",
    ]);
  });
});
