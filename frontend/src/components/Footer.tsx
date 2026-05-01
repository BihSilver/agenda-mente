export function Footer() {
  return (
    <footer id="footer" className="bg-[#2b211d] text-white py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 text-2xl font-bold"><span>🐸</span>AgendaMente</div>
            <p className="mt-5 text-[#afbbce] text-2xl leading-relaxed">Organize sua vida acadêmica e pessoal em um só lugar.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-2xl">Produto</h4>
            <p className="text-[#afbbce] text-2xl">Funcionalidades</p><p className="text-[#afbbce] text-2xl mt-2">Planos</p><p className="text-[#afbbce] text-2xl mt-2">Aplicativo</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-2xl">Empresa</h4>
            <p className="text-[#afbbce] text-2xl">Sobre Nós</p><p className="text-[#afbbce] text-2xl mt-2">Contato</p><p className="text-[#afbbce] text-2xl mt-2">Blog</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-2xl">Legal</h4>
            <p className="text-[#afbbce] text-2xl">Termos de Uso</p><p className="text-[#afbbce] text-2xl mt-2">Política de Privacidade</p><p className="text-[#afbbce] text-2xl mt-2">Cookies</p>
          </div>
        </div>

        <div className="mt-12 border-t border-[#4e4640] pt-8 text-center text-[#afbbce] text-2xl">© 2026 AgendaMente. Todos os direitos reservados.</div>
      </div>
    </footer>
  );
}
