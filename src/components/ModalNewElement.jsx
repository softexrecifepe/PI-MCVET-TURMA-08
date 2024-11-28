import { useState } from 'react'
import axios from 'axios'

import './ModalNewElement.css'

const ModalNewElement = ({ element, handleSubmitElement }) => {

    const [petName, setPetName] = useState()
    const [petEspecie, setPetEspecie] = useState()
    const [petIdade, setPetIdade] = useState()
    const [petType, setPetType] = useState()
    const [petRaca, setPetRaca] = useState()


    async function createPet() {
        try {
            await axios.post("https://api-restiful.vercel.app/paciente", {
                nome: petName,
                especie: petEspecie,
                type: petType,
                raca: petRaca,
                idade: petIdade,
                atendimento: []
            })

        } catch (error) {
            console.log(error)
        }

    }

    function handleChange(e) {

        if (e.target.id === "element-nome") {
            setPetName(e.target.value.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()))
        }

        if (e.target.id === "element-especie") {
            setPetEspecie(e.target.value.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()))
        }

        if (e.target.id === "element-type") {
            setPetType(e.target.value)
        }

        if (e.target.id === "element-idade") {
            setPetIdade(e.target.value.replace(/[^0-9]/g, ""))
        }

        if (e.target.id === "element-raca") {
            setPetRaca(e.target.value.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()))
        }
        
    }

    function handleSubmitNewElement() {
        handleSubmitElement()

        if (element === "paciente" && petEspecie && petIdade && petName && petRaca && petType) {
            createPet()
        }
    }

    return (
        <div className="modal-bg">
            <div className='modal-new-element'>
                <div className='form'>
                    <h2>Novo {element}</h2>
                    <div className="input-control">
                        <label for={"nome-" + element}>Informe o nome do {element}
                            <input id="element-nome" onChange={(e) => handleChange(e)} type="text" />
                            <span className="validation-input"></span>
                        </label>
                    </div>
                    <div className="input-control">
                        <label>Informe {element === "paciente" ? "a especie" : "a quantidade"}
                            <input id={element === "paciente" ? "element-especie" : "element-quantidade"} onChange={(e) => handleChange(e)} type={element === "paciente" ? "text" : "number"} />
                            <span className="validation-input"></span>
                        </label>
                    </div>
                    <div className="input-control">
                        <label>Informe {element === "paciente" ? "a raça" : "a marca"}
                            <input id={element === "paciente" ? "element-raca" : "element-marca"} onChange={(e) => handleChange(e)} type="text" />
                            <span className="validation-input"></span>
                        </label>
                    </div>
                    <div className="input-control">
                        <label>Informe {element === "paciente" ? "a idade" : "o valor"}
                            <input id={element === "paciente" ? "element-idade" : "element-valor"} onChange={(e) => handleChange(e)} type="number" />
                            <span className="validation-input"></span>
                        </label>
                    </div>
                    <div className="input-control">
                        <label>Informe {element === "paciente" ? "o tipo" : "o valor"}
                            <input id={element === "paciente" ? "element-type" : "element-valor"} onChange={(e) => handleChange(e)} type="text" />
                            <span className="validation-input"></span>
                        </label>
                    </div>
                    <input onClick={() => handleSubmitNewElement()} type="submit" id="submit-btn" />
                </div>
            </div>
        </div>
    )
}

export default ModalNewElement