import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const SIDEBAR_WIDTH_CLASS = "w-64";
export const HEADER_HEIGHT_CLASS = "h-14";

export type AppShellProps = {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
  className?: string;
};

export function AppShell({
  sidebar,
  header,
  children,
  className,
}: AppShellProps) {
  return (
    <div className={cn("min-h-screen bg-[#F8FAFC]", className)}>
      <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between border-r border-[#E2E8F0] bg-white select-none">
        {sidebar}
      </aside>

      <div className="flex min-h-screen flex-col pl-64">
        <header className="fixed top-0 right-0 left-64 z-40 h-14 border-b border-[#E2E8F0] bg-white/90 backdrop-blur-md">
          {header}
        </header>

        <main className="relative w-full flex-1 px-4 pt-14 pb-4">
          {children}
        </main>
      </div>
    </div>
  );
}
