import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FormSection } from "./form-section";

describe("FormSection", () => {
  it("renders the numbered header with an h2 title and eyebrow", () => {
    render(
      <FormSection
        index={1}
        title="Target Business & Location"
        eyebrow="Search Perimeter"
      >
        <p>fields</p>
      </FormSection>,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Target Business & Location",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Search Perimeter")).toBeInTheDocument();
    expect(screen.getByText("fields")).toBeInTheDocument();
  });

  it("omits the caption and eyebrow when they are not provided", () => {
    const { container } = render(
      <FormSection index={2} title="Proposition & Review Intent">
        <p>fields</p>
      </FormSection>,
    );

    expect(container.querySelector('[data-slot="card-action"]')).toBeNull();
    expect(
      screen.getByRole("heading", { level: 2 }).parentElement?.textContent,
    ).toBe("Proposition & Review Intent");
  });

  it("switches the step token and eyebrow to the guardrail tone", () => {
    render(
      <FormSection
        index={3}
        title="Negative Constraints & Guardrails"
        caption="Crucial safety & brand reputation boundary conditions"
        eyebrow="Strict Prohibition"
        tone="guardrail"
      >
        <p>chips</p>
      </FormSection>,
    );

    expect(screen.getByText("3").className).toContain("bg-[#FFF1F2]");
    const eyebrow = screen.getByText("Strict Prohibition");
    expect(eyebrow.getAttribute("data-slot")).toBe("badge");
    expect(
      screen.getByText("Crucial safety & brand reputation boundary conditions"),
    ).toBeInTheDocument();
  });

  it("renders the default eyebrow as plain text, not a badge", () => {
    render(
      <FormSection
        index={4}
        title="Research Depth & Verification Settings"
        eyebrow="Fact Engine"
      >
        <p>settings</p>
      </FormSection>,
    );

    expect(
      screen.getByText("Fact Engine").getAttribute("data-slot"),
    ).toBeNull();
    expect(screen.getByText("4").className).toContain("bg-[#F1F5F9]");
  });

  it("renders with no children without collapsing the header", () => {
    render(
      <FormSection index={1} title="Empty section">
        {null}
      </FormSection>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Empty section" }),
    ).toBeInTheDocument();
  });
});
