"use client";

import { useState } from "react";

import { CallToActionField } from "@/components/campaigns/call-to-action-field";
import { CampaignSetupStatusBar } from "@/components/campaigns/campaign-setup-status-bar";
import { ComposerVoiceProfile } from "@/components/campaigns/composer-voice-profile";
import { DiscoveryYieldCard } from "@/components/campaigns/discovery-yield-card";
import { GeographyChipsInput } from "@/components/campaigns/geography-chips-input";
import { GuardrailProtocolBanner } from "@/components/campaigns/guardrail-protocol-banner";
import { IndustryNicheInput } from "@/components/campaigns/industry-niche-input";
import { NegativeConstraintsInput } from "@/components/campaigns/negative-constraints-input";
import { ValuePropositionField } from "@/components/campaigns/value-proposition-field";
import { FormSection } from "@/components/layout/form-section";
import { PageHeader } from "@/components/shared/page-header";

const MOCK = {
  campaigns: [{ id: "hvac-central-texas", label: "HVAC - Central Texas" }],
  autosavedAt: "14:02 UTC",
  niches: [{ id: "hvac-contractors", label: "HVAC Contractors" }],
  regionCaption: "Austin Metropolitan Area",
  geographies: [
    { id: "austin", label: "Austin, TX" },
    { id: "round-rock", label: "Round Rock, TX" },
    { id: "cedar-park", label: "Cedar Park, TX" },
  ],
  valueProposition:
    "Website conversion review and mobile booking-flow recommendations",
  callToAction:
    "Ask whether they would like a short 3-minute video review of their booking flow",
  voiceProfile: "helpful-direct",
  constraints: [
    { id: "revenue", label: "Do not claim guaranteed revenue improvements" },
    {
      id: "relationship",
      label: "Do not imply past relationship or acquaintance",
    },
    { id: "pricing", label: "Do not cite pricing or competitor comparisons" },
  ],
  discoveryEstimate: "~120-140 local businesses",
  discoveryConfidence: 94,
};

/** Placeholder for a Stitch port whose widget story has not been built yet. */
function PendingPort({ storyId }: { storyId: string }) {
  return (
    <p className="rounded-lg border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-3 py-4 text-[12px] leading-4 text-[#64748B]">
      Pending story: <span className="font-mono">{storyId}</span>
    </p>
  );
}

export default function NewCampaignPage() {
  const [selectedCampaignId, setSelectedCampaignId] = useState(
    MOCK.campaigns[0].id,
  );
  const [niches, setNiches] = useState(MOCK.niches);
  const [nicheInput, setNicheInput] = useState("");
  const [geographies, setGeographies] = useState(MOCK.geographies);
  const [geographyInput, setGeographyInput] = useState("");
  const [valueProposition, setValueProposition] = useState(
    MOCK.valueProposition,
  );
  const [callToAction, setCallToAction] = useState(MOCK.callToAction);
  const [voiceProfile, setVoiceProfile] = useState<string | null>(
    MOCK.voiceProfile,
  );
  const [constraints, setConstraints] = useState(MOCK.constraints);
  const [constraintInput, setConstraintInput] = useState("");

  return (
    <div className="flex w-full flex-col gap-6 pt-4">
      <PageHeader
        title="Create Targeted Campaign"
        badge="Guided Setup"
        description="Define your local search perimeter, research parameters, and offer boundaries. LocalDraft will find public websites and extract verified facts before drafting."
        specToken="CAMPAIGN_SPEC_v2.4"
        phase="New Perimeter Setup"
        meta={
          <CampaignSetupStatusBar
            campaigns={MOCK.campaigns}
            selectedCampaignId={selectedCampaignId}
            onCampaignChange={setSelectedCampaignId}
            engineStatus="Active"
            autosavedAt={MOCK.autosavedAt}
          />
        }
      />

      <GuardrailProtocolBanner />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <form
          className="flex flex-col gap-6 lg:col-span-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <FormSection
            index={1}
            title="Target Business & Location"
            eyebrow="Search Perimeter"
          >
            <IndustryNicheInput
              niches={niches}
              naicsVerified
              inputValue={nicheInput}
              onInputChange={setNicheInput}
              onAdd={(label) => {
                setNiches((current) => [
                  ...current,
                  { id: label.toLowerCase(), label },
                ]);
                setNicheInput("");
              }}
              onRemove={(id) =>
                setNiches((current) =>
                  current.filter((niche) => niche.id !== id),
                )
              }
              onPresetSelect={(vertical) =>
                setNiches((current) => [
                  ...current,
                  { id: vertical.toLowerCase(), label: vertical },
                ])
              }
            />
            <GeographyChipsInput
              geographies={geographies}
              regionCaption={MOCK.regionCaption}
              inputValue={geographyInput}
              onInputChange={setGeographyInput}
              onAdd={(label) => {
                setGeographies((current) => [
                  ...current,
                  { id: label.toLowerCase(), label },
                ]);
                setGeographyInput("");
              }}
              onRemove={(id) =>
                setGeographies((current) =>
                  current.filter((geography) => geography.id !== id),
                )
              }
            />
          </FormSection>

          {/* ValuePropositionField already renders the Editorial Tone eyebrow. */}
          <FormSection index={2} title="Proposition & Review Intent">
            <ValuePropositionField
              value={valueProposition}
              onChange={setValueProposition}
            />
            <CallToActionField
              value={callToAction}
              onChange={setCallToAction}
            />
            <ComposerVoiceProfile
              value={voiceProfile}
              onValueChange={setVoiceProfile}
            />
          </FormSection>

          {/* NegativeConstraintsInput already renders the Strict Prohibition eyebrow. */}
          <FormSection
            index={3}
            title="Negative Constraints & Guardrails"
            caption="Crucial safety & brand reputation boundary conditions"
            tone="guardrail"
          >
            <NegativeConstraintsInput
              constraints={constraints}
              inputValue={constraintInput}
              onInputChange={setConstraintInput}
              onAdd={(label) => {
                setConstraints((current) => [
                  ...current,
                  { id: label.toLowerCase(), label },
                ]);
                setConstraintInput("");
              }}
              onRemove={(id) =>
                setConstraints((current) =>
                  current.filter((constraint) => constraint.id !== id),
                )
              }
            />
          </FormSection>

          <FormSection
            index={4}
            title="Research Depth & Verification Settings"
            eyebrow="Fact Engine"
          >
            <PendingPort storyId="research-depth-settings-2026-09-18" />
          </FormSection>

          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4">
            <PendingPort storyId="campaign-setup-actions-2026-09-18" />
          </div>

          <p className="text-center text-[12px] leading-4 text-[#64748B]">
            Discovery will populate the 6-stage pipeline. Every draft requires
            your manual review and approval.
          </p>
        </form>

        <aside className="flex flex-col gap-4 lg:col-span-4">
          <DiscoveryYieldCard
            estimateLabel={MOCK.discoveryEstimate}
            confidence={MOCK.discoveryConfidence}
          />
          <PendingPort storyId="setup-readiness-chips-2026-09-18" />
          <PendingPort storyId="pipeline-sequence-rail-2026-09-18" />
        </aside>
      </div>
    </div>
  );
}
