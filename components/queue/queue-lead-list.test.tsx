import type { ComponentProps } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  QUEUE_FILTER_LABEL,
  QUEUE_FILTER_PLACEHOLDER,
  QUEUE_LEAD_LIST_ROWS,
  QUEUE_TITLE,
  QUEUE_VIEWS_LABEL,
  QueueLeadList,
} from "./queue-lead-list";

const FILLED_COUNTS = { all: 98, needsReview: 14, ready: 7 };

function renderList(
  overrides: Partial<ComponentProps<typeof QueueLeadList>> = {},
) {
  return render(
    <QueueLeadList
      rows={QUEUE_LEAD_LIST_ROWS}
      selectedId="lonestar-air"
      onSelect={vi.fn()}
      view="all"
      onViewChange={vi.fn()}
      query=""
      onQueryChange={vi.fn()}
      totalCount={98}
      pendingCount={14}
      viewCounts={FILLED_COUNTS}
      {...overrides}
    />,
  );
}

describe("QueueLeadList", () => {
  it("shows the queue title, total count, and pending chip", () => {
    renderList();

    expect(
      screen.getByRole("heading", { name: QUEUE_TITLE }),
    ).toBeInTheDocument();
    expect(screen.getByText("98")).toBeInTheDocument();
    expect(screen.getByText("14 PENDING")).toHaveClass(
      "bg-[#FFFBEB]",
      "text-[#D97706]",
      "border-[#FDE68A]",
    );
  });

  it("renders view chips from viewCounts and reports onViewChange only", () => {
    const onViewChange = vi.fn();
    renderList({ onViewChange });

    expect(screen.getByRole("radio", { name: "All (98)" })).toHaveAttribute(
      "data-state",
      "on",
    );
    expect(
      screen.getByRole("radio", { name: "Needs Review (14)" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Ready" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("radio", { name: "Needs Review (14)" }));
    expect(onViewChange).toHaveBeenCalledWith("needs-review");

    onViewChange.mockClear();
    fireEvent.click(screen.getByRole("radio", { name: "All (98)" }));
    expect(onViewChange).not.toHaveBeenCalled();
  });

  it("renders the seven Stitch rows with status text, facts, and indexes", () => {
    renderList();

    for (const row of QUEUE_LEAD_LIST_ROWS) {
      const button = screen.getByRole("button", { name: new RegExp(row.name) });
      expect(button).toHaveTextContent(row.statusLabel);
      expect(button).toHaveTextContent(row.niche);
      expect(button).toHaveTextContent(row.metro);
      expect(button).toHaveTextContent(row.domainLabel);
      expect(button).toHaveTextContent(row.factsLabel);
      expect(button).toHaveTextContent(row.indexLabel);
    }

    expect(
      screen.getByRole("button", { name: /Lonestar Air/ }),
    ).toHaveTextContent("lonestarair-tx.com");
    expect(screen.getByRole("button", { name: /Apex Cool/ })).toHaveTextContent(
      "Google Maps Only",
    );
  });

  it("marks the selected row and calls onSelect with the row id", () => {
    const onSelect = vi.fn();
    renderList({ onSelect });

    const selected = screen.getByRole("button", { name: /Lonestar Air/ });
    expect(selected).toHaveAttribute("aria-pressed", "true");
    expect(selected).toHaveClass(
      "bg-[#F0FDFA]",
      "shadow-[inset_0_0_0_2px_#0F766E]",
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Round Rock Comfort Pros/ }),
    );
    expect(onSelect).toHaveBeenCalledWith("round-rock-comfort");
  });

  it("keeps the header when rows are empty and blocks input when disabled", () => {
    const onSelect = vi.fn();
    const onQueryChange = vi.fn();
    const { rerender } = renderList({ rows: [], onSelect, onQueryChange });

    expect(
      screen.getByRole("heading", { name: QUEUE_TITLE }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(QUEUE_FILTER_LABEL)).toBeInTheDocument();
    expect(
      screen.getByRole("radiogroup", { name: QUEUE_VIEWS_LABEL }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Lonestar Air/ }),
    ).not.toBeInTheDocument();

    rerender(
      <QueueLeadList
        rows={QUEUE_LEAD_LIST_ROWS}
        selectedId="lonestar-air"
        onSelect={onSelect}
        view="all"
        onViewChange={vi.fn()}
        query="Austin"
        onQueryChange={onQueryChange}
        totalCount={98}
        pendingCount={14}
        viewCounts={FILLED_COUNTS}
        disabled
      />,
    );

    expect(screen.getByLabelText(QUEUE_FILTER_LABEL)).toBeDisabled();
    expect(screen.getByLabelText(QUEUE_FILTER_LABEL)).toHaveAttribute(
      "placeholder",
      QUEUE_FILTER_PLACEHOLDER,
    );
    for (const option of screen.getAllByRole("radio")) {
      expect(option).toBeDisabled();
    }
    fireEvent.click(
      screen.getByRole("button", { name: /Round Rock Comfort Pros/ }),
    );
    expect(onSelect).not.toHaveBeenCalled();
  });
});
