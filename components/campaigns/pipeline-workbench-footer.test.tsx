import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  FILLED_FOOTER_MOCK,
  PipelineWorkbenchFooter,
} from "./pipeline-workbench-footer";

describe("PipelineWorkbenchFooter", () => {
  it("renders the filled Stitch mock copy", () => {
    render(
      <PipelineWorkbenchFooter
        {...FILLED_FOOTER_MOCK}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    expect(
      screen.getByText("Displaying 5 of 128 targets in execution pipeline"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Automatic Retry Interval: 30s"),
    ).toBeInTheDocument();
    expect(screen.getByText("1 of 26")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
  });

  it("interpolates count, retry, and page strings from props", () => {
    render(
      <PipelineWorkbenchFooter
        shown={0}
        total={0}
        retryInterval="15s"
        page={1}
        pageCount={1}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    expect(
      screen.getByText("Displaying 0 of 0 targets in execution pipeline"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Automatic Retry Interval: 15s"),
    ).toBeInTheDocument();
    expect(screen.getByText("1 of 1")).toBeInTheDocument();
    expect(
      screen.queryByText("Displaying 5 of 128 targets in execution pipeline"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Automatic Retry Interval: 30s"),
    ).not.toBeInTheDocument();
  });

  it("disables Previous on page 1 and fires onNext only", () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(
      <PipelineWorkbenchFooter
        {...FILLED_FOOTER_MOCK}
        onPrevious={onPrevious}
        onNext={onNext}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(onPrevious).not.toHaveBeenCalled();
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("disables Next on the last page and fires onPrevious only", () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(
      <PipelineWorkbenchFooter
        shown={8}
        total={128}
        retryInterval="30s"
        page={26}
        pageCount={26}
        onPrevious={onPrevious}
        onNext={onNext}
      />,
    );

    expect(screen.getByText("26 of 26")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onNext).not.toHaveBeenCalled();
  });

  it("enables both pager buttons on a middle page", () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(
      <PipelineWorkbenchFooter
        shown={5}
        total={128}
        retryInterval="30s"
        page={12}
        pageCount={26}
        onPrevious={onPrevious}
        onNext={onNext}
      />,
    );

    expect(screen.getByText("12 of 26")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("disables both pager buttons on a single page", () => {
    render(
      <PipelineWorkbenchFooter
        shown={5}
        total={5}
        retryInterval="30s"
        page={1}
        pageCount={1}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    expect(screen.getByText("1 of 1")).toBeInTheDocument();
  });
});
