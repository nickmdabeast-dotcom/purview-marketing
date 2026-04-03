import { Check } from "lucide-react";

export function DashboardMockup() {
  return (
    <div className="dashboard-mockup relative w-full max-w-md mx-auto lg:max-w-none aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden lg:translate-x-4">
      {/* Window chrome */}
      <div className="h-10 border-b border-border-dark/50 bg-surface/50 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-border-dark" />
        <div className="w-3 h-3 rounded-full bg-border-dark" />
        <div className="w-3 h-3 rounded-full bg-border-dark" />
      </div>

      <div className="flex h-[calc(100%-40px)]">
        {/* Sidebar */}
        <div className="w-16 md:w-44 border-r border-border-dark/50 bg-surface/30 p-4 hidden sm:flex flex-col gap-3">
          <div className="h-2.5 w-20 bg-surface-elevated rounded" />
          <div className="h-2.5 w-12 bg-surface-elevated rounded mt-3" />
          <div className="h-2.5 w-16 bg-surface-elevated rounded" />
          <div className="h-2.5 w-full bg-primary/30 rounded border border-primary/40" />
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 relative flex flex-col">
          {/* Compliance score header */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="text-[10px] sm:text-xs font-mono text-text-muted uppercase mb-1 tracking-wider">
                Overall Compliance
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold gradient-text-blue">
                47%
              </div>
            </div>

            {/* Circular progress */}
            <div className="relative w-14 h-14 sm:w-18 sm:h-18">
              <svg
                className="w-full h-full -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-surface-elevated"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-primary"
                  strokeDasharray="47, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-primary">
                47
              </div>
            </div>
          </div>

          {/* State badges */}
          <div className="text-xs sm:text-sm font-bold mb-3 text-text-main">
            Applicable States Found
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {["CA", "VA"].map((state) => (
              <div
                key={state}
                className="px-2 py-1 rounded-md bg-primary/20 border border-primary/50 text-primary text-xs font-mono flex items-center gap-1.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {state}
              </div>
            ))}
            <div className="px-2 py-1 rounded-md bg-surface-elevated/80 border border-border-dark text-text-muted text-xs font-mono">
              CO
            </div>
            <div className="px-2 py-1 rounded-md bg-surface-elevated/80 border border-border-dark text-text-muted text-xs font-mono">
              +9 more
            </div>
          </div>

          {/* Priority actions */}
          <div className="text-xs sm:text-sm font-bold mb-3 text-text-main">
            Priority Actions
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="bg-surface-elevated/60 border border-border-dark/60 rounded-lg p-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border border-border-dark bg-bg" />
                <div className="h-2.5 w-24 bg-text-muted/20 rounded" />
              </div>
              <div className="h-5 px-2 bg-risk-red/20 border border-risk-red/40 rounded text-[10px] text-risk-red font-mono flex items-center">
                High Risk
              </div>
            </div>
            <div className="bg-surface-elevated/60 border border-border-dark/60 rounded-lg p-3 flex justify-between items-center opacity-60">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded border border-success bg-success/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-success" />
                </div>
                <div className="h-2.5 w-20 bg-text-muted/20 rounded line-through" />
              </div>
              <div className="h-5 px-2 bg-success/20 border border-success/40 rounded text-[10px] text-success font-mono flex items-center">
                Done
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
