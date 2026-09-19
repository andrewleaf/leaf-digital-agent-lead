import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppShell } from "./app-shell";

function renderShell() {
  return render(
    <AppShell
      sidebar={<nav aria-label="Workspace">rail slot</nav>}
      header={<div>header slot</div>}
    >
      <p>page content</p>
    </AppShell>,
  );
}

describe("AppShell", () => {
  it("renders each slot in its own region", () => {
    renderShell();

    expect(screen.getByText("rail slot")).toBeInTheDocument();
    expect(screen.getByText("header slot")).toBeInTheDocument();
    expect(screen.getByRole("main").querySelector("p")?.textContent).toBe(
      "page content",
    );
  });

  it("pins the 256px rail and 56px header around the canvas", () => {
    const { container } = renderShell();

    const rail = container.querySelector("aside");
    expect(rail?.className).toContain("fixed");
    expect(rail?.className).toContain("w-64");
    expect(rail?.className).toContain("border-r");

    const header = screen.getByRole("banner");
    expect(header.className).toContain("fixed");
    expect(header.className).toContain("h-14");
    expect(header.className).toContain("left-64");
  });

  it("clears the fixed header so main content is not hidden behind it", () => {
    renderShell();

    expect(screen.getByRole("main").className).toContain("pt-14");
  });

  it("exposes exactly one main, banner, and navigation landmark", () => {
    renderShell();

    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getAllByRole("banner")).toHaveLength(1);
    expect(screen.getAllByRole("navigation")).toHaveLength(1);
  });

  it("merges className onto the outer wrapper without dropping the canvas", () => {
    const { container } = render(
      <AppShell sidebar={null} header={null} className="custom-frame">
        <span>body</span>
      </AppShell>,
    );

    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("custom-frame");
    expect(wrapper?.className).toContain("bg-[#F8FAFC]");
  });
});
