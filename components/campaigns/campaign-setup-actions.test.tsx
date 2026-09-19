import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  CampaignSetupActions,
  INITIALIZE_PIPELINE_LABEL,
  SAVE_DRAFT_LABEL,
} from "./campaign-setup-actions";

describe("CampaignSetupActions", () => {
  it("renders the Stitch action labels", () => {
    render(
      <CampaignSetupActions onSaveDraft={vi.fn()} onInitialize={vi.fn()} />,
    );

    expect(
      screen.getByRole("button", { name: SAVE_DRAFT_LABEL }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: INITIALIZE_PIPELINE_LABEL }),
    ).toBeInTheDocument();
  });

  it("fires the callback props only", () => {
    const onSaveDraft = vi.fn();
    const onInitialize = vi.fn();

    render(
      <CampaignSetupActions
        onSaveDraft={onSaveDraft}
        onInitialize={onInitialize}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: SAVE_DRAFT_LABEL }));
    fireEvent.click(
      screen.getByRole("button", { name: INITIALIZE_PIPELINE_LABEL }),
    );

    expect(onSaveDraft).toHaveBeenCalledTimes(1);
    expect(onInitialize).toHaveBeenCalledTimes(1);
  });

  it("disables both buttons when disabled is true", () => {
    const onSaveDraft = vi.fn();
    const onInitialize = vi.fn();

    render(
      <CampaignSetupActions
        onSaveDraft={onSaveDraft}
        onInitialize={onInitialize}
        disabled
      />,
    );

    expect(
      screen.getByRole("button", { name: SAVE_DRAFT_LABEL }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: INITIALIZE_PIPELINE_LABEL }),
    ).toBeDisabled();
  });

  it("disables only the primary when initializeDisabled is true", () => {
    render(
      <CampaignSetupActions
        onSaveDraft={vi.fn()}
        onInitialize={vi.fn()}
        initializeDisabled
      />,
    );

    expect(
      screen.getByRole("button", { name: SAVE_DRAFT_LABEL }),
    ).toBeEnabled();
    expect(
      screen.getByRole("button", { name: INITIALIZE_PIPELINE_LABEL }),
    ).toBeDisabled();
  });

  it("marks the primary as busy when pending without disabling Save as Draft", () => {
    render(
      <CampaignSetupActions
        onSaveDraft={vi.fn()}
        onInitialize={vi.fn()}
        pending
      />,
    );

    const primary = screen.getByRole("button", {
      name: INITIALIZE_PIPELINE_LABEL,
    });
    expect(primary).toBeDisabled();
    expect(primary).toHaveAttribute("aria-busy", "true");
    expect(
      screen.getByRole("button", { name: SAVE_DRAFT_LABEL }),
    ).toBeEnabled();
  });
});
