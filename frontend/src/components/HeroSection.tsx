export default function Hero() {
  return (
    <section className="flex items-center justify-between px-12 py-20 bg-white">
      {/* Texto à esquerda */}
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold mb-6">
          Organize sua vida acadêmica e pessoal em um só lugar
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          AgendaMente é a plataforma que ajuda estudantes a gerenciar suas atividades,
          compromissos e metas com inteligência e motivação.
        </p>
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Comece Agora
          </button>
          <button className="border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Saiba Mais
          </button>
        </div>
      </div>

      {/* Ilustração à direita */}
      <div className="relative">
        <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-green-400 to-yellow-300 flex items-center justify-center">
          {/* Aqui entra o sapinho */}
          <img src="/frog.png" alt="Mascote AgendaMente" className="w-40 h-40" />
        </div>
        <span className="absolute top-0 right-0 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold shadow-md">
          Vamos lá!
        </span>
      </div>
    </section>
  );
}
