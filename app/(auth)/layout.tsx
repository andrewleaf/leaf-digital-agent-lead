"use client";

import { useState, type ReactNode } from "react";
import {
  CalendarClock,
  Layers,
  MailCheck,
  SlidersHorizontal,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import {
  AppSidebarNav,
  type SidebarNavItem,
} from "@/components/layout/app-sidebar-nav";
import {
  HUMAN_IN_THE_LOOP_NOTICE,
  WorkspaceTopBar,
} from "@/components/layout/workspace-top-bar";

const NAV_ITEMS: SidebarNavItem[] = [
  {
    id: "campaigns",
    label: "Campaigns",
    href: "/campaigns",
    icon: Layers,
    shortcut: "⌘1",
  },
  {
    id: "review-queue",
    label: "Review Queue",
    href: "/queue",
    icon: MailCheck,
    count: 14,
    countTone: "primary",
  },
  {
    id: "follow-ups",
    label: "Follow-ups",
    href: "/follow-ups",
    icon: CalendarClock,
    count: 3,
    countTone: "neutral",
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: SlidersHorizontal,
    shortcut: "⌘,",
  },
];

const OPERATOR = {
  name: "Alex M. (Operator)",
  initials: "AM",
};

function TargetCampaignSummary() {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-2">
      <span className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B] uppercase">
        Target Campaign
      </span>
      <span className="flex items-center gap-1.5 text-[12px] leading-4 font-medium text-[#0F172A]">
        <span
          aria-hidden="true"
          className="size-1.5 shrink-0 rounded-full bg-[#0F766E]"
        />
        <span className="truncate">HVAC - Central Texas</span>
      </span>
    </div>
  );
}

function OperatorIdentity() {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="flex items-center justify-between gap-2 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#0F172A]">
        <span className="truncate">{OPERATOR.name}</span>
        <span className="flex items-center gap-1 text-[#047857]">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-[#047857]"
          />
          Ready
        </span>
      </span>
      <span className="text-[12px] leading-4 text-[#64748B]">
        Manual Send Mode Only
      </span>
    </div>
  );
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");

  return (
    <AppShell
      sidebar={
        <AppSidebarNav
          items={NAV_ITEMS}
          activeItemId="campaigns"
          version="v2.4"
          campaignSelector={<TargetCampaignSummary />}
          operator={<OperatorIdentity />}
        />
      }
      header={
        <WorkspaceTopBar
          breadcrumb={[
            { label: "Workspace", href: "/" },
            { label: "Review Desk" },
          ]}
          searchValue={search}
          onSearchChange={setSearch}
          policyNotice={HUMAN_IN_THE_LOOP_NOTICE}
          reviewedThisWeek={38}
          onNewCampaign={() => undefined}
          operator={OPERATOR}
        />
      }
    >
      {children}
    </AppShell>
  );
}
