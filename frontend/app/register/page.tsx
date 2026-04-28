export default function RegisterPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Senha"
            className="border p-2 rounded"
          />
          <button className="bg-green-500 text-white p-2 rounded">
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
}
