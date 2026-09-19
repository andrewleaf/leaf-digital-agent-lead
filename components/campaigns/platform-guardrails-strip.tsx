import { ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type PlatformGuardrailStat = {
  id: string;
  label: string;
  value: string;
};

export type PlatformGuardrailsStripProps = {
  title?: string;
  manualLabel: string;
  stats: PlatformGuardrailStat[];
  footer: string;
  className?: string;
};

export const PLATFORM_GUARDRAILS_TITLE = "Platform Guardrails";
export const PLATFORM_GUARDRAILS_MANUAL_LABEL = "100% Manual";
export const PLATFORM_GUARDRAILS_FOOTER =
  "Zero automated blasts. Every message is individually dispatched via operator native mail clients.";

export const PLATFORM_GUARDRAILS_MOCK: Omit<
  PlatformGuardrailsStripProps,
  "className"
> = {
  title: PLATFORM_GUARDRAILS_TITLE,
  manualLabel: PLATFORM_GUARDRAILS_MANUAL_LABEL,
  stats: [
    {
      id: "cliches",
      label: "Forbidden Clichés Auto-Stripped",
      value: "23 intercepted",
    },
    {
      id: "claims",
      label: "Unverified Claims Blocked",
      value: "4 blocked",
    },
    {
      id: "smtp",
      label: "Background SMTP Daemons",
      value: "0 (Permanently Disabled)",
    },
  ],
  footer: PLATFORM_GUARDRAILS_FOOTER,
};

function statValueClass(value: string) {
  if (value.includes("Permanently Disabled")) {
    return "text-[#047857]";
  }
  if (value.includes("intercepted") || value.includes("blocked")) {
    return "text-[#E11D48]";
  }
  return "text-[#0F172A]";
}

export function PlatformGuardrailsStrip({
  title = PLATFORM_GUARDRAILS_TITLE,
  manualLabel,
  stats,
  footer,
  className,
}: PlatformGuardrailsStripProps) {
  return (
    <Card
      className={cn(
        "gap-3 rounded-[8px] border border-[#E2E8F0] bg-white py-0 shadow-none",
        className,
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2 px-4 pt-3 pb-0">
        <CardTitle className="text-[15px] leading-5 font-semibold text-[#0F172A]">
          {title}
        </CardTitle>
        <Badge className="h-5 rounded-[4px] border border-[#A7F3D0] bg-[#ECFDF5] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#047857]">
          {manualLabel}
        </Badge>
      </CardHeader>
      <CardContent className="px-4">
        {stats.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col gap-0.5">
                <p className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B] uppercase">
                  {stat.label}
                </p>
                <p
                  className={cn(
                    "text-[13px] leading-[18px] font-semibold",
                    statValueClass(stat.value),
                  )}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="px-4 pb-3">
        <p className="inline-flex items-start gap-1.5 text-[12px] leading-4 text-[#475569]">
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 size-[15px] shrink-0 text-[#047857]"
          />
          {footer}
        </p>
      </CardFooter>
    </Card>
  );
}
