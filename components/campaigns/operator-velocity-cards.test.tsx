import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  OPERATOR_VELOCITY_CAPTION,
  OPERATOR_VELOCITY_MOCK,
  OPERATOR_VELOCITY_TITLE,
  OperatorVelocityCards,
} from "./operator-velocity-cards";

describe("OperatorVelocityCards", () => {
  it("renders the section title, caption, and three Stitch operators", () => {
    render(<OperatorVelocityCards operators={OPERATOR_VELOCITY_MOCK} />);

    expect(screen.getByText(OPERATOR_VELOCITY_TITLE)).toBeInTheDocument();
    expect(screen.getByText(OPERATOR_VELOCITY_CAPTION)).toBeInTheDocument();

    expect(screen.getByText("Alex M.")).toBeInTheDocument();
    expect(screen.getByText("Austin HVAC, Chicago Mech")).toBeInTheDocument();
    expect(screen.getByText("#1 Velocity")).toBeInTheDocument();
    expect(screen.getByText("142")).toBeInTheDocument();
    expect(screen.getByText("38s")).toBeInTheDocument();
    expect(screen.getByText("28.4%")).toBeInTheDocument();
    expect(screen.getAllByText("0 Citation Flags")).toHaveLength(2);
    expect(screen.getAllByText("100% Native Sent")).toHaveLength(3);

    expect(screen.getByText("Sarah K.")).toBeInTheDocument();
    expect(screen.getByText("DFW Roofing, Atlanta Ortho")).toBeInTheDocument();
    expect(screen.getByText("High Volume")).toBeInTheDocument();
    expect(screen.getByText("118")).toBeInTheDocument();
    expect(screen.getByText("46s")).toBeInTheDocument();
    expect(screen.getByText("24.1%")).toBeInTheDocument();
    expect(screen.getByText("1 Flag Resolved")).toBeInTheDocument();

    expect(screen.getByText("Marcus T.")).toBeInTheDocument();
    expect(screen.getByText("Chicago Mechanical Lead")).toBeInTheDocument();
    expect(screen.getByText("Top Conv.")).toBeInTheDocument();
    expect(screen.getByText("94")).toBeInTheDocument();
    expect(screen.getByText("41s")).toBeInTheDocument();
    expect(screen.getByText("29.0%")).toBeInTheDocument();

    expect(screen.getAllByText("Reviewed")).toHaveLength(3);
    expect(screen.getAllByText("Avg Speed")).toHaveLength(3);
    expect(screen.getAllByText("Reply Rate")).toHaveLength(3);
  });

  it("does not invent operators when the list is empty", () => {
    render(<OperatorVelocityCards operators={[]} />);

    expect(screen.getByText(OPERATOR_VELOCITY_TITLE)).toBeInTheDocument();
    expect(screen.getByText(OPERATOR_VELOCITY_CAPTION)).toBeInTheDocument();
    expect(screen.queryByText("Alex M.")).not.toBeInTheDocument();
    expect(screen.queryByText("Sarah K.")).not.toBeInTheDocument();
    expect(screen.queryByText("Marcus T.")).not.toBeInTheDocument();
  });
});
