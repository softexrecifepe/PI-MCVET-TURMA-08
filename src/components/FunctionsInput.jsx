import './FunctionsInput.css'

const FunctionsInput = ({element, handleNewElement, handleSearch, handleClean}) => {



    return (
        <div className="function-header">
            <form className="search-component">
                <img src="./icons8-pesquisar.svg" alt="Ícone de Busca" />
                <input type="text" onChange={(e) => handleSearch(e) }  placeholder={`Buscar ${element}`}/>
                <input id='clear-btn' type="reset" value="Limpar" onClick={() => handleClean()}/>
            </form>
            <button onClick={(e) => handleNewElement(e)}><img src="./icons8-mais.svg" alt="" />{"Novo" + " " + element}</button>
        </div>
    )
}

export default FunctionsInput