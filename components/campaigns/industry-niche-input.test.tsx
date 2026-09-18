import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { IndustryNicheInput } from "./industry-niche-input";

describe("IndustryNicheInput", () => {
  it("renders the filled Stitch mock", () => {
    render(
      <IndustryNicheInput
        niches={[{ id: "hvac", label: "HVAC Contractors" }]}
        naicsVerified
        inputValue=""
        onInputChange={vi.fn()}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
        onPresetSelect={vi.fn()}
      />,
    );

    expect(
      screen.getByLabelText("Primary Industry / Niche Category"),
    ).toHaveAttribute("placeholder", "Type to add secondary niche...");
    expect(screen.getByText("NAICS verified match")).toBeInTheDocument();
    expect(screen.getByText("HVAC Contractors")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove HVAC Contractors" })).toBeInTheDocument();
    expect(screen.getByText("Quick Presets:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+ Plumbers" })).toBeEnabled();
  });

  it("hides NAICS status and chips in the empty state", () => {
    render(
      <IndustryNicheInput
        niches={[]}
        naicsVerified={false}
        inputValue=""
        onInputChange={vi.fn()}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
        onPresetSelect={vi.fn()}
      />,
    );

    expect(screen.queryByText("NAICS verified match")).not.toBeInTheDocument();
    expect(screen.queryByText("HVAC Contractors")).not.toBeInTheDocument();
  });

  it("submits onAdd on Enter and calls onPresetSelect with the vertical", () => {
    const onAdd = vi.fn();
    const onPresetSelect = vi.fn();

    render(
      <IndustryNicheInput
        niches={[]}
        naicsVerified={false}
        inputValue="Roofing"
        onInputChange={vi.fn()}
        onAdd={onAdd}
        onRemove={vi.fn()}
        onPresetSelect={onPresetSelect}
      />,
    );

    fireEvent.keyDown(
      screen.getByLabelText("Primary Industry / Niche Category"),
      { key: "Enter" },
    );
    expect(onAdd).toHaveBeenCalledWith("Roofing");

    fireEvent.click(screen.getByRole("button", { name: "+ Auto Repair" }));
    expect(onPresetSelect).toHaveBeenCalledWith("Auto Repair");
  });

  it("disables presets already present in the chip list", () => {
    render(
      <IndustryNicheInput
        niches={[{ id: "plumbers", label: "Plumbers" }]}
        naicsVerified={false}
        inputValue=""
        onInputChange={vi.fn()}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
        onPresetSelect={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "+ Plumbers" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "+ Auto Repair" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Remove Plumbers" })).toBeEnabled();
  });

  it("disables the field when disabled is true", () => {
    render(
      <IndustryNicheInput
        niches={[{ id: "hvac", label: "HVAC Contractors" }]}
        naicsVerified={false}
        inputValue=""
        onInputChange={vi.fn()}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
        onPresetSelect={vi.fn()}
        disabled
      />,
    );

    expect(
      screen.getByLabelText("Primary Industry / Niche Category"),
    ).toBeDisabled();
    expect(screen.getByRole("button", { name: "+ Roofing" })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Remove HVAC Contractors" }),
    ).toBeDisabled();
  });
});
