import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  CALL_TO_ACTION_HELPER,
  CALL_TO_ACTION_LABEL,
  CALL_TO_ACTION_STATUS,
  CallToActionField,
} from "./call-to-action-field";

const FILLED_MOCK =
  "Ask whether they would like a short 3-minute video review of their booking flow";

describe("CallToActionField", () => {
  it("renders the filled Stitch mock", () => {
    render(<CallToActionField value={FILLED_MOCK} onChange={vi.fn()} />);

    expect(screen.getByLabelText(CALL_TO_ACTION_LABEL)).toHaveValue(
      FILLED_MOCK,
    );
    expect(screen.getByText(CALL_TO_ACTION_STATUS)).toBeInTheDocument();
    expect(screen.getByText(CALL_TO_ACTION_HELPER)).toBeInTheDocument();
  });

  it("describes the textarea with the helper copy", () => {
    render(<CallToActionField value={FILLED_MOCK} onChange={vi.fn()} />);

    expect(screen.getByLabelText(CALL_TO_ACTION_LABEL)).toHaveAccessibleDescription(
      CALL_TO_ACTION_HELPER,
    );
  });

  it("renders an empty textarea with no character count", () => {
    render(<CallToActionField value="" onChange={vi.fn()} />);

    expect(screen.getByLabelText(CALL_TO_ACTION_LABEL)).toHaveValue("");
    expect(screen.queryByText("0")).not.toBeInTheDocument();
    expect(screen.queryByText("Editorial Tone")).not.toBeInTheDocument();
  });

  it("reports edits through onChange without holding state", () => {
    const onChange = vi.fn();

    render(<CallToActionField value="" onChange={onChange} />);

    fireEvent.change(screen.getByLabelText(CALL_TO_ACTION_LABEL), {
      target: { value: FILLED_MOCK },
    });
    expect(onChange).toHaveBeenCalledWith(FILLED_MOCK);
  });

  it("hides the friction badge when frictionStatus is null", () => {
    render(
      <CallToActionField
        value={FILLED_MOCK}
        onChange={vi.fn()}
        frictionStatus={null}
      />,
    );

    expect(screen.queryByText(CALL_TO_ACTION_STATUS)).not.toBeInTheDocument();
    expect(screen.getByText(CALL_TO_ACTION_LABEL)).toBeInTheDocument();
  });

  it("disables the textarea when disabled is true", () => {
    render(
      <CallToActionField value={FILLED_MOCK} onChange={vi.fn()} disabled />,
    );

    expect(screen.getByLabelText(CALL_TO_ACTION_LABEL)).toBeDisabled();
  });
});
