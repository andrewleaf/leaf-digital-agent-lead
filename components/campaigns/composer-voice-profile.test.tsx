import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  COMPOSER_VOICE_LABEL,
  COMPOSER_VOICE_SELECTED_MARKER,
  ComposerVoiceProfile,
  VOICE_PROFILES,
} from "./composer-voice-profile";

const STITCH_ORDER = [
  "Helpful & Direct",
  "Peer-to-Peer Collegial",
  "Concise Technical",
  "Audit-led Gentle Inquiry",
  "Conversational",
];

describe("ComposerVoiceProfile", () => {
  it("renders every option in Stitch order", () => {
    render(<ComposerVoiceProfile value={null} onValueChange={vi.fn()} />);

    expect(screen.getByText(COMPOSER_VOICE_LABEL)).toBeInTheDocument();
    expect(
      screen.getAllByRole("radio").map((option) => option.textContent),
    ).toEqual(STITCH_ORDER);
  });

  it("marks the filled Stitch mock as selected", () => {
    render(
      <ComposerVoiceProfile value="helpful-direct" onValueChange={vi.fn()} />,
    );

    const selected = screen.getByRole("radio", { name: /Helpful & Direct/ });
    expect(selected).toHaveAttribute("data-state", "on");
    expect(selected).toHaveTextContent(COMPOSER_VOICE_SELECTED_MARKER);
  });

  it("selects one option at a time and keeps the marker on the active chip", () => {
    render(
      <ComposerVoiceProfile value="helpful-direct" onValueChange={vi.fn()} />,
    );

    const onOptions = screen
      .getAllByRole("radio")
      .filter((option) => option.getAttribute("data-state") === "on");
    expect(onOptions).toHaveLength(1);
    expect(
      screen.getAllByText(COMPOSER_VOICE_SELECTED_MARKER),
    ).toHaveLength(1);
  });

  it("reports the picked value through onValueChange", () => {
    const onValueChange = vi.fn();

    render(
      <ComposerVoiceProfile value={null} onValueChange={onValueChange} />,
    );

    fireEvent.click(screen.getByRole("radio", { name: "Concise Technical" }));
    expect(onValueChange).toHaveBeenCalledWith("concise-technical");
  });

  it("renders no selection and no marker when value is null", () => {
    render(<ComposerVoiceProfile value={null} onValueChange={vi.fn()} />);

    expect(
      screen
        .getAllByRole("radio")
        .every((option) => option.getAttribute("data-state") === "off"),
    ).toBe(true);
    expect(
      screen.queryByText(COMPOSER_VOICE_SELECTED_MARKER),
    ).not.toBeInTheDocument();
  });

  it("ignores a deselect attempt on the active option", () => {
    const onValueChange = vi.fn();

    render(
      <ComposerVoiceProfile
        value="helpful-direct"
        onValueChange={onValueChange}
      />,
    );

    fireEvent.click(screen.getByRole("radio", { name: /Helpful & Direct/ }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("exposes an accessible group name and disables every option when disabled", () => {
    render(
      <ComposerVoiceProfile
        value="helpful-direct"
        onValueChange={vi.fn()}
        disabled
      />,
    );

    expect(
      screen.getByRole("radiogroup", { name: COMPOSER_VOICE_LABEL }),
    ).toBeInTheDocument();
    for (const option of screen.getAllByRole("radio")) {
      expect(option).toBeDisabled();
    }
  });

  it("keeps the exported profile list aligned with the Stitch copy", () => {
    expect(VOICE_PROFILES.map((profile) => profile.label)).toEqual(
      STITCH_ORDER,
    );
  });
});
