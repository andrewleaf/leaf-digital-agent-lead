import { ShieldAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const GUARDRAIL_EYEBROW = "Strict Guardrail Protocol";
export const GUARDRAIL_TOKEN = "RULE_01";
export const GUARDRAIL_BODY =
  "Human-in-the-Loop: LocalDraft drafts emails based strictly on verified public websites. No automated emails are ever dispatched. Every single send requires physical operator sign-off.";

export type GuardrailProtocolBannerProps = {
  className?: string;
};

export function GuardrailProtocolBanner({
  className,
}: GuardrailProtocolBannerProps) {
  return (
    <Alert
      className={cn(
        "rounded-lg border border-[#FECDD3] bg-[#FFF1F2] px-4 py-3 text-[#BE123C] shadow-none [&>svg]:text-[#BE123C]",
        className,
      )}
    >
      <ShieldAlert aria-hidden="true" />
      <AlertTitle className="line-clamp-none flex min-h-5 flex-wrap items-center gap-2 text-[12px] leading-4 font-medium tracking-[0.01em] text-[#BE123C]">
        {GUARDRAIL_EYEBROW}
        <Badge className="h-5 rounded-[4px] border border-[#FDA4AF] bg-white px-1.5 font-mono text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#BE123C]">
          {GUARDRAIL_TOKEN}
        </Badge>
      </AlertTitle>
      <AlertDescription className="text-[13px] leading-[18px] text-[#9F1239]">
        {GUARDRAIL_BODY}
      </AlertDescription>
    </Alert>
  );
}
