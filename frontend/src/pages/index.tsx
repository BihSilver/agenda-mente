import { FormEvent, useEffect, useMemo, useState } from "react";
import { Header } from "../components/Header";
import HeroSection from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { MascotSection } from "../components/MascotSection";
import { Footer } from "../components/Footer";

type Todo = { id: number; title: string; details: string; time: string; date: string; done: boolean; type: "atividade" | "aula" };
type UserAccount = { name: string; email: string; password: string };

const now = new Date();
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
const STORAGE_TODOS = "agendamente_todos";
const STORAGE_USERS = "agendamente_users";

const initialTodos: Todo[] = [
  { id: 1, title: "Aula de Física", details: "Revisar exercícios", time: "08:00", date: today, done: false, type: "aula" },
  { id: 2, title: "Lista de Matemática", details: "Capítulos 1 e 2", time: "14:00", date: today, done: true, type: "atividade" },
];

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [name, setName] = useState("Estudante");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window === "undefined") return initialTodos;
    const raw = localStorage.getItem(STORAGE_TODOS);
    return raw ? JSON.parse(raw) : initialTodos;
  });
  const [selectedDate, setSelectedDate] = useState(today);
  const [newTodo, setNewTodo] = useState({ title: "", details: "", time: "", date: today, type: "atividade" as Todo["type"] });

  useEffect(() => {
    if ("Notification" in window) Notification.requestPermission();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_TODOS, JSON.stringify(todos));
  }, [todos]);

  const selectedTodos = useMemo(() => todos.filter((todo) => todo.date === selectedDate), [todos, selectedDate]);
  const completed = useMemo(() => selectedTodos.filter((todo) => todo.done).length, [selectedTodos]);
  const progress = selectedTodos.length ? Math.round((completed / selectedTodos.length) * 100) : 0;

  const weeklyCompleted = [8, 6, 10, 7, 9, 5, 4];
  const weeklyStudyHours = [4, 3.5, 5, 4.5, 5.5, 3, 2];
  const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem(STORAGE_USERS) || "[]") as UserAccount[];

    if (isSignup) {
      if (users.some((u) => u.email === email)) return setError("Já existe uma conta com este e-mail.");
      users.push({ name, email, password });
      localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
      setError("");
      setIsLogged(true);
      setShowAuth(false);
      return;
    }

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return setError("E-mail ou senha inválidos.");
    setName(user.name);
    setError("");
    setIsLogged(true);
    setShowAuth(false);
  }

  function toggleTodo(id: number) {
    setTodos((current) => current.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  }

  function addTodo() {
    if (!newTodo.title.trim() || !newTodo.time || !newTodo.date) return;
    const todo = { id: Date.now(), done: false, ...newTodo };
    setTodos((current) => [...current, todo]);
    setSelectedDate(newTodo.date);
    setNewTodo({ title: "", details: "", time: "", date: selectedDate, type: "atividade" });
  }

  function sendDailyEmail() {
    const lines = selectedTodos.map((todo) => `• ${todo.time} - ${todo.title} (${todo.type}) [${todo.done ? "concluída" : "pendente"}]`).join("%0D%0A");
    const body = `Agenda do dia ${selectedDate}%0D%0A%0D%0A${lines || "Sem atividades para hoje."}`;
    window.location.href = `mailto:${email || ""}?subject=Minha agenda do dia ${selectedDate}&body=${body}`;
    if (Notification.permission === "granted") new Notification("Agenda enviada", { body: `Sua agenda de ${selectedDate} foi preparada para envio.` });
  }

  async function syncWithBackend() {
    try {
      await fetch("http://localhost:8000/compromissos/");
    } catch {
      setError("Backend não respondeu. A agenda continua salva localmente.");
    }
  }

  if (isLogged) {
    return (
      <div className="min-h-screen bg-slate-50 text-base">
        <header className="bg-white border-b px-5 py-4 flex items-center justify-between">
          <div><p className="font-bold text-2xl">AgendaMente</p><p className="text-slate-500">Olá, {name || "Estudante"}!</p></div>
          <button onClick={() => setIsLogged(false)} className="text-blue-600 font-semibold">Sair</button>
        </header>
        <main className="max-w-7xl mx-auto p-6 grid lg:grid-cols-[1.8fr_1fr] gap-6">
          <div className="space-y-6">
          <section className="bg-white rounded-2xl border p-6">
            <h2 className="text-2xl font-bold">Agenda e calendário</h2>
            <p className="mt-2 text-slate-500">Dia selecionado: {selectedDate}</p>
            <div className="mt-5 grid grid-cols-7 gap-2 text-center text-sm">
              {[...Array(31)].map((_, index) => {
                const day = String(index + 1).padStart(2, "0");
                const yyyyMm = selectedDate.slice(0, 8);
                const date = `${yyyyMm}${day}`;
                const active = date === selectedDate;
                return <button key={index} onClick={() => setSelectedDate(date)} className={`h-12 rounded-lg border transition ${active ? "bg-blue-600 text-white" : "bg-slate-50 hover:bg-slate-100"}`}>{index + 1}</button>;
              })}
            </div>

            <div className="mt-8 border-t pt-5">
              <h3 className="text-xl font-semibold">Agendar atividade/aula</h3>
              <div className="mt-4 grid md:grid-cols-2 gap-3">
                <input value={newTodo.title} onChange={(e) => setNewTodo((c) => ({ ...c, title: e.target.value }))} placeholder="Atividade" className="border rounded-lg px-3 py-2" />
                <input value={newTodo.time} onChange={(e) => setNewTodo((c) => ({ ...c, time: e.target.value }))} type="time" className="border rounded-lg px-3 py-2" />
                <input value={newTodo.date} onChange={(e) => setNewTodo((c) => ({ ...c, date: e.target.value }))} type="date" className="border rounded-lg px-3 py-2" />
                <select value={newTodo.type} onChange={(e) => setNewTodo((c) => ({ ...c, type: e.target.value as Todo["type"] }))} className="border rounded-lg px-3 py-2"><option value="atividade">Atividade</option><option value="aula">Aula</option></select>
                <input value={newTodo.details} onChange={(e) => setNewTodo((c) => ({ ...c, details: e.target.value }))} placeholder="Detalhes" className="border rounded-lg px-3 py-2 md:col-span-2" />
              </div>
              <div className="mt-3 flex gap-3">
                <button onClick={addTodo} className="bg-blue-600 text-white px-5 py-2 rounded-lg">Agendar</button>
                <button onClick={syncWithBackend} className="bg-slate-800 text-white px-5 py-2 rounded-lg">Sincronizar com banco</button>
              </div>

              <ul className="mt-5 space-y-3">
                {selectedTodos.map((todo) => (
                  <li key={todo.id} className="border rounded-xl p-3 flex items-start justify-between gap-4">
                    <label className="flex items-start gap-3">
                      <input className="mt-1" type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
                      <div><p className={todo.done ? "line-through text-slate-400" : ""}>{todo.time} · {todo.title}</p><p className="text-sm text-slate-500">{todo.type} {todo.details ? `· ${todo.details}` : ""}</p></div>
                    </label>
                    <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-1">{todo.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-2xl border p-6">
            <h3 className="text-3xl font-bold">Dashboard de Desempenho</h3>
            <div className="mt-5 grid md:grid-cols-3 gap-4">
              <div className="rounded-xl bg-slate-100 p-4">
                <p className="text-slate-600">Atividades Concluídas</p>
                <p className="mt-2 text-5xl font-bold text-blue-600">49</p>
                <p className="text-slate-500">Esta semana</p>
              </div>
              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-slate-600">Horas Estudadas</p>
                <p className="mt-2 text-5xl font-bold text-green-500">27.5h</p>
                <p className="text-slate-500">Esta semana</p>
              </div>
              <div className="rounded-xl bg-amber-50 p-4">
                <p className="text-slate-600">Taxa de Conclusão</p>
                <p className="mt-2 text-5xl font-bold">87%</p>
                <p className="text-slate-500">+12% vs semana passada</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-2xl font-semibold">Atividades Concluídas por Dia</h4>
              <div className="mt-4 rounded-xl border p-4">
                <div className="grid grid-cols-7 gap-3 items-end h-56">
                  {weeklyCompleted.map((value, index) => (
                    <div key={weekDays[index]} className="flex flex-col items-center justify-end gap-2 h-full">
                      <div className="w-full max-w-16 bg-blue-500 rounded-t-lg" style={{ height: `${(value / 12) * 100}%` }} />
                      <span className="text-sm text-slate-600">{weekDays[index]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-2xl font-semibold">Horas de Estudo</h4>
              <div className="mt-4 rounded-xl border p-4">
                <div className="grid grid-cols-7 gap-3 items-end h-40">
                  {weeklyStudyHours.map((value, index) => (
                    <div key={`study-${weekDays[index]}`} className="flex flex-col items-center justify-end gap-2 h-full">
                      <div className="w-4 rounded-full bg-green-400" style={{ height: `${(value / 8) * 100}%` }} />
                      <span className="text-sm text-slate-600">{weekDays[index]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          </div>

          <aside className="space-y-6">
            <section className="bg-gradient-to-br from-green-50 to-blue-50 border rounded-2xl p-6">
              <h3 className="text-xl font-bold">Dashboard de desempenho</h3>
              <div className="mt-4 bg-white rounded-xl p-5 text-center">
                <div className="text-7xl frog-jump">🐸</div>
                <p className="mt-3 bg-yellow-100 rounded-full py-2 px-3 font-semibold">{progress >= 100 ? "Meta do dia concluída! 🎉" : "Continue avançando! 💪"}</p>
                <p className="mt-3 text-slate-500">Progresso do dia: {progress}%</p>
                <div className="mt-2 bg-slate-200 h-3 rounded-full overflow-hidden"><div className="h-3 bg-blue-500 transition-all" style={{ width: `${progress}%` }} /></div>
                <p className="mt-3 text-sm text-slate-600">Concluídas: {completed} / Pendentes: {selectedTodos.length - completed}</p>
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
            <div className="w-16 h-16 mx-auto rounded-full bg-green-300 grid place-items-center text-4xl frog-jump">🐸</div>
            <h2 className="text-3xl font-bold mt-5">{isSignup ? "Crie sua conta" : "Bem-vindo de volta"}</h2>
            <p className="text-slate-500 mt-2">{isSignup ? "Seu login será salvo para próximos acessos." : "Entre para continuar organizando sua vida."}</p>
            <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4">
              <input className="w-full border rounded-xl px-4 py-3" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required />
              <input className="w-full border rounded-xl px-4 py-3" placeholder="seu@email.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input className="w-full border rounded-xl px-4 py-3" placeholder="********" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 font-bold">{isSignup ? "Criar conta" : "Entrar"}</button>
            </form>
            <button onClick={() => setIsSignup((v) => !v)} className="mt-4 text-blue-600 font-medium">{isSignup ? "Já tenho login" : "Criar meu login"}</button>
          </div>
        </div>
      )}
    </div>
  );
}
