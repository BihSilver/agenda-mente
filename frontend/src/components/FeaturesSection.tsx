export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades Principais</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div><h3 className="font-semibold">Calendário Integrado</h3><p>Organize suas aulas, provas e compromissos pessoais.</p></div>
          <div><h3 className="font-semibold">Checklist de Atividades</h3><p>Acompanhe suas tarefas e projetos com listas intuitivas.</p></div>
          <div><h3 className="font-semibold">Lembretes Inteligentes</h3><p>Receba notificações por e-mail ou WhatsApp.</p></div>
          <div><h3 className="font-semibold">Dashboard de Desempenho</h3><p>Visualize seu progresso com gráficos motivadores.</p></div>
        </div>
      </div>
    </section>
  );
}
