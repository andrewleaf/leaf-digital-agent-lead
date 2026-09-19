import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  PLATFORM_GUARDRAILS_FOOTER,
  PLATFORM_GUARDRAILS_MANUAL_LABEL,
  PLATFORM_GUARDRAILS_MOCK,
  PLATFORM_GUARDRAILS_TITLE,
  PlatformGuardrailsStrip,
} from "./platform-guardrails-strip";

describe("PlatformGuardrailsStrip", () => {
  it("renders the Stitch header, stats, and footer", () => {
    render(<PlatformGuardrailsStrip {...PLATFORM_GUARDRAILS_MOCK} />);

    expect(screen.getByText(PLATFORM_GUARDRAILS_TITLE)).toBeInTheDocument();
    expect(screen.getByText(PLATFORM_GUARDRAILS_MANUAL_LABEL)).toBeInTheDocument();
    expect(
      screen.getByText("Forbidden Clichés Auto-Stripped"),
    ).toBeInTheDocument();
    expect(screen.getByText("23 intercepted")).toBeInTheDocument();
    expect(screen.getByText("Unverified Claims Blocked")).toBeInTheDocument();
    expect(screen.getByText("4 blocked")).toBeInTheDocument();
    expect(screen.getByText("Background SMTP Daemons")).toBeInTheDocument();
    expect(screen.getByText("0 (Permanently Disabled)")).toBeInTheDocument();
    expect(screen.getByText(PLATFORM_GUARDRAILS_FOOTER)).toBeInTheDocument();
    expect(screen.getByText("0 (Permanently Disabled)")).toHaveClass(
      "text-[#047857]",
    );
    expect(screen.queryByText("Start SMTP")).not.toBeInTheDocument();
  });

  it("keeps title, chip, and footer when stats are empty", () => {
    render(
      <PlatformGuardrailsStrip
        manualLabel={PLATFORM_GUARDRAILS_MANUAL_LABEL}
        stats={[]}
        footer={PLATFORM_GUARDRAILS_FOOTER}
      />,
    );

    expect(screen.getByText(PLATFORM_GUARDRAILS_TITLE)).toBeInTheDocument();
    expect(screen.getByText(PLATFORM_GUARDRAILS_MANUAL_LABEL)).toBeInTheDocument();
    expect(screen.getByText(PLATFORM_GUARDRAILS_FOOTER)).toBeInTheDocument();
    expect(screen.queryByText("23 intercepted")).not.toBeInTheDocument();
  });
});
