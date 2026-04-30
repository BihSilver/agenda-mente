export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-2xl">🐸</span>
          </div>
          <span className="text-xl font-semibold text-primary">AgendaMente</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#funcionalidades" className="hover:text-primary">Funcionalidades</a>
          <a href="#motivacional" className="hover:text-primary">Motivacional</a>
          <a href="#sobre" className="hover:text-primary">Sobre</a>
          <a href="#contato" className="hover:text-primary">Contato</a>
        </nav>
        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all">
          Comece Agora
        </button>
      </div>
    </header>
  );
}
