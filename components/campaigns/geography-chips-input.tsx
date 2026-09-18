"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type GeographyChip = {
  id: string;
  label: string;
};

export type GeographyChipsInputProps = {
  geographies: GeographyChip[];
  regionCaption?: string | null;
  inputValue: string;
  onInputChange: (value: string) => void;
  onAdd: (label: string) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
  className?: string;
};

const INPUT_ID = "geography-chips-input";

export function GeographyChipsInput({
  geographies,
  regionCaption,
  inputValue,
  onInputChange,
  onAdd,
  onRemove,
  disabled = false,
  className,
}: GeographyChipsInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [composerOpen, setComposerOpen] = useState(false);
  const showInput = composerOpen || inputValue.length > 0;

  useEffect(() => {
    if (!showInput) {
      return;
    }
    inputRef.current?.focus();
  }, [showInput]);

  function submitAdd() {
    const next = inputValue.trim();
    if (!next) {
      return;
    }
    onAdd(next);
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <Label
          htmlFor={INPUT_ID}
          className="text-[12px] leading-4 font-medium tracking-[0.01em] text-[#0F172A]"
        >
          Target Geographies
        </Label>
        {regionCaption ? (
          <p className="text-[12px] leading-4 font-medium tracking-[0.01em] text-[#475569]">
            {regionCaption}
          </p>
        ) : null}
      </div>

      <div className="flex min-h-9 flex-wrap items-center gap-1.5 rounded-[6px] border border-[#CBD5E1] bg-white px-2 py-1 focus-within:border-[#0F766E] focus-within:ring-[2px] focus-within:ring-[rgba(15,118,110,0.15)]">
        {geographies.map((geography) => (
          <Badge
            key={geography.id}
            variant="outline"
            className="h-5 gap-1 rounded-[4px] border-[#E2E8F0] bg-[#F8FAFC] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#0F172A]"
          >
            <MapPin aria-hidden="true" className="size-3 text-[#0F766E]" />
            {geography.label}
            <button
              type="button"
              className="inline-flex size-3.5 items-center justify-center rounded-[2px] text-[#64748B] hover:text-[#0F172A] disabled:opacity-50"
              aria-label={`Remove ${geography.label}`}
              disabled={disabled}
              onClick={() => onRemove(geography.id)}
            >
              <X aria-hidden="true" className="size-3" />
            </button>
          </Badge>
        ))}
        <Input
          ref={inputRef}
          id={INPUT_ID}
          value={inputValue}
          disabled={disabled}
          placeholder="Add city/county"
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") {
              return;
            }
            event.preventDefault();
            submitAdd();
          }}
          className={cn(
            "h-8 min-w-[12rem] flex-1 border-0 bg-transparent px-1 text-[13px] leading-[18px] shadow-none placeholder:text-[#94A3B8] focus-visible:border-0 focus-visible:ring-0",
            !showInput && "pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0",
          )}
        />
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={() => {
          setComposerOpen(true);
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
        className="h-8 w-fit rounded-[6px] border-[#E2E8F0] bg-white px-2.5 text-[12px] leading-4 font-medium text-[#0F172A] shadow-none hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
      >
        Add city/county
      </Button>
    </div>
  );
}
