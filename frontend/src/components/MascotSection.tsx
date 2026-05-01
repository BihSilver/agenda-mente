const highlights = [
  "Animações que refletem seu desempenho",
  "Barra de progresso diário visual",
  "Mensagens motivacionais personalizadas",
];

export function MascotSection() {
  return (
    <section id="motivacional" className="py-16 bg-[#eaf5f1]">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
        <div className="rounded-[30px] bg-[#f6f6f6] shadow-xl px-10 py-12">
          <div className="text-center text-9xl">🐸</div>
          <p className="mt-4 mx-auto w-fit bg-[#eadf9f] py-3 px-8 rounded-full text-3xl font-semibold text-[#2d2a1d]">Vamos continuar focados!</p>
          <div className="mt-6 bg-[#e6e6e6] h-4 rounded-full overflow-hidden">
            <div className="h-full bg-[#4f8fd9]" style={{ width: "45%" }} />
          </div>
          <p className="text-center mt-4 text-[#606670] text-xl">Progresso diário: 45%</p>
        </div>

        <div>
          <h2 className="text-6xl font-bold text-[#1f1b17]">Seu companheiro motivacional</h2>
          <p className="mt-6 text-[#5f6672] text-4xl leading-relaxed">
            O sapinho do AgendaMente acompanha seu progresso e te motiva a alcançar suas metas. Quanto melhor seu desempenho,
            mais feliz ele fica!
          </p>
          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-3xl text-[#1f1b17]">
                <span className="w-8 h-8 rounded-full bg-green-400 text-white grid place-items-center text-lg">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
