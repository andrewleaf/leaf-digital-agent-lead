import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  CAMPAIGN_SETTINGS_LABEL,
  CampaignPipelineActions,
  jumpToReviewQueueLabel,
  PAUSE_RESEARCH_LABEL,
} from "./campaign-pipeline-actions";

const JUMP_14 = jumpToReviewQueueLabel(14);
const JUMP_0 = jumpToReviewQueueLabel(0);

describe("CampaignPipelineActions", () => {
  it("renders the Stitch action labels with interpolated ready count", () => {
    render(
      <CampaignPipelineActions
        readyCount={14}
        onPause={vi.fn()}
        onSettings={vi.fn()}
        onJumpToQueue={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: PAUSE_RESEARCH_LABEL }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: CAMPAIGN_SETTINGS_LABEL }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: JUMP_14 })).toBeInTheDocument();
  });

  it("keeps the primary visible when readyCount is 0", () => {
    render(
      <CampaignPipelineActions
        readyCount={0}
        onPause={vi.fn()}
        onSettings={vi.fn()}
        onJumpToQueue={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: JUMP_0 })).toBeInTheDocument();
  });

  it("fires the callback props only", () => {
    const onPause = vi.fn();
    const onSettings = vi.fn();
    const onJumpToQueue = vi.fn();

    render(
      <CampaignPipelineActions
        readyCount={14}
        onPause={onPause}
        onSettings={onSettings}
        onJumpToQueue={onJumpToQueue}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: PAUSE_RESEARCH_LABEL }));
    fireEvent.click(
      screen.getByRole("button", { name: CAMPAIGN_SETTINGS_LABEL }),
    );
    fireEvent.click(screen.getByRole("button", { name: JUMP_14 }));

    expect(onPause).toHaveBeenCalledTimes(1);
    expect(onSettings).toHaveBeenCalledTimes(1);
    expect(onJumpToQueue).toHaveBeenCalledTimes(1);
  });

  it("disables all buttons when disabled is true", () => {
    render(
      <CampaignPipelineActions
        readyCount={14}
        onPause={vi.fn()}
        onSettings={vi.fn()}
        onJumpToQueue={vi.fn()}
        disabled
      />,
    );

    expect(
      screen.getByRole("button", { name: PAUSE_RESEARCH_LABEL }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: CAMPAIGN_SETTINGS_LABEL }),
    ).toBeDisabled();
    expect(screen.getByRole("button", { name: JUMP_14 })).toBeDisabled();
  });

  it("disables only Pause Research when pauseDisabled is true", () => {
    render(
      <CampaignPipelineActions
        readyCount={14}
        onPause={vi.fn()}
        onSettings={vi.fn()}
        onJumpToQueue={vi.fn()}
        pauseDisabled
      />,
    );

    expect(
      screen.getByRole("button", { name: PAUSE_RESEARCH_LABEL }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: CAMPAIGN_SETTINGS_LABEL }),
    ).toBeEnabled();
    expect(screen.getByRole("button", { name: JUMP_14 })).toBeEnabled();
  });

  it("marks the primary as busy when pending without disabling the secondaries", () => {
    render(
      <CampaignPipelineActions
        readyCount={14}
        onPause={vi.fn()}
        onSettings={vi.fn()}
        onJumpToQueue={vi.fn()}
        pending
      />,
    );

    const primary = screen.getByRole("button", { name: JUMP_14 });
    expect(primary).toBeDisabled();
    expect(primary).toHaveAttribute("aria-busy", "true");
    expect(
      screen.getByRole("button", { name: PAUSE_RESEARCH_LABEL }),
    ).toBeEnabled();
    expect(
      screen.getByRole("button", { name: CAMPAIGN_SETTINGS_LABEL }),
    ).toBeEnabled();
  });
});
