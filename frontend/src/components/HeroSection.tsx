export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/20 py-20 md:py-32" id="home">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-4">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Organize sua vida acadêmica e pessoal em um só lugar
          </h1>
          <p className="text-xl text-gray-600">
            AgendaMente é a plataforma que ajuda estudantes a gerenciar suas atividades,
            compromissos e metas com inteligência e motivação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-all shadow-lg">
              Comece Agora
            </button>
            <button className="bg-white text-gray-800 px-8 py-4 rounded-lg border hover:bg-gray-50 transition-all">
              Saiba Mais
            </button>
          </div>
        </div>
        <div className="flex justify-center relative">
          <div className="w-80 h-80 bg-gradient-to-br from-secondary to-primary/40 rounded-full flex items-center justify-center shadow-2xl">
            <div className="text-9xl animate-bounce">🐸</div>
            <div className="absolute -top-4 -right-4 bg-yellow-300 px-4 py-2 rounded-full shadow-lg">
              Vamos lá!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
