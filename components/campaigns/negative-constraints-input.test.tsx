import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  NEGATIVE_CONSTRAINTS_EYEBROW,
  NEGATIVE_CONSTRAINTS_PLACEHOLDER,
  NEGATIVE_CONSTRAINTS_PROMPT,
  NegativeConstraintsInput,
} from "./negative-constraints-input";

const FILLED_CHIP = "Do not claim guaranteed revenue improvements";
const FILLED_CONSTRAINTS = [{ id: "no-revenue-guarantee", label: FILLED_CHIP }];

describe("NegativeConstraintsInput", () => {
  it("renders the filled Stitch mock", () => {
    render(
      <NegativeConstraintsInput
        constraints={FILLED_CONSTRAINTS}
        inputValue=""
        onInputChange={vi.fn()}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
      />,
    );

    expect(screen.getByText(NEGATIVE_CONSTRAINTS_EYEBROW)).toBeInTheDocument();
    expect(screen.getByText(NEGATIVE_CONSTRAINTS_PROMPT)).toBeInTheDocument();
    expect(screen.getByText(FILLED_CHIP)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: `Remove ${FILLED_CHIP}` }),
    ).toBeInTheDocument();
  });

  it("labels the input with the prompt and uses the documented placeholder", () => {
    render(
      <NegativeConstraintsInput
        constraints={[]}
        inputValue=""
        onInputChange={vi.fn()}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
      />,
    );

    const input = screen.getByLabelText(NEGATIVE_CONSTRAINTS_PROMPT);
    expect(input).toHaveAttribute(
      "placeholder",
      NEGATIVE_CONSTRAINTS_PLACEHOLDER,
    );
  });

  it("renders no chips and no caption when empty", () => {
    render(
      <NegativeConstraintsInput
        constraints={[]}
        inputValue=""
        onInputChange={vi.fn()}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
        caption={null}
      />,
    );

    expect(screen.queryByText(FILLED_CHIP)).not.toBeInTheDocument();
    expect(
      screen.queryByText("Crucial safety & brand reputation boundary conditions"),
    ).not.toBeInTheDocument();
  });

  it("renders the optional caption when passed", () => {
    render(
      <NegativeConstraintsInput
        constraints={FILLED_CONSTRAINTS}
        inputValue=""
        onInputChange={vi.fn()}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
        caption="Crucial safety & brand reputation boundary conditions"
      />,
    );

    expect(
      screen.getByText("Crucial safety & brand reputation boundary conditions"),
    ).toBeInTheDocument();
  });

  it("adds a trimmed claim on Enter", () => {
    const onAdd = vi.fn();

    render(
      <NegativeConstraintsInput
        constraints={[]}
        inputValue="  Do not promise same-day dispatch  "
        onInputChange={vi.fn()}
        onAdd={onAdd}
        onRemove={vi.fn()}
      />,
    );

    fireEvent.keyDown(screen.getByLabelText(NEGATIVE_CONSTRAINTS_PROMPT), {
      key: "Enter",
    });
    expect(onAdd).toHaveBeenCalledWith("Do not promise same-day dispatch");
  });

  it("ignores Enter on an empty or whitespace-only input", () => {
    const onAdd = vi.fn();

    render(
      <NegativeConstraintsInput
        constraints={[]}
        inputValue="   "
        onInputChange={vi.fn()}
        onAdd={onAdd}
        onRemove={vi.fn()}
      />,
    );

    fireEvent.keyDown(screen.getByLabelText(NEGATIVE_CONSTRAINTS_PROMPT), {
      key: "Enter",
    });
    expect(onAdd).not.toHaveBeenCalled();
  });

  it("does not add a claim that is already listed", () => {
    const onAdd = vi.fn();

    render(
      <NegativeConstraintsInput
        constraints={FILLED_CONSTRAINTS}
        inputValue={FILLED_CHIP.toUpperCase()}
        onInputChange={vi.fn()}
        onAdd={onAdd}
        onRemove={vi.fn()}
      />,
    );

    fireEvent.keyDown(screen.getByLabelText(NEGATIVE_CONSTRAINTS_PROMPT), {
      key: "Enter",
    });
    expect(onAdd).not.toHaveBeenCalled();
  });

  it("calls onRemove with the chip id only", () => {
    const onRemove = vi.fn();

    render(
      <NegativeConstraintsInput
        constraints={FILLED_CONSTRAINTS}
        inputValue=""
        onInputChange={vi.fn()}
        onAdd={vi.fn()}
        onRemove={onRemove}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: `Remove ${FILLED_CHIP}` }),
    );
    expect(onRemove).toHaveBeenCalledWith("no-revenue-guarantee");
  });

  it("uses prohibition rose tokens rather than success emerald", () => {
    render(
      <NegativeConstraintsInput
        constraints={FILLED_CONSTRAINTS}
        inputValue=""
        onInputChange={vi.fn()}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
      />,
    );

    const chip = screen.getByText(FILLED_CHIP).closest("[data-slot='badge']");
    expect(chip).toHaveClass("bg-[#FFF1F2]", "text-[#BE123C]", "border-[#FECDD3]");
    expect(chip?.className).not.toContain("ECFDF5");
  });

  it("disables the input and dismiss controls when disabled is true", () => {
    render(
      <NegativeConstraintsInput
        constraints={FILLED_CONSTRAINTS}
        inputValue=""
        onInputChange={vi.fn()}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
        disabled
      />,
    );

    expect(screen.getByLabelText(NEGATIVE_CONSTRAINTS_PROMPT)).toBeDisabled();
    expect(
      screen.getByRole("button", { name: `Remove ${FILLED_CHIP}` }),
    ).toBeDisabled();
  });
});
