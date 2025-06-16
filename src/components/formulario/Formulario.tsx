import { useState, type FormEvent } from "react";
import FormField from "./inputs/FormFields";

function Formulario() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault(); 
        console.log('Formulário enviado do componente Formulario:', { nome, senha });
        
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