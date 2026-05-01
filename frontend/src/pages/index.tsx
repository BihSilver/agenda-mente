import { FormEvent, useMemo, useState } from "react";
import { Header } from "../components/Header";
import HeroSection from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { MascotSection } from "../components/MascotSection";
import { Footer } from "../components/Footer";

type AuthMode = "login" | "signup";

type Todo = {
  id: number;
  title: string;
  done: boolean;
  tag: string;
};

const initialTodos: Todo[] = [
  { id: 1, title: "Revisar capítulo 5 de Cálculo", done: false, tag: "Estudos" },
  { id: 2, title: "Preparar apresentação do projeto", done: false, tag: "Trabalho" },
  { id: 3, title: "Comprar material escolar", done: true, tag: "Pessoal" },
];

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isLogged, setIsLogged] = useState(false);
  const [name, setName] = useState("Estudante");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  const completed = useMemo(() => todos.filter((todo) => todo.done).length, [todos]);

  function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password) {
      setError("Preencha e-mail e senha para continuar.");
      return;
    }

    if (authMode === "signup" && !name.trim()) {
      setError("Informe seu nome para criar a conta.");
      return;
    }

    setError("");
    setIsLogged(true);
    setShowAuth(false);
  }

  function toggleTodo(id: number) {
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  }

  function addTodo() {
    if (!newTodo.trim()) return;
    setTodos((current) => [
      ...current,
      { id: Date.now(), title: newTodo.trim(), done: false, tag: "Estudos" },
    ]);
    setNewTodo("");
  }

  function openAuth() {
    setShowAuth(true);
    setError("");
  }

  if (isLogged) {
    return (
      <div className="min-h-screen bg-[#f6f7fb]">
        <header className="bg-white border-b px-4 sm:px-5 py-4 flex items-center justify-between">
          <div>
            <p className="font-bold text-2xl sm:text-3xl">AgendaMente</p>
            <p className="text-gray-500">Olá, {name || "Estudante"}!</p>
          </div>
          <button onClick={() => setIsLogged(false)} className="text-blue-600 font-semibold">Sair</button>
        </header>

        <main className="max-w-6xl mx-auto p-4 sm:p-6 grid lg:grid-cols-[2fr_1fr] gap-6">
          <section className="bg-white rounded-2xl border p-4 sm:p-6">
            <h2 className="text-3xl sm:text-4xl font-bold">Bem-vindo de volta! 🐸</h2>
            <p className="text-gray-500 mt-2">Aqui está um resumo das suas atividades</p>
            <div className="mt-6 rounded-xl border p-4">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">Calendário</h3>
              <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center text-sm">
                {[...Array(28)].map((_, index) => (
                  <div key={index} className="h-12 sm:h-16 rounded-lg flex items-center justify-center border bg-gray-50">
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="bg-gradient-to-br from-green-50 to-blue-50 border rounded-2xl p-6">
              <h3 className="text-2xl sm:text-3xl font-bold">Seu Companheiro</h3>
              <div className="mt-4 bg-white rounded-xl p-5 text-center">
                <div className="text-7xl">🐸</div>
                <p className="mt-3 bg-yellow-100 rounded-full py-2 font-semibold">Ótimo trabalho! Continue assim 💪</p>
                <p className="mt-3 text-gray-500">Progresso do dia: 80%</p>
              </div>
            </section>

            <section className="bg-white border rounded-2xl p-6">
              <h3 className="text-2xl sm:text-3xl font-bold">Checklist de Atividades</h3>
              <div className="mt-3 flex gap-2">
                <input
                  value={newTodo}
                  onChange={(event) => setNewTodo(event.target.value)}
                  placeholder="Adicionar nova tarefa..."
                  className="w-full border rounded-lg px-3 py-2"
                />
                <button onClick={addTodo} className="bg-blue-600 text-white px-4 rounded-lg">Adicionar</button>
              </div>
              <ul className="mt-4 space-y-2">
                {todos.map((todo) => (
                  <li key={todo.id} className="border rounded-lg p-3 flex items-center justify-between gap-3">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
                      <span className={todo.done ? "line-through text-gray-400" : ""}>{todo.title}</span>
                    </label>
                    <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-1">{todo.tag}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gray-500">{completed} de {todos.length} concluídas</p>
            </section>
          </aside>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onStart={openAuth} />
      <main>
        <HeroSection onStart={openAuth} />
        <FeaturesSection />
        <MascotSection />
      </main>
      <Footer />

      {showAuth && (
        <div className="fixed inset-0 bg-black/30 grid place-items-center p-4 sm:p-6">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-300 grid place-items-center text-4xl">🐸</div>
            <h2 className="text-3xl sm:text-5xl font-bold mt-5">Bem-vindo de volta!</h2>
            <p className="text-gray-500 mt-2">
              {authMode === "login" ? "Entre para continuar organizando sua vida" : "Crie sua conta para começar"}
            </p>

            <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4">
              {authMode === "signup" && (
                <input
                  className="w-full border rounded-xl px-4 py-3"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              )}
              <input
                className="w-full border rounded-xl px-4 py-3"
                placeholder="seu@email.com"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <input
                className="w-full border rounded-xl px-4 py-3"
                placeholder="********"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 font-bold">
                {authMode === "login" ? "Entrar" : "Criar conta"}
              </button>
            </form>

            <div className="mt-5 flex items-center justify-between gap-4 text-sm">
              <p className="text-gray-500">
                {authMode === "login" ? "Não tem uma conta? " : "Já possui conta? "}
                <button
                  type="button"
                  onClick={() => setAuthMode((current) => (current === "login" ? "signup" : "login"))}
                  className="text-blue-600 font-semibold"
                >
                  {authMode === "login" ? "Criar conta" : "Entrar"}
                </button>
              </p>
              <button type="button" onClick={() => setShowAuth(false)} className="text-gray-400 hover:text-gray-700">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
