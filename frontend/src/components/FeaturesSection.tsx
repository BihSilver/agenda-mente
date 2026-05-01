const cards = [
  {
    icon: "📅",
    title: "Calendário Integrado",
    description: "Organize suas aulas, provas e compromissos pessoais em um calendário inteligente.",
  },
  {
    icon: "✅",
    title: "Checklist de Atividades",
    description: "Acompanhe suas tarefas e projetos com listas organizadas e intuitivas.",
  },
  {
    icon: "🔔",
    title: "Lembretes Inteligentes",
    description: "Receba notificações por push, e-mail ou WhatsApp para nunca perder um prazo.",
  },
  {
    icon: "📊",
    title: "Dashboard de Desempenho",
    description: "Visualize seu progresso com gráficos e estatísticas motivadoras.",
  },
];

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="py-20 bg-[#f8f8fa]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center text-[#1f1b17]">Funcionalidades Principais</h2>
        <p className="text-center text-[#667085] text-2xl mt-6 max-w-3xl mx-auto">
          Tudo que você precisa para manter sua vida acadêmica organizada e produtiva
        </p>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-20">
          {cards.map((card) => (
            <article key={card.title} className="bg-[#f5f5f8] border border-[#d8d9dd] rounded-3xl p-6 min-h-72">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/85 grid place-items-center text-3xl">{card.icon}</div>
              <h3 className="mt-6 text-4xl font-semibold text-[#161616]">{card.title}</h3>
              <p className="mt-4 text-[#5d6470] text-2xl leading-relaxed">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
