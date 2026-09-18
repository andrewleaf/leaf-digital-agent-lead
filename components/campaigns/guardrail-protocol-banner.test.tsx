import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GuardrailProtocolBanner } from "./guardrail-protocol-banner";

const BODY =
  "Human-in-the-Loop: LocalDraft drafts emails based strictly on verified public websites. No automated emails are ever dispatched. Every single send requires physical operator sign-off.";

describe("GuardrailProtocolBanner", () => {
  it("renders the Stitch protocol copy on Alert primitives", () => {
    const { container } = render(
      <GuardrailProtocolBanner className="mt-2" />,
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-slot", "alert");
    expect(alert).toHaveClass("mt-2");
    expect(alert).toHaveClass("bg-[#FFF1F2]");
    expect(alert).toHaveClass("border-[#FECDD3]");
    expect(alert).not.toHaveClass("bg-[#FFFBEB]");

    expect(screen.getByText("Strict Guardrail Protocol")).toBeInTheDocument();
    expect(screen.getByText("RULE_01")).toBeInTheDocument();
    expect(screen.getByText(BODY)).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="alert-title"]'),
    ).toHaveTextContent("Strict Guardrail Protocol");
    expect(
      container.querySelector('[data-slot="alert-description"]'),
    ).toHaveTextContent(BODY);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
