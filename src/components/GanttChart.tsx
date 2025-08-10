import React, { useMemo } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type GanttTask = {
  id: string;
  label: string;
  start: string | Date;
  end: string | Date;
  status?: "planned" | "in-progress" | "done";
  owner?: string;
  details?: string;
};

interface GanttChartProps {
  tasks: GanttTask[];
}

function daysBetween(a: Date, b: Date) {
  return Math.max(1, Math.ceil((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)));
}

export default function GanttChart({ tasks }: GanttChartProps) {
  const parsed = useMemo(() => tasks.map(t => ({
    ...t,
    s: new Date(t.start),
    e: new Date(t.end),
  })), [tasks]);

  const minDate = useMemo(() => new Date(Math.min(...parsed.map(t => t.s.getTime()))), [parsed]);
  const maxDate = useMemo(() => new Date(Math.max(...parsed.map(t => t.e.getTime()))), [parsed]);
  const totalDays = daysBetween(minDate, maxDate);

  return (
    <div className="w-full overflow-x-auto border border-border rounded-md">
      <div className="min-w-[720px]">
        {/* Header scale (weeks) */}
        <div className="grid" style={{ gridTemplateColumns: `200px repeat(${totalDays}, 1fr)` }}>
          <div className="px-3 py-2 text-sm text-muted-foreground border-b border-border">Task</div>
          {Array.from({ length: totalDays }).map((_, i) => (
            <div key={i} className="px-1 py-2 text-center text-[10px] text-muted-foreground border-b border-border">
              {new Date(minDate.getTime() + i * 86400000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </div>
          ))}
        </div>

        {/* Rows */}
        {parsed.map((t) => {
          const offset = daysBetween(minDate, t.s) - 1;
          const span = daysBetween(t.s, t.e);
          return (
            <div key={t.id} className="grid relative" style={{ gridTemplateColumns: `200px repeat(${totalDays}, 1fr)` }}>
              <div className="px-3 py-2 border-b border-border text-sm">{t.label}</div>
              {/* grid cells */}
              {Array.from({ length: totalDays }).map((_, i) => (
                <div key={i} className={cn("h-8 border-b border-border", (i % 7 === 0) && "bg-muted/30")} />
              ))}
              {/* bar */}
              <div className="absolute left-[200px] right-0 top-0 bottom-0 pointer-events-none">
                <div className="relative h-8 mt-0.5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            "absolute h-6 rounded-sm pointer-events-auto",
                            t.status === "done" && "bg-success",
                            t.status === "in-progress" && "bg-accent",
                            (!t.status || t.status === "planned") && "bg-primary/60",
                          )}
                          style={{ left: `calc(${(offset / totalDays) * 100}% + 2px)`, width: `calc(${(span / totalDays) * 100}% - 4px)` }}
                          aria-label={`${t.label} ${t.owner ? `owned by ${t.owner}` : ''}`}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-xs">
                          <div className="font-medium">{t.label}</div>
                          <div>{t.owner}</div>
                          <div>{new Date(t.start).toLocaleDateString()} → {new Date(t.end).toLocaleDateString()}</div>
                          {t.details && <p className="mt-1 text-muted-foreground max-w-xs">{t.details}</p>}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
