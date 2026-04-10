import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  subtitle?: string;
  tooltip: string;
  color: "alcance" | "qualidade" | "resultado";
  barPercent?: number;
}

const colorMap = {
  alcance: "bg-alcance",
  qualidade: "bg-qualidade",
  resultado: "bg-resultado",
};

const MetricCard = ({ label, value, subtitle, tooltip, color, barPercent }: MetricCardProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-3.5 w-3.5 text-muted-foreground/60 cursor-help" />
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs text-xs">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </div>
      <span className="text-2xl font-bold text-card-foreground">{value}</span>
      {barPercent !== undefined && (
        <div className="h-2 w-full rounded-full bg-metric-bar-bg overflow-hidden">
          <div
            className={`h-full rounded-full ${colorMap[color]} animate-fill-bar`}
            style={{ "--bar-width": `${barPercent}%`, width: `${barPercent}%` } as React.CSSProperties}
          />
        </div>
      )}
      {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
    </div>
  );
};

export default MetricCard;
