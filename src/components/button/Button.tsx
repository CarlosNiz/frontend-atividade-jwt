interface BotaoInterface {
    margemTopo: number,
    margemLateral: number,
    descricao: string,
    corLetra: string,
    onClick?: () => void
};

function Button({ margemTopo, margemLateral, descricao, corLetra, onClick }: BotaoInterface) {
    return(
        <button
            style={{padding: `${margemTopo}px ${margemLateral}px`, color: corLetra}}
            className="cursor-pointer border-yellow-500 border-2 hover:bg-yellow-500"
            onClick={onClick}
        >
            <p>{descricao}</p>
        </button>
    );
}

export default Button;