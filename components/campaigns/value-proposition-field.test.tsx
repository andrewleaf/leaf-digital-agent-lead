import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ValuePropositionField } from "./value-proposition-field";

const FILLED_MOCK =
  "Website conversion review and mobile booking-flow recommendations";
const HELPER =
  "The research crawler will specifically isolate facts related to this offer (e.g. mobile responsiveness, quote inquiry speed).";

describe("ValuePropositionField", () => {
  it("renders the filled Stitch mock", () => {
    render(
      <ValuePropositionField value={FILLED_MOCK} onChange={vi.fn()} />,
    );

    expect(screen.getByText("Editorial Tone")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Specific Value Proposition / Subject of Outreach"),
    ).toHaveValue(FILLED_MOCK);
    expect(screen.getByText("Max 80 chars recommended")).toBeInTheDocument();
    expect(screen.getByText(HELPER)).toBeInTheDocument();
    expect(screen.getByText(String(FILLED_MOCK.length))).toBeInTheDocument();
  });

  it("shows an empty textarea with a live zero count", () => {
    render(<ValuePropositionField value="" onChange={vi.fn()} />);

    expect(
      screen.getByLabelText("Specific Value Proposition / Subject of Outreach"),
    ).toHaveValue("");
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("warns past 80 characters without blocking when maxLength is unset", () => {
    const overLimit = "x".repeat(81);
    const onChange = vi.fn();

    render(
      <ValuePropositionField value={overLimit} onChange={onChange} />,
    );

    const field = screen.getByLabelText(
      "Specific Value Proposition / Subject of Outreach",
    );
    expect(field).toHaveAttribute("aria-invalid", "true");
    expect(field).not.toHaveAttribute("maxLength");
    expect(screen.getByText("81")).toHaveClass("text-[#B45309]");

    fireEvent.change(field, { target: { value: `${overLimit}y` } });
    expect(onChange).toHaveBeenCalledWith(`${overLimit}y`);
  });

  it("hard-limits when maxLength is set and skips the over-80 warning", () => {
    render(
      <ValuePropositionField
        value={"x".repeat(80)}
        onChange={vi.fn()}
        maxLength={80}
      />,
    );

    const field = screen.getByLabelText(
      "Specific Value Proposition / Subject of Outreach",
    );
    expect(field).toHaveAttribute("maxLength", "80");
    expect(field).not.toHaveAttribute("aria-invalid");
    expect(screen.getByText("80")).not.toHaveClass("text-[#B45309]");
  });

  it("disables the textarea when disabled is true", () => {
    render(
      <ValuePropositionField value={FILLED_MOCK} onChange={vi.fn()} disabled />,
    );

    expect(
      screen.getByLabelText("Specific Value Proposition / Subject of Outreach"),
    ).toBeDisabled();
  });
});
