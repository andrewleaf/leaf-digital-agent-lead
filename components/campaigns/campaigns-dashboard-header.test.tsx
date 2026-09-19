import type { ComponentProps } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  CAMPAIGNS_DASHBOARD_DESCRIPTION,
  CAMPAIGNS_DASHBOARD_EYEBROW,
  CAMPAIGNS_DASHBOARD_GUARD_LABEL,
  CAMPAIGNS_DASHBOARD_METROS,
  CAMPAIGNS_DASHBOARD_METROS_LABEL,
  CAMPAIGNS_DASHBOARD_TITLE,
  CampaignsDashboardHeader,
} from "./campaigns-dashboard-header";

const STITCH_METROS = [
  "All Metros",
  "Central TX",
  "North Dallas",
  "Chicagoland",
];

function renderHeader(
  overrides: Partial<ComponentProps<typeof CampaignsDashboardHeader>> = {},
) {
  return render(
    <CampaignsDashboardHeader
      title={CAMPAIGNS_DASHBOARD_TITLE}
      eyebrow={CAMPAIGNS_DASHBOARD_EYEBROW}
      description={CAMPAIGNS_DASHBOARD_DESCRIPTION}
      guardLabel={CAMPAIGNS_DASHBOARD_GUARD_LABEL}
      metros={CAMPAIGNS_DASHBOARD_METROS}
      selectedMetroId="all"
      onMetroChange={vi.fn()}
      {...overrides}
    />,
  );
}

describe("CampaignsDashboardHeader", () => {
  it("renders the filled Stitch title cluster and guard chip", () => {
    renderHeader();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: CAMPAIGNS_DASHBOARD_TITLE,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(CAMPAIGNS_DASHBOARD_EYEBROW),
    ).toBeInTheDocument();
    expect(
      screen.getByText(CAMPAIGNS_DASHBOARD_DESCRIPTION),
    ).toBeInTheDocument();
    expect(
      screen.getByText(CAMPAIGNS_DASHBOARD_GUARD_LABEL),
    ).toBeInTheDocument();
    expect(screen.queryByText("New Campaign")).not.toBeInTheDocument();
  });

  it("renders four metros in Stitch order and reports selection", () => {
    const onMetroChange = vi.fn();

    renderHeader({ onMetroChange });

    expect(
      screen.getAllByRole("radio").map((option) => option.textContent),
    ).toEqual(STITCH_METROS);
    expect(screen.getByRole("radio", { name: "All Metros" })).toHaveAttribute(
      "data-state",
      "on",
    );

    fireEvent.click(screen.getByRole("radio", { name: "Central TX" }));
    expect(onMetroChange).toHaveBeenCalledWith("central-tx");

    onMetroChange.mockClear();
    fireEvent.click(screen.getByRole("radio", { name: "All Metros" }));
    expect(onMetroChange).not.toHaveBeenCalled();
  });

  it("hides the metro filter when empty and disables changes when disabled", () => {
    const onMetroChange = vi.fn();
    const { rerender } = renderHeader({ metros: [], onMetroChange });

    expect(
      screen.queryByRole("radiogroup", { name: CAMPAIGNS_DASHBOARD_METROS_LABEL }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();

    rerender(
      <CampaignsDashboardHeader
        title={CAMPAIGNS_DASHBOARD_TITLE}
        eyebrow={CAMPAIGNS_DASHBOARD_EYEBROW}
        description={CAMPAIGNS_DASHBOARD_DESCRIPTION}
        guardLabel={CAMPAIGNS_DASHBOARD_GUARD_LABEL}
        metros={CAMPAIGNS_DASHBOARD_METROS}
        selectedMetroId="all"
        onMetroChange={onMetroChange}
        disabled
      />,
    );

    expect(
      screen.getByRole("radiogroup", { name: CAMPAIGNS_DASHBOARD_METROS_LABEL }),
    ).toBeInTheDocument();
    for (const option of screen.getAllByRole("radio")) {
      expect(option).toBeDisabled();
    }

    fireEvent.click(screen.getByRole("radio", { name: "North Dallas" }));
    expect(onMetroChange).not.toHaveBeenCalled();
  });
});
