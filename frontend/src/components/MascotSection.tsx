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
          <div className="text-center text-8xl frog-jump">🐸</div>
          <p className="mt-4 mx-auto w-fit bg-[#eadf9f] py-2 px-6 rounded-full text-lg font-semibold text-[#2d2a1d]">Vamos continuar focados!</p>
          <div className="mt-6 bg-[#e6e6e6] h-3 rounded-full overflow-hidden">
            <div className="h-full bg-[#4f8fd9]" style={{ width: "45%" }} />
          </div>
          <p className="text-center mt-4 text-[#606670] text-base">Progresso diário: 45%</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-[#1f1b17]">Seu companheiro motivacional</h2>
          <p className="mt-6 text-[#5f6672] text-lg leading-relaxed">
            O sapinho do AgendaMente acompanha seu progresso e te motiva a alcançar suas metas. Quanto melhor seu desempenho,
            mais feliz ele fica!
          </p>
          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-lg text-[#1f1b17]">
                <span className="w-7 h-7 rounded-full bg-green-400 text-white grid place-items-center text-sm">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
