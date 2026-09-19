"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PipelineWorkbenchFooterProps = {
  shown: number;
  total: number;
  retryInterval: string;
  page: number;
  pageCount: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
};

export const FILLED_FOOTER_MOCK = {
  shown: 5,
  total: 128,
  retryInterval: "30s",
  page: 1,
  pageCount: 26,
} as const;

const pagerButtonClassName =
  "h-7 rounded-[6px] border border-[#E2E8F0] bg-white px-2.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#0F172A] shadow-none hover:border-[#CBD5E1] hover:bg-[#F8FAFC] hover:text-[#0F172A] disabled:opacity-50";

export function PipelineWorkbenchFooter({
  shown,
  total,
  retryInterval,
  page,
  pageCount,
  onPrevious,
  onNext,
  className,
}: PipelineWorkbenchFooterProps) {
  const previousDisabled = page <= 1;
  const nextDisabled = page >= pageCount;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E8F0] bg-[#F8FAFC]/30 p-3",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[12px] leading-4 tracking-[0.01em] text-[#64748B]">
          Displaying {shown} of {total} targets in execution pipeline
        </p>
        <span
          aria-hidden="true"
          className="size-1 shrink-0 rounded-full bg-[#94A3B8]"
        />
        <p className="text-[12px] leading-4 font-medium tracking-[0.01em] text-[#047857]">
          Automatic Retry Interval: {retryInterval}
        </p>
      </div>

      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={previousDisabled}
          onClick={onPrevious}
          className={pagerButtonClassName}
        >
          Previous
        </Button>
        <span className="px-2 font-mono text-[12px] leading-4 font-semibold text-[#0F172A]">
          {page} of {pageCount}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={nextDisabled}
          onClick={onNext}
          className={pagerButtonClassName}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
