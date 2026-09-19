import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type PageHeaderProps = {
  title: string;
  badge?: string;
  description?: string;
  specToken?: string;
  phase?: string;
  meta?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  badge,
  description,
  specToken,
  phase,
  meta,
  className,
}: PageHeaderProps) {
  const hasStrip = Boolean(specToken || phase || meta);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {hasStrip ? (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {specToken ? (
              <Badge
                variant="outline"
                className="h-5 rounded-[4px] border-[#E2E8F0] bg-[#F1F5F9] px-1.5 font-mono text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B]"
              >
                {specToken}
              </Badge>
            ) : null}
            {specToken && phase ? (
              <span aria-hidden="true" className="text-[12px] text-[#94A3B8]">
                /
              </span>
            ) : null}
            {phase ? (
              <span className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#0F766E] uppercase">
                {phase}
              </span>
            ) : null}
          </div>
          {meta ? <div className="min-w-0">{meta}</div> : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-[28px] leading-9 font-semibold tracking-[-0.02em] text-[#0F172A]">
            {title}
          </h1>
          {badge ? (
            <Badge
              variant="outline"
              className="h-5 rounded-[4px] border-[#E2E8F0] bg-[#F1F5F9] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#475569]"
            >
              {badge}
            </Badge>
          ) : null}
        </div>
        {description ? (
          <p className="max-w-3xl text-[15px] leading-[22px] text-[#475569]">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
