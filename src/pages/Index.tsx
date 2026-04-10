import AgentMetricsPanel from "@/components/AgentMetricsPanel";
import { TooltipProvider } from "@/components/ui/tooltip";

const Index = () => {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-6 flex items-start justify-center">
        <div className="w-full max-w-5xl">
          <AgentMetricsPanel />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Index;
