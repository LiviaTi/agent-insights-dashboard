interface StageBarProps {
  stage: string;
  editRate: number;
  total: number;
  edited: number;
}

const getBarColor = (rate: number) => {
  if (rate <= 15) return "bg-metric-good";
  if (rate <= 35) return "bg-metric-warning";
  return "bg-metric-bad";
};

const StageEditBar = ({ stage, editRate, total, edited }: StageBarProps) => {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-44 text-right text-muted-foreground truncate" title={stage}>
        {stage}
      </span>
      <div className="flex-1 h-5 rounded bg-metric-bar-bg overflow-hidden relative">
        <div
          className={`h-full rounded ${getBarColor(editRate)} transition-all duration-700`}
          style={{ width: `${editRate}%` }}
        />
      </div>
      <span className="w-14 text-right font-medium text-card-foreground">
        {editRate.toFixed(0)}%
      </span>
      <span className="w-20 text-right text-xs text-muted-foreground">
        {edited}/{total}
      </span>
    </div>
  );
};

export default StageEditBar;
