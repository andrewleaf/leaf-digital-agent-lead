import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  HUMAN_IN_THE_LOOP_NOTICE,
  SEARCH_PLACEHOLDER,
  WorkspaceTopBar,
  type WorkspaceTopBarProps,
} from "./workspace-top-bar";

function renderTopBar(overrides: Partial<WorkspaceTopBarProps> = {}) {
  const props: WorkspaceTopBarProps = {
    breadcrumb: [{ label: "Workspace", href: "/" }, { label: "Review Desk" }],
    searchValue: "",
    onSearchChange: vi.fn(),
    onNewCampaign: vi.fn(),
    policyNotice: HUMAN_IN_THE_LOOP_NOTICE,
    reviewedThisWeek: 38,
    operator: { name: "Alex M. (Operator)", initials: "AM" },
    ...overrides,
  };

  return { props, ...render(<WorkspaceTopBar {...props} />) };
}

describe("WorkspaceTopBar", () => {
  it("renders the trail with only the last crumb as the current page", () => {
    renderTopBar();

    expect(screen.getByRole("link", { name: "Workspace" })).toHaveAttribute(
      "href",
      "/",
    );
    const current = screen.getByText("Review Desk");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.tagName).toBe("SPAN");
  });

  it("uses the Stitch search placeholder and reports typing through the callback", () => {
    const { props } = renderTopBar();

    const search = screen.getByRole("searchbox", {
      name: "Search leads, domains, campaigns",
    });
    expect(search).toHaveAttribute("placeholder", SEARCH_PLACEHOLDER);

    fireEvent.change(search, { target: { value: "hvac" } });
    expect(props.onSearchChange).toHaveBeenCalledWith("hvac");
  });

  it("hides the policy pill and review stat at narrow widths but keeps the copy", () => {
    renderTopBar();

    const notice = screen.getByText(HUMAN_IN_THE_LOOP_NOTICE);
    expect(notice.className).toContain("hidden");
    expect(notice.className).toContain("xl:inline-flex");

    const stat = screen.getByText("drafts reviewed this week").parentElement;
    expect(screen.getByText("38")).toBeInTheDocument();
    expect(stat?.className).toContain("hidden");
    expect(stat?.className).toContain("md:flex");
  });

  it("omits the stat and the pill when they are not provided", () => {
    renderTopBar({ policyNotice: undefined, reviewedThisWeek: undefined });

    expect(
      screen.queryByText(HUMAN_IN_THE_LOOP_NOTICE),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("drafts reviewed this week"),
    ).not.toBeInTheDocument();
  });

  it("fires the primary action", () => {
    const { props } = renderTopBar();

    screen.getByRole("button", { name: "New Campaign" }).click();
    expect(props.onNewCampaign).toHaveBeenCalledTimes(1);
  });

  it("falls back to initials and still names the operator", () => {
    renderTopBar();

    expect(screen.getByText("AM")).toBeInTheDocument();
    expect(screen.getByText("Alex M. (Operator)")).toBeInTheDocument();
  });
});
