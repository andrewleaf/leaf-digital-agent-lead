import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  LOCAL_BOUNDARY_LABEL,
  PROHIBITION_FILTERS_LABEL,
  SetupReadinessChips,
  WEBSITE_GATE_LABEL,
} from "./setup-readiness-chips";

describe("SetupReadinessChips", () => {
  it("renders the filled Stitch mock with check affordances", () => {
    render(
      <SetupReadinessChips
        prohibitionFilters={3}
        metros={3}
        websiteGateEnabled
      />,
    );

    expect(
      screen.getByLabelText(`${PROHIBITION_FILTERS_LABEL}: 3 Active`),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(`${LOCAL_BOUNDARY_LABEL}: 3 Metros`),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(`${WEBSITE_GATE_LABEL}: Enabled`),
    ).toBeInTheDocument();

    const prohibition = screen.getByLabelText(
      `${PROHIBITION_FILTERS_LABEL}: 3 Active`,
    );
    expect(prohibition).toHaveClass(
      "bg-[#ECFDF5]",
      "text-[#047857]",
      "border-[#A7F3D0]",
    );
    expect(prohibition.querySelector("svg")).not.toBeNull();
  });

  it("uses attention tokens and no checks when incomplete", () => {
    render(
      <SetupReadinessChips
        prohibitionFilters={0}
        metros={0}
        websiteGateEnabled={false}
      />,
    );

    const prohibition = screen.getByLabelText(
      `${PROHIBITION_FILTERS_LABEL}: 0 Active`,
    );
    const metros = screen.getByLabelText(`${LOCAL_BOUNDARY_LABEL}: 0 Metros`);
    const gate = screen.getByLabelText(`${WEBSITE_GATE_LABEL}: Off`);

    for (const chip of [prohibition, metros, gate]) {
      expect(chip).toHaveClass(
        "bg-[#FFFBEB]",
        "text-[#B45309]",
        "border-[#FDE68A]",
      );
      expect(chip.className).not.toContain("ECFDF5");
      expect(chip.querySelector("svg")).toBeNull();
    }
  });

  it("renders values from props rather than inventing sibling counts", () => {
    render(
      <SetupReadinessChips
        prohibitionFilters={1}
        metros={2}
        websiteGateEnabled={false}
      />,
    );

    expect(
      screen.getByLabelText(`${PROHIBITION_FILTERS_LABEL}: 1 Active`),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(`${LOCAL_BOUNDARY_LABEL}: 2 Metros`),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(`${WEBSITE_GATE_LABEL}: Off`),
    ).toBeInTheDocument();
  });
});
