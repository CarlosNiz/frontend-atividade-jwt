import { useState, type FormEvent } from "react";
import FormField from "./inputs/FormFields";
import { useNavigate } from "react-router-dom";

import API_BASE_URL from "../../config/apiConfig";
import axios from 'axios';

function Formulario() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault(); 

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                nome,
                senha
            });

            if (response.data && response.data.access_token) {
                localStorage.setItem('authToken', response.data.access_token);
                navigate('/main');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage('Acesso negado. Verifique suas credenciais.');
            } else {
                console.error('Erro na requisição (axios):', error);
            }
        }
    }

    function clearForm() {
        setNome('');
        setSenha('');
    }

    return(
        <form className="space-y-6" onSubmit={handleSubmit}>
            <FormField
              label="Nome"
              id="nome"
              name="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <FormField
              label="Senha"
              id="password"
              name="password"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              autoComplete="current-password"
            />
            {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <div className="flex justify-evenly pt-4">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Enviar
              </button>
              <button
                type="button"
                onClick={ clearForm }
                className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Limpar
              </button>
            </div>
        </form>
    );
}

export default Formulario;