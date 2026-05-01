type HeroSectionProps = {
  onStart: () => void;
};

export default function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="flex items-center justify-center gap-8 px-8 py-16 bg-green-50">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold mb-6">
          Organize sua vida acadêmica e pessoal em um só lugar
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          AgendaMente é a plataforma que ajuda estudantes a gerenciar suas atividades,
          compromissos e metas com inteligência e motivação.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onStart}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Comece Agora
          </button>
          <button className="border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Saiba Mais
          </button>
        </div>
      </div>

      <div className="relative flex-shrink-0">
        <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-green-200 to-blue-300 flex items-center justify-center shadow-lg">
          <div className="text-8xl animate-bounce">🐸</div>
        </div>
        <span className="absolute top-2 right-2 bg-yellow-200 text-black px-4 py-2 rounded-full font-bold shadow-md">
          Vamos lá!
        </span>
      </div>
    </section>
  );
}
