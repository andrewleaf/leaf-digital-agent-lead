import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageHeader } from "./page-header";

const DESCRIPTION =
  "Define your local search perimeter, research parameters, and offer boundaries. LocalDraft will find public websites and extract verified facts before drafting.";

describe("PageHeader", () => {
  it("renders the title as the only h1", () => {
    render(<PageHeader title="Create Targeted Campaign" />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Create Targeted Campaign");
  });

  it("renders the full Stitch hero when every part is supplied", () => {
    render(
      <PageHeader
        title="Create Targeted Campaign"
        badge="Guided Setup"
        description={DESCRIPTION}
        specToken="CAMPAIGN_SPEC_v2.4"
        phase="New Perimeter Setup"
        meta={<span>AUTOSAVED 14:02 UTC</span>}
      />,
    );

    expect(screen.getByText("Guided Setup")).toBeInTheDocument();
    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
    expect(screen.getByText("CAMPAIGN_SPEC_v2.4")).toBeInTheDocument();
    expect(screen.getByText("New Perimeter Setup")).toBeInTheDocument();
    expect(screen.getByText("AUTOSAVED 14:02 UTC")).toBeInTheDocument();
  });

  it("caps the description measure", () => {
    render(
      <PageHeader title="Create Targeted Campaign" description={DESCRIPTION} />,
    );

    expect(screen.getByText(DESCRIPTION).className).toContain("max-w-3xl");
  });

  it("drops the strip entirely when it has no content", () => {
    render(
      <PageHeader title="Create Targeted Campaign" badge="Guided Setup" />,
    );

    expect(screen.queryByText("/")).not.toBeInTheDocument();
    expect(screen.queryByText("CAMPAIGN_SPEC_v2.4")).not.toBeInTheDocument();
  });

  it("keeps the strip when only the meta slot is supplied", () => {
    render(
      <PageHeader
        title="Create Targeted Campaign"
        meta={<span>Lead Engine: Active</span>}
      />,
    );

    expect(screen.getByText("Lead Engine: Active")).toBeInTheDocument();
  });
});
