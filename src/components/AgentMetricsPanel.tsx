import { Target, MessageSquare, TrendingUp } from "lucide-react";
import MetricCard from "./MetricCard";
import StageEditBar from "./StageEditBar";

// Mock data - replace with real queries
const mockData = {
  alcance: {
    taxaCPC: { value: 68.3, total: 167, respondidas: 114 },
    taxaPortConf: { value: 82.5, total: 114, confirmadas: 94 },
    taxaCPFValidado: { value: 91.5, total: 94, validadas: 86 },
  },
  qualidade: {
    taxaEdicaoAvancada: { value: 23.4, total: 72, editadas: 17 },
    taxaRejeicao: { value: 4.2, total: 585, rejeitadas: 25 },
    edicaoPorEtapa: [
      { stage: "Extração Motivo", editRate: 8, total: 45, edited: 4 },
      { stage: "Negociação", editRate: 38, total: 120, edited: 46 },
      { stage: "Ag. Conf. Proposta", editRate: 12, total: 34, edited: 4 },
      { stage: "Encerramento", editRate: 5, total: 28, edited: 1 },
      { stage: "Termo Confirmação", editRate: 15, total: 20, edited: 3 },
      { stage: "Coleta Contracheque", editRate: 22, total: 18, edited: 4 },
      { stage: "Coleta Identificação", editRate: 10, total: 10, edited: 1 },
      { stage: "Coleta Conta", editRate: 6, total: 16, edited: 1 },
      { stage: "Pendente 1ª Fase", editRate: 25, total: 8, edited: 2 },
      { stage: "Finalizado", editRate: 3, total: 42, edited: 1 },
    ],
  },
  resultado: {
    taxaRetencao: { value: 56.2, total: 34, retidos: 19 },
    saldoRetido: { value: 284350.0 },
    taxaRefin: { value: 63.2, total: 19, refinanciados: 12 },
  },
};

const sectionHeaderStyles = {
  alcance: "border-l-alcance",
  qualidade: "border-l-qualidade",
  resultado: "border-l-resultado",
};

const iconBg = {
  alcance: "bg-alcance/10 text-alcance",
  qualidade: "bg-qualidade/10 text-qualidade",
  resultado: "bg-resultado/10 text-resultado",
};

const AgentMetricsPanel = () => {
  const { alcance, qualidade, resultado } = mockData;

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-card-foreground">Métricas de Qualidade do Agente</h2>
        <p className="text-sm text-muted-foreground mt-1">Visão consolidada de alcance, qualidade e resultado</p>
      </div>

      {/* ALCANCE */}
      <section className="space-y-4">
        <div className={`flex items-center gap-2 border-l-4 ${sectionHeaderStyles.alcance} pl-3`}>
          <div className={`rounded-md p-1.5 ${iconBg.alcance}`}>
            <Target className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-card-foreground uppercase tracking-wide">Alcance</h3>
          <span className="text-xs text-muted-foreground ml-1">O agente está chegando nas pessoas certas?</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            label="Taxa de CPC"
            value={`${alcance.taxaCPC.value}%`}
            subtitle={`${alcance.taxaCPC.respondidas} de ${alcance.taxaCPC.total} sessões`}
            tooltip="Sessões com pelo menos 1 resposta do cliente / total de sessões criadas"
            color="alcance"
            barPercent={alcance.taxaCPC.value}
          />
          <MetricCard
            label="Confirmação de Port."
            value={`${alcance.taxaPortConf.value}%`}
            subtitle={`${alcance.taxaPortConf.confirmadas} de ${alcance.taxaPortConf.total} respondidas`}
            tooltip="Sessões com port_conf=True / sessões com resposta"
            color="alcance"
            barPercent={alcance.taxaPortConf.value}
          />
          <MetricCard
            label="CPF Validado"
            value={`${alcance.taxaCPFValidado.value}%`}
            subtitle={`${alcance.taxaCPFValidado.validadas} de ${alcance.taxaCPFValidado.total} confirmadas`}
            tooltip="Sessões com cpf_conf=True / sessões com port_conf=True"
            color="alcance"
            barPercent={alcance.taxaCPFValidado.value}
          />
        </div>
      </section>

      {/* QUALIDADE */}
      <section className="space-y-4">
        <div className={`flex items-center gap-2 border-l-4 ${sectionHeaderStyles.qualidade} pl-3`}>
          <div className={`rounded-md p-1.5 ${iconBg.qualidade}`}>
            <MessageSquare className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-card-foreground uppercase tracking-wide">Qualidade</h3>
          <span className="text-xs text-muted-foreground ml-1">O agente está falando bem?</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricCard
            label="Edição em Conversas Avançadas"
            value={`${qualidade.taxaEdicaoAvancada.value}%`}
            subtitle={`${qualidade.taxaEdicaoAvancada.editadas} de ${qualidade.taxaEdicaoAvancada.total} sessões avançadas`}
            tooltip="Sessões avançadas (pós-CPF) com ≥1 mensagem editada / total de sessões avançadas"
            color="qualidade"
            barPercent={qualidade.taxaEdicaoAvancada.value}
          />
          <MetricCard
            label="Taxa de Rejeição"
            value={`${qualidade.taxaRejeicao.value}%`}
            subtitle={`${qualidade.taxaRejeicao.rejeitadas} de ${qualidade.taxaRejeicao.total} mensagens curadas`}
            tooltip="Mensagens rejeitadas / total de mensagens curadas"
            color="qualidade"
            barPercent={qualidade.taxaRejeicao.value}
          />
        </div>

        {/* Edição por Etapa */}
        <div className="rounded-lg border border-border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-card-foreground">Taxa de Edição por Etapa</span>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-metric-good" /> ≤15%</span>
              <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-metric-warning" /> 16-35%</span>
              <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-metric-bad" /> &gt;35%</span>
            </div>
          </div>
          <div className="space-y-2">
            {qualidade.edicaoPorEtapa
              .sort((a, b) => b.editRate - a.editRate)
              .map((item) => (
                <StageEditBar key={item.stage} {...item} />
              ))}
          </div>
        </div>
      </section>

      {/* RESULTADO */}
      <section className="space-y-4">
        <div className={`flex items-center gap-2 border-l-4 ${sectionHeaderStyles.resultado} pl-3`}>
          <div className={`rounded-md p-1.5 ${iconBg.resultado}`}>
            <TrendingUp className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-card-foreground uppercase tracking-wide">Resultado</h3>
          <span className="text-xs text-muted-foreground ml-1">O agente está retendo?</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            label="Taxa de Retenção"
            value={`${resultado.taxaRetencao.value}%`}
            subtitle={`${resultado.taxaRetencao.retidos} de ${resultado.taxaRetencao.total} negociações`}
            tooltip="Sessões retidas / sessões que chegaram à negociação"
            color="resultado"
            barPercent={resultado.taxaRetencao.value}
          />
          <MetricCard
            label="Saldo Retido"
            value={`R$ ${resultado.saldoRetido.value.toLocaleString("pt-BR")}`}
            subtitle="Volume financeiro retido no período"
            tooltip="Soma de valor_contrato dos clientes retidos"
            color="resultado"
          />
          <MetricCard
            label="Taxa de Refin"
            value={`${resultado.taxaRefin.value}%`}
            subtitle={`${resultado.taxaRefin.refinanciados} de ${resultado.taxaRefin.total} retidos`}
            tooltip="Retidos com refinanciamento / total de retidos"
            color="resultado"
            barPercent={resultado.taxaRefin.value}
          />
        </div>
      </section>
    </div>
  );
};

export default AgentMetricsPanel;
