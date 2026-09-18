"use client";

import { Store, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type NicheChip = {
  id: string;
  label: string;
};

export type IndustryNicheInputProps = {
  niches: NicheChip[];
  naicsVerified: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
  onAdd: (label: string) => void;
  onRemove: (id: string) => void;
  onPresetSelect: (vertical: string) => void;
  disabled?: boolean;
  className?: string;
};

export const QUICK_PRESETS = [
  { label: "+ Plumbers", vertical: "Plumbers" },
  { label: "+ Auto Repair", vertical: "Auto Repair" },
  { label: "+ Roofing", vertical: "Roofing" },
  { label: "+ Dental Clinics", vertical: "Dental Clinics" },
] as const;

const INPUT_ID = "industry-niche-input";

function nicheAlreadySelected(niches: NicheChip[], vertical: string) {
  return niches.some(
    (niche) => niche.label.toLowerCase() === vertical.toLowerCase(),
  );
}

export function IndustryNicheInput({
  niches,
  naicsVerified,
  inputValue,
  onInputChange,
  onAdd,
  onRemove,
  onPresetSelect,
  disabled = false,
  className,
}: IndustryNicheInputProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label
          htmlFor={INPUT_ID}
          className="text-[12px] leading-4 font-medium tracking-[0.01em] text-[#0F172A]"
        >
          Primary Industry / Niche Category
        </Label>
        {naicsVerified ? (
          <Badge className="h-5 rounded-[4px] border border-[#A7F3D0] bg-[#ECFDF5] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#047857]">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-[#047857]"
            />
            NAICS verified match
          </Badge>
        ) : null}
      </div>

      <div className="flex min-h-9 flex-wrap items-center gap-1.5 rounded-[6px] border border-[#CBD5E1] bg-white px-2 py-1 focus-within:border-[#0F766E] focus-within:ring-[2px] focus-within:ring-[rgba(15,118,110,0.15)]">
        {niches.map((niche) => (
          <Badge
            key={niche.id}
            variant="outline"
            className="h-5 gap-1 rounded-[4px] border-[#E2E8F0] bg-[#F8FAFC] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#0F172A]"
          >
            <Store aria-hidden="true" className="size-3 text-[#0F766E]" />
            {niche.label}
            <button
              type="button"
              className="inline-flex size-3.5 items-center justify-center rounded-[2px] text-[#64748B] hover:text-[#0F172A] disabled:opacity-50"
              aria-label={`Remove ${niche.label}`}
              disabled={disabled}
              onClick={() => onRemove(niche.id)}
            >
              <X aria-hidden="true" className="size-3" />
            </button>
          </Badge>
        ))}
        <Input
          id={INPUT_ID}
          value={inputValue}
          disabled={disabled}
          placeholder="Type to add secondary niche..."
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") {
              return;
            }
            event.preventDefault();
            const next = inputValue.trim();
            if (!next) {
              return;
            }
            onAdd(next);
          }}
          className="h-8 min-w-[12rem] flex-1 border-0 bg-transparent px-1 text-[13px] leading-[18px] shadow-none placeholder:text-[#94A3B8] focus-visible:border-0 focus-visible:ring-0"
        />
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B]">
          Quick Presets:
        </span>
        {QUICK_PRESETS.map((preset) => {
          const alreadySelected = nicheAlreadySelected(niches, preset.vertical);
          return (
            <Button
              key={preset.vertical}
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled || alreadySelected}
              onClick={() => onPresetSelect(preset.vertical)}
              className="h-8 rounded-[6px] border-[#E2E8F0] bg-white px-2.5 text-[12px] leading-4 font-medium text-[#0F172A] shadow-none hover:bg-[#F8FAFC] hover:border-[#CBD5E1]"
            >
              {preset.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
