import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const BRAND_NAME = "LocalDraft";
export const BRAND_EYEBROW = "Operator Core";

export type SidebarNavItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  shortcut?: string;
  count?: number;
  countTone?: "primary" | "neutral";
};

export type AppSidebarNavProps = {
  items: SidebarNavItem[];
  activeItemId: string;
  version: string;
  campaignSelector?: ReactNode;
  operator?: ReactNode;
  className?: string;
};

export function AppSidebarNav({
  items,
  activeItemId,
  version,
  campaignSelector,
  operator,
  className,
}: AppSidebarNavProps) {
  const hasFooter = Boolean(campaignSelector || operator);

  return (
    <div
      className={cn("flex h-full w-full flex-col justify-between", className)}
    >
      <div className="flex flex-col">
        <div className="flex h-14 items-center justify-between border-b border-[#F1F5F9] px-4">
          <div className="flex flex-col">
            <span className="text-[15px] leading-5 font-semibold text-[#0F172A]">
              {BRAND_NAME}
            </span>
            <span className="text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B] uppercase">
              {BRAND_EYEBROW}
            </span>
          </div>
          <Badge
            variant="outline"
            className="h-5 rounded-[4px] border-[#E2E8F0] bg-[#F8FAFC] px-1.5 font-mono text-[11px] leading-[14px] font-semibold tracking-[0.02em] text-[#64748B]"
          >
            {version}
          </Badge>
        </div>

        <nav aria-label="Workspace" className="flex flex-col gap-1 p-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeItemId;

            return (
              <Button
                key={item.id}
                asChild
                variant="ghost"
                size="sm"
                className={cn(
                  "h-9 w-full justify-between rounded-[6px] px-3 text-[13px] leading-[18px] font-normal text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]",
                  isActive &&
                    "bg-[#0F766E] font-semibold text-white hover:bg-[#115E59] hover:text-white",
                )}
              >
                <a
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="flex items-center gap-3">
                    <Icon aria-hidden="true" className="size-[18px]" />
                    {item.label}
                  </span>

                  {typeof item.count === "number" ? (
                    <Badge
                      className={cn(
                        "h-5 rounded-[4px] px-1.5 text-[11px] leading-[14px] font-semibold tracking-[0.02em]",
                        item.countTone === "primary"
                          ? "border border-transparent bg-[#0F766E] text-white"
                          : "border border-[#E2E8F0] bg-[#F1F5F9] text-[#475569]",
                        isActive &&
                          item.countTone === "primary" &&
                          "border-transparent bg-white/20 text-white",
                      )}
                    >
                      {item.count}
                    </Badge>
                  ) : item.shortcut ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-mono text-[12px] leading-4 text-[#64748B]",
                        isActive && "text-white/80",
                      )}
                    >
                      {item.shortcut}
                    </span>
                  ) : null}
                </a>
              </Button>
            );
          })}
        </nav>
      </div>

      {hasFooter ? (
        <div>
          <Separator className="bg-[#F1F5F9]" />
          <div className="flex flex-col gap-3 bg-[#F8FAFC] p-3">
            {campaignSelector ? (
              <div className="min-w-0 truncate">{campaignSelector}</div>
            ) : null}
            {operator ? (
              <div className="min-w-0 truncate">{operator}</div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
