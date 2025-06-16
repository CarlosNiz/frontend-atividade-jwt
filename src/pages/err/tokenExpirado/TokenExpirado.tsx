import { useNavigate } from 'react-router-dom';

function TokenExpiredPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // Redireciona para a rota raiz (login)
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-2xl font-bold mb-4">Token foi expirado</h1>
      <button
        onClick={handleGoBack}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Voltar para o Login
      </button>
    </div>
  );
}

export default TokenExpiredPage;