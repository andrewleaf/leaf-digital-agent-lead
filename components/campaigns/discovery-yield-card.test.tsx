import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DiscoveryYieldCard } from "./discovery-yield-card";

describe("DiscoveryYieldCard", () => {
  it("renders the filled Stitch mock as a circular ring", () => {
    const { container } = render(
      <DiscoveryYieldCard
        estimateLabel="~120-140 local businesses"
        confidence={94}
      />,
    );

    expect(
      screen.getByText("Estimated Discovery Yield:"),
    ).toBeInTheDocument();
    expect(screen.getByText("~120-140 local businesses")).toBeInTheDocument();
    expect(screen.getByText("Confidence:")).toBeInTheDocument();
    expect(screen.getByText("94%")).toBeInTheDocument();
    expect(container.querySelector('[data-slot="progress"]')).toBeNull();
    expect(container.querySelector("svg circle")).not.toBeNull();
  });

  it("does not invent a yield range or a 0% claim when empty", () => {
    render(<DiscoveryYieldCard estimateLabel={null} confidence={null} />);

    expect(
      screen.queryByText("~120-140 local businesses"),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Unknown")).toBeInTheDocument();
    expect(screen.queryByText("0%")).not.toBeInTheDocument();
  });

  it("uses amber stroke below 80 confidence", () => {
    const { container } = render(
      <DiscoveryYieldCard estimateLabel="~40-50 local businesses" confidence={62} />,
    );

    const rings = container.querySelectorAll("svg circle");
    expect(rings[1]?.getAttribute("stroke")).toBe("#D97706");
    expect(screen.getByText("62%")).toBeInTheDocument();
  });
});
