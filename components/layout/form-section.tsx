import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type FormSectionTone = "default" | "guardrail";

export type FormSectionProps = {
  index: number;
  title: string;
  caption?: string;
  eyebrow?: string;
  tone?: FormSectionTone;
  children: ReactNode;
  className?: string;
};

export function FormSection({
  index,
  title,
  caption,
  eyebrow,
  tone = "default",
  children,
  className,
}: FormSectionProps) {
  const isGuardrail = tone === "guardrail";

  return (
    <Card
      className={cn(
        "gap-4 rounded-lg border border-[#E2E8F0] bg-white py-0 shadow-none",
        className,
      )}
    >
      <CardHeader className="px-4 pt-4">
        <CardTitle className="flex items-start gap-2">
          <span
            aria-hidden="true"
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[12px] leading-4 font-semibold",
              isGuardrail
                ? "bg-[#FFF1F2] text-[#BE123C]"
                : "bg-[#F1F5F9] text-[#0F766E]",
            )}
          >
            {index}
          </span>
          <span className="flex flex-col gap-0.5">
            <h2 className="text-[18px] leading-6 font-semibold tracking-[-0.01em] text-[#0F172A]">
              {title}
            </h2>
            {caption ? (
              <span className="text-[12px] leading-4 font-normal text-[#64748B]">
                {caption}
              </span>
            ) : null}
          </span>
        </CardTitle>

        {eyebrow ? (
          <CardAction>
            {isGuardrail ? (
              <Badge className="h-5 rounded-[4px] border border-[#FECDD3] bg-[#FFF1F2] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#BE123C]">
                {eyebrow}
              </Badge>
            ) : (
              <span className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B] uppercase">
                {eyebrow}
              </span>
            )}
          </CardAction>
        ) : null}
      </CardHeader>

      <CardContent className="flex flex-col gap-4 px-4 pb-4">
        {children}
      </CardContent>
    </Card>
  );
}
