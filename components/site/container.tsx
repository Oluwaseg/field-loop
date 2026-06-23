import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container-x mx-auto w-full max-w-7xl ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-leaf-100 bg-leaf-50/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-leaf-700">
      <span className="size-1.5 rounded-full bg-leaf-600" />
      {children}
    </span>
  );
}