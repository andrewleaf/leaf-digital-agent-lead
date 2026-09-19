import { render, screen, within } from "@testing-library/react";
import {
  CalendarClock,
  Layers,
  MailCheck,
  SlidersHorizontal,
} from "lucide-react";
import { describe, expect, it } from "vitest";

import { AppSidebarNav, type SidebarNavItem } from "./app-sidebar-nav";

const items: SidebarNavItem[] = [
  {
    id: "campaigns",
    label: "Campaigns",
    href: "/campaigns",
    icon: Layers,
    shortcut: "⌘1",
  },
  {
    id: "review-queue",
    label: "Review Queue",
    href: "/queue",
    icon: MailCheck,
    count: 14,
    countTone: "primary",
  },
  {
    id: "follow-ups",
    label: "Follow-ups",
    href: "/follow-ups",
    icon: CalendarClock,
    count: 3,
    countTone: "neutral",
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: SlidersHorizontal,
    shortcut: "⌘,",
  },
];

describe("AppSidebarNav", () => {
  it("renders the brand block with the version chip", () => {
    render(
      <AppSidebarNav items={items} activeItemId="campaigns" version="v2.4" />,
    );

    expect(screen.getByText("LocalDraft")).toBeInTheDocument();
    expect(screen.getByText("Operator Core")).toBeInTheDocument();
    expect(screen.getByText("v2.4")).toBeInTheDocument();
  });

  it("renders every destination with its trailing affordance", () => {
    render(
      <AppSidebarNav items={items} activeItemId="campaigns" version="v2.4" />,
    );

    const nav = screen.getByRole("navigation", { name: "Workspace" });
    expect(within(nav).getAllByRole("link")).toHaveLength(4);
    expect(
      within(nav).getByRole("link", { name: /Campaigns/ }),
    ).toHaveAttribute("href", "/campaigns");
    expect(within(nav).getByText("⌘1")).toBeInTheDocument();
    expect(within(nav).getByText("⌘,")).toBeInTheDocument();
    expect(within(nav).getByText("14")).toBeInTheDocument();
    expect(within(nav).getByText("3")).toBeInTheDocument();
  });

  it("marks only the active destination as the current page", () => {
    render(
      <AppSidebarNav
        items={items}
        activeItemId="review-queue"
        version="v2.4"
      />,
    );

    const current = screen.getByRole("link", { name: /Review Queue/ });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.className).toContain("bg-[#0F766E]");
    expect(screen.getByRole("link", { name: /Campaigns/ })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("omits the count when an item has none", () => {
    render(
      <AppSidebarNav
        items={[
          {
            id: "settings",
            label: "Settings",
            href: "/settings",
            icon: SlidersHorizontal,
          },
        ]}
        activeItemId="settings"
        version="v2.4"
      />,
    );

    const link = screen.getByRole("link", { name: "Settings" });
    expect(link.textContent).toBe("Settings");
  });

  it("renders footer slots and collapses the footer when both are omitted", () => {
    const { rerender, container } = render(
      <AppSidebarNav
        items={items}
        activeItemId="campaigns"
        version="v2.4"
        campaignSelector={<div>campaign selector slot</div>}
        operator={<div>operator slot</div>}
      />,
    );

    expect(screen.getByText("campaign selector slot")).toBeInTheDocument();
    expect(screen.getByText("operator slot")).toBeInTheDocument();

    rerender(
      <AppSidebarNav items={items} activeItemId="campaigns" version="v2.4" />,
    );

    expect(
      screen.queryByText("campaign selector slot"),
    ).not.toBeInTheDocument();
    expect(container.querySelector('[data-slot="separator"]')).toBeNull();
  });

  it("hides decorative icons and shortcut hints from the accessible name", () => {
    const { container } = render(
      <AppSidebarNav items={items} activeItemId="campaigns" version="v2.4" />,
    );

    expect(screen.getByRole("link", { name: "Campaigns" })).toBeInTheDocument();
    expect(container.querySelectorAll("svg[aria-hidden='true']").length).toBe(
      4,
    );
  });
});
