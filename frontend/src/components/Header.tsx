import Link from "next/link";

type HeaderProps = {
  onStart: () => void;
};

export function Header({ onStart }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-2xl">🐸</span>
          </div>
          <span className="text-xl font-semibold text-primary">AgendaMente</span>
        </div>

        <nav className="flex items-center gap-6">
          <a href="#funcionalidades" className="text-gray-700 hover:text-blue-600">Funcionalidades</a>
          <a href="#motivacional" className="text-gray-700 hover:text-blue-600">Sobre</a>
          <Link href="#footer" scroll={true}>
            <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Contato</span>
          </Link>
          <button
            onClick={onStart}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Comece Agora
          </button>
        </nav>
      </div>
    </header>
  );
}
