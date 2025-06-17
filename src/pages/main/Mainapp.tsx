import { useState, useEffect, type ChangeEvent } from "react";
import Button from "../../components/button/Button";
import FormField from "../../components/formulario/inputs/FormFields";

import API_BASE_URL from "../../config/apiConfig";

interface Item {
    id: number;
    descricao: string;
    preco: number;
}

function Mainapp() {
    const [descricaoValue, setDescricaoValue] = useState('');
    const [precoValue, setPrecoValue] = useState('');
    const [items, setItems] = useState<Item[]>([]);
    const [editingItem, setEditingItem] = useState<Item | null>(null);

    const ITEMS_API_URL = `${API_BASE_URL}/itens`;

    const getToken = (): string | null => {
        return localStorage.getItem('authToken');
    }

    const fetchItems = async () => {
        const token = getToken();
        if (!token) {
            console.error("Token de autenticação não encontrado.");
            return;
        }
        try {
            const response = await fetch(ITEMS_API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Falha ao buscar itens');
            }
            const rawData: any[] = await response.json();
            const data: Item[] = rawData.map(item => ({
                ...item,
                preco: parseFloat(item.preco) 
            }));
            setItems(data);
        } catch (error) {
            console.error("Erro ao buscar itens:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleSubmit = async () => {
        if (descricaoValue.trim() === '' || precoValue.trim() === '') {
            alert("Descrição e preço são obrigatórios.");
            return;
        }

        const token = getToken();
        if (!token) {
            console.error("Token de autenticação não encontrado.");
            return;
        }

        const itemData = {
            descricao: descricaoValue,
            preco: parseFloat(precoValue)
        };

        try {
            let response;
            if (editingItem) {
                response = await fetch(`${ITEMS_API_URL}/${editingItem.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(itemData)
                });
            } else {
                response = await fetch(ITEMS_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(itemData)
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(editingItem ? `Falha ao atualizar item: ${errorData.message || response.status}` : `Falha ao adicionar item: ${errorData.message || response.status}`);
            }

            fetchItems();
            setDescricaoValue('');
            setPrecoValue('');
            setEditingItem(null);

        } catch (error) {
            console.error("Erro ao salvar item:", error);
            alert(`Erro ao salvar item: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    const handleEditItem = (itemToEdit: Item) => {
        setEditingItem(itemToEdit);
        setDescricaoValue(itemToEdit.descricao);
        setPrecoValue(String(itemToEdit.preco));
    };

    const handleDeleteItem = async (itemId: number) => {
        const token = getToken();
        if (!token) {
            console.error("Token de autenticação não encontrado.");
            return;
        }

        if (!confirm("Tem certeza que deseja excluir este item?")) {
            return;
        }

        try {
            const response = await fetch(`${ITEMS_API_URL}/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Falha ao excluir item: ${errorData.message || response.status}`);
            }
            
            setItems(items.filter(item => item.id !== itemId));
            if (editingItem && editingItem.id === itemId) {
                setDescricaoValue('');
                setPrecoValue('');
                setEditingItem(null);
            }
        } catch (error) {
            console.error("Erro ao excluir item:", error);
            alert(`Erro ao excluir item: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    return (
        <main className="w-screen min-h-screen bg-gray-800 flex flex-col items-center py-8 space-y-6">
            {/* Seção do Formulário */}
            <div className="w-full max-w-lg flex flex-col items-center text-white p-6 bg-gray-700 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">{editingItem ? "Editar Item" : "Adicionar Novo Item"}</h1>
                <div className="w-full mb-4">
                    <FormField
                        label="Descrição do Item"
                        id="descricaoInput"
                        name="descricaoInput"
                        type="text"
                        value={descricaoValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescricaoValue(e.target.value)}
                        required
                    />
                </div>
                <div className="w-full mb-4">
                    <FormField
                        label="Preço do Item"
                        id="precoInput"
                        name="precoInput"
                        type="number"
                        value={precoValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPrecoValue(e.target.value)}
                        required
                    />
                </div>
                <Button
                    margemTopo={9}
                    margemLateral={80}
                    descricao={editingItem ? "Salvar Alterações" : "Adicionar"}
                    corLetra="white"
                    onClick={handleSubmit}
                />
            </div>

            {/* Seção da Lista de Itens */}
            <div className="w-full max-w-lg bg-gray-700 p-6 rounded-lg shadow-md text-white flex-grow overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Lista de Itens</h2>
                {items.length === 0 ? (
                    <p className="text-gray-400">Nenhum item adicionado ainda.</p>
                ) : (
                    <ul className="space-y-3">
                        {items.map((item) => (
                            <li key={item.id} className="flex justify-between items-center bg-gray-600 p-3 rounded-md shadow">
                                <div className="flex-grow">
                                    <span className="block font-semibold truncate" title={item.descricao}>{item.descricao}</span>
                                    <span className="block text-sm text-gray-300">R$ {item.preco.toFixed(2)}</span>
                                </div>
                                <div className="space-x-2 flex-shrink-0 ml-4">
                                    <button
                                        onClick={() => handleEditItem(item)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-md text-sm transition-colors duration-150"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md text-sm transition-colors duration-150"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    )
}

export default Mainapp;