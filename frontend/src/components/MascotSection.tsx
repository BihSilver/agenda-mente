export function MascotSection() {
  return (
    <section id="motivacional" className="py-20 bg-green-50 text-center">
      <h2 className="text-3xl font-bold mb-6">Seu companheiro motivacional</h2>
      <div className="relative w-40 h-40 mx-auto mb-6">
        <div className="text-8xl animate-bounce">🐸</div>
        <div className="absolute -top-4 -right-4 bg-yellow-300 px-4 py-2 rounded-full shadow-lg">
          Vamos continuar focados!
        </div>
      </div>
      <div className="w-2/3 mx-auto bg-gray-200 h-4 rounded-full mb-4">
        <div className="bg-primary h-4 rounded-full" style={{ width: "45%" }}></div>
      </div>
      <p className="mb-6">Progresso diário: 45%</p>
      <ul className="space-y-2 text-left max-w-md mx-auto">
        <li>Animações que refletem seu desempenho</li>
        <li>Barra de progresso diária visual</li>
        <li>Mensagens motivacionais personalizadas</li>
      </ul>
    </section>
  );
}
