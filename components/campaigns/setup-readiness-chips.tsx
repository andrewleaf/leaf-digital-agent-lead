import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const PROHIBITION_FILTERS_LABEL = "Prohibition Filters";
export const LOCAL_BOUNDARY_LABEL = "Local Boundary Precision";
export const WEBSITE_GATE_LABEL = "Website Verification Gate";

export type SetupReadinessChipsProps = {
  prohibitionFilters: number;
  metros: number;
  websiteGateEnabled: boolean;
  className?: string;
};

type ReadinessChip = {
  label: string;
  value: string;
  complete: boolean;
};

function chipsFromProps({
  prohibitionFilters,
  metros,
  websiteGateEnabled,
}: SetupReadinessChipsProps): ReadinessChip[] {
  return [
    {
      label: PROHIBITION_FILTERS_LABEL,
      value: `${prohibitionFilters} Active`,
      complete: prohibitionFilters > 0,
    },
    {
      label: LOCAL_BOUNDARY_LABEL,
      value: `${metros} Metros`,
      complete: metros > 0,
    },
    {
      label: WEBSITE_GATE_LABEL,
      value: websiteGateEnabled ? "Enabled" : "Off",
      complete: websiteGateEnabled,
    },
  ];
}

export function SetupReadinessChips({
  prohibitionFilters,
  metros,
  websiteGateEnabled,
  className,
}: SetupReadinessChipsProps) {
  const chips = chipsFromProps({
    prohibitionFilters,
    metros,
    websiteGateEnabled,
  });

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {chips.map((chip) => (
        <li key={chip.label}>
          <Badge
            variant="outline"
            aria-label={`${chip.label}: ${chip.value}`}
            className={cn(
              "h-5 gap-1 rounded-[4px] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em]",
              chip.complete
                ? "border-[#A7F3D0] bg-[#ECFDF5] text-[#047857]"
                : "border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]",
            )}
          >
            <span>{chip.label}</span>
            <span>{chip.value}</span>
            {chip.complete ? (
              <Check aria-hidden="true" className="size-3" />
            ) : null}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
