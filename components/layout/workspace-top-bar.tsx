"use client";

import { Fragment } from "react";
import { BadgeCheck, Plus, Search, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const SEARCH_PLACEHOLDER = "Search leads, domains, campaigns... (/)";
export const HUMAN_IN_THE_LOOP_NOTICE =
  "Strict Human-in-the-Loop • No Automated Blasts";
export const REVIEW_STAT_SUFFIX = "drafts reviewed this week";
export const NEW_CAMPAIGN_LABEL = "New Campaign";

const SEARCH_ID = "workspace-search";

export type BreadcrumbCrumb = {
  label: string;
  href?: string;
};

export type WorkspaceOperator = {
  name: string;
  initials?: string;
  imageUrl?: string;
};

export type WorkspaceTopBarProps = {
  breadcrumb: BreadcrumbCrumb[];
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  policyNotice?: string;
  reviewedThisWeek?: number;
  onNewCampaign: () => void;
  operator?: WorkspaceOperator;
  className?: string;
};

export function WorkspaceTopBar({
  breadcrumb,
  searchPlaceholder = SEARCH_PLACEHOLDER,
  searchValue,
  onSearchChange,
  policyNotice,
  reviewedThisWeek,
  onNewCampaign,
  operator,
  className,
}: WorkspaceTopBarProps) {
  return (
    <div
      className={cn(
        "flex h-full items-center justify-between gap-4 px-4",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-4">
        <Breadcrumb>
          <BreadcrumbList className="gap-1.5 text-[12px] leading-4 font-medium tracking-[0.01em] text-[#64748B] sm:gap-1.5">
            {breadcrumb.map((crumb, index) => {
              const isLast = index === breadcrumb.length - 1;

              return (
                <Fragment key={crumb.label}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="font-semibold text-[#0F172A]">
                        {crumb.label}
                      </BreadcrumbPage>
                    ) : crumb.href ? (
                      <BreadcrumbLink
                        href={crumb.href}
                        className="hover:text-[#0F172A]"
                      >
                        {crumb.label}
                      </BreadcrumbLink>
                    ) : (
                      <span>{crumb.label}</span>
                    )}
                  </BreadcrumbItem>
                  {isLast ? null : (
                    <BreadcrumbSeparator className="text-[#94A3B8]" />
                  )}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="relative flex items-center">
          <Label htmlFor={SEARCH_ID} className="sr-only">
            Search leads, domains, campaigns
          </Label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-2.5 size-4 text-[#94A3B8]"
          />
          <Input
            id={SEARCH_ID}
            type="search"
            value={searchValue}
            placeholder={searchPlaceholder}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-8 w-64 rounded-[6px] border-[#CBD5E1] bg-white pl-8 text-[13px] leading-[18px] text-[#0F172A] shadow-none placeholder:text-[#94A3B8] focus-visible:border-[#0F766E] focus-visible:ring-[2px] focus-visible:ring-[rgba(15,118,110,0.15)]"
          />
        </div>

        {policyNotice ? (
          <Badge
            variant="outline"
            className="hidden h-5 rounded-[4px] border-[#E2E8F0] bg-[#F8FAFC] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#475569] xl:inline-flex"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-[#0F766E]"
            />
            {policyNotice}
          </Badge>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        {typeof reviewedThisWeek === "number" ? (
          <p className="hidden items-center gap-1.5 text-[12px] leading-4 text-[#475569] md:flex">
            <BadgeCheck aria-hidden="true" className="size-4 text-[#0F766E]" />
            <span className="font-semibold text-[#0F172A]">
              {reviewedThisWeek}
            </span>
            <span>{REVIEW_STAT_SUFFIX}</span>
          </p>
        ) : null}

        <Button
          type="button"
          size="sm"
          onClick={onNewCampaign}
          className="h-8 rounded-[6px] bg-[#0F766E] px-3 text-[12px] leading-4 font-medium text-white shadow-none hover:bg-[#115E59]"
        >
          <Plus aria-hidden="true" className="size-4" />
          {NEW_CAMPAIGN_LABEL}
        </Button>

        {operator ? (
          <Avatar className="size-8">
            {operator.imageUrl ? (
              <AvatarImage src={operator.imageUrl} alt={operator.name} />
            ) : null}
            <AvatarFallback className="bg-[#0F766E] text-[11px] font-semibold text-white">
              {operator.initials ?? (
                <User aria-hidden="true" className="size-4" />
              )}
              <span className="sr-only">{operator.name}</span>
            </AvatarFallback>
          </Avatar>
        ) : null}
      </div>
    </div>
  );
}
