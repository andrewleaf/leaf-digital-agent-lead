import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  DENSITY_CAPTION,
  EXTRACT_PROOF_POINTS_HELPER,
  EXTRACT_PROOF_POINTS_LABEL,
  FALLBACK_ACTION_LABEL,
  FALLBACK_ACTIONS,
  REQUIRE_WEBSITE_HELPER,
  REQUIRE_WEBSITE_LABEL,
  REQUIRE_WEBSITE_SEVERITY,
  RESEARCH_DEPTH_EYEBROW,
  ResearchDepthSettings,
} from "./research-depth-settings";

const FILLED = {
  requireWebsite: true,
  extractProofPoints: true,
  fallbackAction: FALLBACK_ACTIONS[0].value,
};

describe("ResearchDepthSettings", () => {
  it("renders the filled Stitch mock", () => {
    render(
      <ResearchDepthSettings
        {...FILLED}
        onRequireWebsiteChange={vi.fn()}
        onExtractProofPointsChange={vi.fn()}
        onFallbackActionChange={vi.fn()}
      />,
    );

    expect(screen.getByText(RESEARCH_DEPTH_EYEBROW)).toBeInTheDocument();
    expect(screen.getByText(REQUIRE_WEBSITE_LABEL)).toBeInTheDocument();
    expect(screen.getByText(REQUIRE_WEBSITE_SEVERITY)).toBeInTheDocument();
    expect(screen.getByText(REQUIRE_WEBSITE_HELPER)).toBeInTheDocument();
    expect(screen.getByText(EXTRACT_PROOF_POINTS_LABEL)).toBeInTheDocument();
    expect(screen.getByText(EXTRACT_PROOF_POINTS_HELPER)).toBeInTheDocument();
    expect(screen.getByText(FALLBACK_ACTION_LABEL)).toBeInTheDocument();
    expect(screen.getByText(FALLBACK_ACTIONS[0].label)).toBeInTheDocument();
    expect(screen.getByText(DENSITY_CAPTION)).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeChecked();
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("hides Strict and leaves controls off in the empty state", () => {
    render(
      <ResearchDepthSettings
        requireWebsite={false}
        extractProofPoints={false}
        fallbackAction={null}
        onRequireWebsiteChange={vi.fn()}
        onExtractProofPointsChange={vi.fn()}
        onFallbackActionChange={vi.fn()}
      />,
    );

    expect(
      screen.queryByText(REQUIRE_WEBSITE_SEVERITY),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("switch")).not.toBeChecked();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByRole("radio")).not.toBeChecked();
  });

  it("associates labels with the switch, checkbox, and fallback radios", () => {
    render(
      <ResearchDepthSettings
        {...FILLED}
        onRequireWebsiteChange={vi.fn()}
        onExtractProofPointsChange={vi.fn()}
        onFallbackActionChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText(REQUIRE_WEBSITE_LABEL)).toHaveAttribute(
      "data-slot",
      "switch",
    );
    expect(screen.getByLabelText(EXTRACT_PROOF_POINTS_LABEL)).toHaveAttribute(
      "data-slot",
      "checkbox",
    );
    expect(screen.getByLabelText(FALLBACK_ACTIONS[0].label)).toHaveAttribute(
      "data-slot",
      "radio-group-item",
    );
    expect(screen.getByRole("radiogroup")).toHaveAttribute(
      "aria-labelledby",
      "research-depth-fallback-label",
    );
  });

  it("reports control changes through the callbacks only", () => {
    const onRequireWebsiteChange = vi.fn();
    const onExtractProofPointsChange = vi.fn();
    const onFallbackActionChange = vi.fn();

    render(
      <ResearchDepthSettings
        requireWebsite={false}
        extractProofPoints={false}
        fallbackAction={null}
        onRequireWebsiteChange={onRequireWebsiteChange}
        onExtractProofPointsChange={onExtractProofPointsChange}
        onFallbackActionChange={onFallbackActionChange}
      />,
    );

    fireEvent.click(screen.getByLabelText(REQUIRE_WEBSITE_LABEL));
    fireEvent.click(screen.getByLabelText(EXTRACT_PROOF_POINTS_LABEL));
    fireEvent.click(screen.getByLabelText(FALLBACK_ACTIONS[0].label));

    expect(onRequireWebsiteChange).toHaveBeenCalledWith(true);
    expect(onExtractProofPointsChange).toHaveBeenCalledWith(true);
    expect(onFallbackActionChange).toHaveBeenCalledWith("flag-unverified");
  });

  it("disables every control when disabled is true", () => {
    render(
      <ResearchDepthSettings
        {...FILLED}
        onRequireWebsiteChange={vi.fn()}
        onExtractProofPointsChange={vi.fn()}
        onFallbackActionChange={vi.fn()}
        disabled
      />,
    );

    expect(screen.getByRole("switch")).toBeDisabled();
    expect(screen.getByRole("checkbox")).toBeDisabled();
    expect(screen.getByRole("radio")).toBeDisabled();
  });
});
