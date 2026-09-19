"use client";

import { Ban, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const NEGATIVE_CONSTRAINTS_EYEBROW = "Strict Prohibition";
export const NEGATIVE_CONSTRAINTS_PROMPT =
  "Specify exact details, buzzwords, or misleading claims that LocalDraft MUST NOT invent or hallucinate under any circumstance:";
export const NEGATIVE_CONSTRAINTS_PLACEHOLDER = "Add a prohibited claim...";

export type NegativeConstraint = {
  id: string;
  label: string;
};

export type NegativeConstraintsInputProps = {
  constraints: NegativeConstraint[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onAdd: (label: string) => void;
  onRemove: (id: string) => void;
  caption?: string | null;
  disabled?: boolean;
  className?: string;
};

const INPUT_ID = "negative-constraints-input";

export function NegativeConstraintsInput({
  constraints,
  inputValue,
  onInputChange,
  onAdd,
  onRemove,
  caption,
  disabled = false,
  className,
}: NegativeConstraintsInputProps) {
  function submitAdd() {
    const next = inputValue.trim();
    if (!next) {
      return;
    }
    const duplicate = constraints.some(
      (constraint) => constraint.label.toLowerCase() === next.toLowerCase(),
    );
    if (duplicate) {
      return;
    }
    onAdd(next);
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#E11D48]">
        {NEGATIVE_CONSTRAINTS_EYEBROW}
      </p>

      {caption ? (
        <p className="text-[12px] leading-4 font-medium tracking-[0.01em] text-[#64748B]">
          {caption}
        </p>
      ) : null}

      <Label
        htmlFor={INPUT_ID}
        className="block text-[13px] leading-[18px] font-normal text-[#475569]"
      >
        {NEGATIVE_CONSTRAINTS_PROMPT}
      </Label>

      <div className="flex min-h-9 flex-wrap items-center gap-1.5 rounded-[6px] border border-[#CBD5E1] bg-white px-2 py-1 focus-within:border-[#0F766E] focus-within:ring-[2px] focus-within:ring-[rgba(15,118,110,0.15)]">
        {constraints.map((constraint) => (
          <Badge
            key={constraint.id}
            variant="outline"
            className="h-5 gap-1 rounded-[4px] border-[#FECDD3] bg-[#FFF1F2] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#BE123C]"
          >
            <Ban aria-hidden="true" className="size-3 text-[#E11D48]" />
            {constraint.label}
            <button
              type="button"
              className="inline-flex size-3.5 items-center justify-center rounded-[2px] text-[#BE123C] hover:text-[#9F1239] disabled:opacity-50"
              aria-label={`Remove ${constraint.label}`}
              disabled={disabled}
              onClick={() => onRemove(constraint.id)}
            >
              <X aria-hidden="true" className="size-3" />
            </button>
          </Badge>
        ))}
        <Input
          id={INPUT_ID}
          value={inputValue}
          disabled={disabled}
          placeholder={NEGATIVE_CONSTRAINTS_PLACEHOLDER}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") {
              return;
            }
            event.preventDefault();
            submitAdd();
          }}
          className="h-8 min-w-[14rem] flex-1 border-0 bg-transparent px-1 text-[13px] leading-[18px] shadow-none placeholder:text-[#94A3B8] focus-visible:border-0 focus-visible:ring-0"
        />
      </div>
    </div>
  );
}
