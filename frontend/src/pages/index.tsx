import { FormEvent, useMemo, useState } from "react";
import { Header } from "../components/Header";
import HeroSection from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { MascotSection } from "../components/MascotSection";
import { Footer } from "../components/Footer";

type Todo = {
  id: number;
  title: string;
  details: string;
  time: string;
  date: string;
  done: boolean;
};

const now = new Date();
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

const initialTodos: Todo[] = [
  { id: 1, title: "Aula de Física", details: "Revisar os exercícios da semana", time: "08:00", date: today, done: false },
  { id: 2, title: "Estudar Matemática", details: "Resolver lista para prova", time: "14:00", date: today, done: true },
];

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [name, setName] = useState("Estudante");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState({ title: "", details: "", time: "", date: today });

  const todayTodos = useMemo(() => todos.filter((todo) => todo.date === today), [todos]);
  const completed = useMemo(() => todayTodos.filter((todo) => todo.done).length, [todayTodos]);
  const progress = todayTodos.length ? Math.round((completed / todayTodos.length) * 100) : 0;

  function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password) return setError("Preencha e-mail e senha para continuar.");
    setError("");
    setIsLogged(true);
    setShowAuth(false);
  }

  function toggleTodo(id: number) {
    setTodos((current) => current.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  }

  function addTodo() {
    if (!newTodo.title.trim() || !newTodo.time || !newTodo.date) return;
    setTodos((current) => [...current, { id: Date.now(), done: false, ...newTodo }]);
    setNewTodo({ title: "", details: "", time: "", date: today });
  }

  function sendDailyEmail() {
    const lines = todayTodos
      .map((todo) => `• ${todo.time} - ${todo.title}${todo.details ? ` (${todo.details})` : ""} [${todo.done ? "concluída" : "pendente"}]`)
      .join("%0D%0A");
    const body = `Agenda do dia ${today}%0D%0A%0D%0A${lines || "Sem atividades para hoje."}`;
    window.location.href = `mailto:${email || ""}?subject=Minha agenda do dia ${today}&body=${body}`;
  }

  if (isLogged) {
    return (
      <div className="min-h-screen bg-[#f5f6f8]">
        <header className="bg-white border-b px-5 py-4 flex items-center justify-between">
          <div><p className="font-bold text-3xl">AgendaMente</p><p className="text-gray-500">Olá, {name || "Estudante"}!</p></div>
          <button onClick={() => setIsLogged(false)} className="text-blue-600 font-semibold">Sair</button>
        </header>
        <main className="max-w-7xl mx-auto p-6 grid lg:grid-cols-[1.8fr_1fr] gap-6">
          <section className="bg-white rounded-2xl border p-6">
            <h2 className="text-4xl font-bold">Calendário</h2>
            <p className="mt-2 text-gray-500">Hoje: {today}</p>
            <div className="mt-5 grid grid-cols-7 gap-2 text-center text-sm">
              {[...Array(31)].map((_, index) => <div key={index} className="h-14 rounded-lg flex items-center justify-center border bg-gray-50">{index + 1}</div>)}
            </div>
            <div className="mt-8 border-t pt-5">
              <h3 className="text-3xl font-semibold">Checklist do dia</h3>
              <div className="mt-4 grid md:grid-cols-2 gap-3">
                <input value={newTodo.title} onChange={(e) => setNewTodo((c) => ({ ...c, title: e.target.value }))} placeholder="Atividade" className="border rounded-lg px-3 py-2" />
                <input value={newTodo.time} onChange={(e) => setNewTodo((c) => ({ ...c, time: e.target.value }))} type="time" className="border rounded-lg px-3 py-2" />
                <input value={newTodo.date} onChange={(e) => setNewTodo((c) => ({ ...c, date: e.target.value }))} type="date" className="border rounded-lg px-3 py-2" />
                <input value={newTodo.details} onChange={(e) => setNewTodo((c) => ({ ...c, details: e.target.value }))} placeholder="Informações da atividade" className="border rounded-lg px-3 py-2" />
              </div>
              <button onClick={addTodo} className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg">Agendar atividade</button>

              <ul className="mt-5 space-y-3">
                {todayTodos.map((todo) => (
                  <li key={todo.id} className="border rounded-xl p-3 flex items-start justify-between gap-4">
                    <label className="flex items-start gap-3">
                      <input className="mt-1" type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
                      <div>
                        <p className={todo.done ? "line-through text-gray-400" : ""}>{todo.time} · {todo.title}</p>
                        {todo.details && <p className="text-sm text-gray-500">{todo.details}</p>}
                      </div>
                    </label>
                    <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-1">{todo.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="bg-gradient-to-br from-green-50 to-blue-50 border rounded-2xl p-6">
              <h3 className="text-3xl font-bold">Seu Companheiro</h3>
              <div className="mt-4 bg-white rounded-xl p-5 text-center">
                <div className="text-8xl">🐸</div>
                <p className="mt-3 bg-yellow-100 rounded-full py-2 font-semibold">{progress >= 100 ? "Meta do dia concluída! 🎉" : "Ótimo trabalho! Continue assim! 💪"}</p>
                <p className="mt-3 text-gray-500">Progresso de Hoje {progress}%</p>
                <div className="mt-2 bg-gray-200 h-4 rounded-full overflow-hidden"><div className="h-4 bg-blue-500 transition-all" style={{ width: `${progress}%` }} /></div>
              </div>
              <button onClick={sendDailyEmail} className="w-full mt-4 bg-green-600 text-white rounded-lg py-2 font-semibold">Enviar agenda do dia por e-mail</button>
            </section>
          </aside>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onStart={() => { setShowAuth(true); setError(""); }} />
      <main><HeroSection onStart={() => { setShowAuth(true); setError(""); }} /><FeaturesSection /><MascotSection /></main>
      <Footer />
      {showAuth && (
        <div className="fixed inset-0 bg-black/30 grid place-items-center p-4 sm:p-6">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-300 grid place-items-center text-4xl">🐸</div>
            <h2 className="text-5xl font-bold mt-5">Bem-vindo de volta!</h2>
            <p className="text-gray-500 mt-2">Entre para continuar organizando sua vida</p>
            <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4">
              <input className="w-full border rounded-xl px-4 py-3" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required />
              <input className="w-full border rounded-xl px-4 py-3" placeholder="seu@email.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input className="w-full border rounded-xl px-4 py-3" placeholder="********" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 font-bold">Entrar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
