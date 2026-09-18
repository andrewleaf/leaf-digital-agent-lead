import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CampaignSetupStatusBar } from "./campaign-setup-status-bar";

const campaigns = [{ id: "hvac-central-texas", label: "HVAC - Central Texas" }];

describe("CampaignSetupStatusBar", () => {
  it("renders the filled Stitch mock", () => {
    render(
      <CampaignSetupStatusBar
        campaigns={campaigns}
        selectedCampaignId="hvac-central-texas"
        onCampaignChange={vi.fn()}
        engineStatus="Active"
        autosavedAt="14:02 UTC"
      />,
    );

    expect(
      screen.getByRole("combobox", { name: "Target Campaign" }),
    ).toHaveTextContent("HVAC - Central Texas");
    expect(screen.getByText("Lead Engine: Active")).toBeInTheDocument();
    expect(screen.getByText("AUTOSAVED")).toBeInTheDocument();
    expect(screen.getByText("14:02 UTC")).toBeInTheDocument();
  });

  it("uses a muted idle badge and hides a missing timestamp", () => {
    render(
      <CampaignSetupStatusBar
        campaigns={campaigns}
        selectedCampaignId="hvac-central-texas"
        onCampaignChange={vi.fn()}
        engineStatus="Idle"
        autosavedAt={null}
      />,
    );

    expect(screen.getByText("Lead Engine: Idle")).toHaveClass("text-[#94A3B8]");
    expect(screen.queryByText("14:02 UTC")).not.toBeInTheDocument();
  });

  it("disables the select when there are no campaigns", () => {
    render(
      <CampaignSetupStatusBar
        campaigns={[]}
        selectedCampaignId={null}
        onCampaignChange={vi.fn()}
        engineStatus="Idle"
        autosavedAt={null}
      />,
    );

    expect(
      screen.getByRole("combobox", { name: "Target Campaign" }),
    ).toBeDisabled();
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });

  it("disables the select when disabled is true", () => {
    render(
      <CampaignSetupStatusBar
        campaigns={campaigns}
        selectedCampaignId="hvac-central-texas"
        onCampaignChange={vi.fn()}
        engineStatus="Active"
        autosavedAt="14:02 UTC"
        disabled
      />,
    );

    expect(
      screen.getByRole("combobox", { name: "Target Campaign" }),
    ).toBeDisabled();
  });
});
