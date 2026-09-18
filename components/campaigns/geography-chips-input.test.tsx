import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { GeographyChipsInput } from "./geography-chips-input";

const FILLED_GEOS = [
  { id: "austin", label: "Austin, TX" },
  { id: "round-rock", label: "Round Rock, TX" },
  { id: "cedar-park", label: "Cedar Park, TX" },
];

describe("GeographyChipsInput", () => {
  it("renders the filled Stitch mock", () => {
    render(
      <GeographyChipsInput
        geographies={FILLED_GEOS}
        regionCaption="Austin Metropolitan Area"
        inputValue=""
        onInputChange={vi.fn()}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
      />,
    );

    expect(screen.getByText("Target Geographies")).toBeInTheDocument();
    expect(screen.getByText("Austin Metropolitan Area")).toBeInTheDocument();
    expect(screen.getByText("Austin, TX")).toBeInTheDocument();
    expect(screen.getByText("Round Rock, TX")).toBeInTheDocument();
    expect(screen.getByText("Cedar Park, TX")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Remove Austin, TX" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add city/county" }),
    ).toBeInTheDocument();
  });

  it("omits the region caption when it is null and shows no chips when empty", () => {
    render(
      <GeographyChipsInput
        geographies={[]}
        regionCaption={null}
        inputValue=""
        onInputChange={vi.fn()}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
      />,
    );

    expect(screen.queryByText("Austin Metropolitan Area")).not.toBeInTheDocument();
    expect(screen.queryByText("Austin, TX")).not.toBeInTheDocument();
  });

  it("reveals and focuses the input from Add city/county, then submits on Enter", () => {
    const onAdd = vi.fn();
    const onInputChange = vi.fn();

    const { rerender } = render(
      <GeographyChipsInput
        geographies={[]}
        inputValue=""
        onInputChange={onInputChange}
        onAdd={onAdd}
        onRemove={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Add city/county" }));

    const input = screen.getByLabelText("Target Geographies");
    expect(input).toHaveAttribute("placeholder", "Add city/county");

    rerender(
      <GeographyChipsInput
        geographies={[]}
        inputValue="Georgetown, TX"
        onInputChange={onInputChange}
        onAdd={onAdd}
        onRemove={vi.fn()}
      />,
    );

    fireEvent.keyDown(screen.getByLabelText("Target Geographies"), {
      key: "Enter",
    });
    expect(onAdd).toHaveBeenCalledWith("Georgetown, TX");
  });

  it("calls onRemove with the chip id only", () => {
    const onRemove = vi.fn();

    render(
      <GeographyChipsInput
        geographies={FILLED_GEOS}
        regionCaption="Austin Metropolitan Area"
        inputValue=""
        onInputChange={vi.fn()}
        onAdd={vi.fn()}
        onRemove={onRemove}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Remove Round Rock, TX" }));
    expect(onRemove).toHaveBeenCalledWith("round-rock");
  });

  it("disables add, dismiss, and the composer when disabled is true", () => {
    render(
      <GeographyChipsInput
        geographies={FILLED_GEOS}
        regionCaption="Austin Metropolitan Area"
        inputValue="Austin"
        onInputChange={vi.fn()}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
        disabled
      />,
    );

    expect(screen.getByLabelText("Target Geographies")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Add city/county" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Remove Cedar Park, TX" })).toBeDisabled();
  });
});
