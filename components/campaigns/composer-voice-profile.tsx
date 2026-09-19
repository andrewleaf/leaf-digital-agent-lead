"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export const COMPOSER_VOICE_LABEL = "Composer Voice Profile";
export const COMPOSER_VOICE_SELECTED_MARKER = "Selected";

export const VOICE_PROFILES = [
  { value: "helpful-direct", label: "Helpful & Direct" },
  { value: "peer-collegial", label: "Peer-to-Peer Collegial" },
  { value: "concise-technical", label: "Concise Technical" },
  { value: "audit-led", label: "Audit-led Gentle Inquiry" },
  { value: "conversational", label: "Conversational" },
] as const;

export type ComposerVoiceProfileProps = {
  value: string | null;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

const LABEL_ID = "composer-voice-profile-label";

export function ComposerVoiceProfile({
  value,
  onValueChange,
  disabled = false,
  className,
}: ComposerVoiceProfileProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label
        id={LABEL_ID}
        className="text-[12px] leading-4 font-medium tracking-[0.01em] text-[#0F172A]"
      >
        {COMPOSER_VOICE_LABEL}
      </Label>

      <ToggleGroup
        type="single"
        value={value ?? ""}
        disabled={disabled}
        spacing={2}
        aria-labelledby={LABEL_ID}
        onValueChange={(next) => {
          if (!next) {
            return;
          }
          onValueChange(next);
        }}
        className="flex-wrap"
      >
        {VOICE_PROFILES.map((profile) => (
          <ToggleGroupItem
            key={profile.value}
            value={profile.value}
            className="h-8 gap-1.5 rounded-[6px] border border-[#E2E8F0] bg-white px-2.5 text-[12px] leading-4 font-medium tracking-[0.01em] text-[#0F172A] shadow-none hover:border-[#CBD5E1] hover:bg-[#F8FAFC] hover:text-[#0F172A] data-[state=on]:border-[#0F766E] data-[state=on]:bg-[#0F766E] data-[state=on]:text-white"
          >
            {profile.label}
            {value === profile.value ? (
              <Badge className="h-5 rounded-[4px] border border-transparent bg-white/20 px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-white">
                {COMPOSER_VOICE_SELECTED_MARKER}
              </Badge>
            ) : null}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
