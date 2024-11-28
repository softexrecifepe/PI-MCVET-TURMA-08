import { useState, useEffect } from 'react'
import axios from 'axios'

import './ModalNewShedule.css'

const ModalNewShedule = ({ handleSubmitService, handleCancel }) => {

    const [petSelected, setPetSelected] = useState(false)
    const [filterArray, setFilterArray] = useState([])

    const [serviceDay, setServiceDay] = useState(`${sessionStorage.getItem("ano")}-${sessionStorage.getItem("mes")}-${sessionStorage.getItem("dia")}`)
    const [serviceHour, setServiceHour] = useState()
    const [petName, setPetName] = useState()
    const [petType, setPetType] = useState()
    const [petRaca, setPetRaca] = useState()
    const [petServices, setPetServices] = useState([])

    const [otherService, setOtherService] = useState()

    const servicosArray = ["Banho", "Tosa", "Vacinação", "Unha", "Higienização do terrário",
        "Consulta Veterinária", "Adestramento", "Alimentação especializada", "Iluminação UV",
        "Troca de água", "Limpeza do aquário", "Alimentação viva", "Aquário plantado", "Internação"
    ]


    async function createService() {
        try {
            await axios.post("https://api-restiful.vercel.app/atendimento", {
                dia: serviceDay,
                hora: serviceHour,
                paciente: petName,
                type: petType,
                servicos: petServices,
            })

        } catch (error) {
            console.log(error)
        }

    }

    async function createHosptalization() {
        try {
            await axios.post("https://api-restiful.vercel.app/internacao", {
                entrada: serviceDay,
                hora: serviceHour,
                paciente: petName,
                type: petType,
                permanencia: 1,
                observacoes: "",
            })

            console.log({
                serviceDay,
                serviceHour,
                petName,
                petType
            })

        } catch (error) {
            console.log(error)
        }

    }

    function handleChanges(e) {

        if (petSelected) {
            setPetName(petSelected.nome)

            setPetType(petSelected.type)
        }

        if (e.target.id === "nome-input") {
            setFilterArray(JSON.parse(sessionStorage.getItem("pacientes")).filter((paciente) => paciente.nome.toLowerCase().includes(e.target.value.toLowerCase())))

            document.querySelector(".select-list-container").style.display = "flex"

            if (filterArray.length < 1) {
                document.querySelector(".select-list-container").style.display = "none"

                setPetName(e.target.value.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()))
            }
        }

        // if (e.target.id === "especie-input") {
        //     setPetEspecie(e.target.value.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()))
        // }

        // if (e.target.id === "idade-input") {
        //     setPetIdade(e.target.value.replace(/[^0-9]/g, ""))
        // }

        // if (e.target.id === "raca-input") {
        //     setPetRaca(e.target.value.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()))
        // }

        if (e.target.id === "data-input") {
            setServiceDay(e.target.value)
        }


        if (e.target.id === "horario-input") {
            setServiceHour(e.target.value)
        }

        if (e.target.type === "checkbox") {

            if (e.target.checked) {
                setPetServices(prev => [...prev, e.target.id])
            }

        }
    }

    function handleSubmitNewService() {
        handleSubmitService()

        if (petServices.includes("Internação")) {
            createHosptalization()
        } else {
            createService()
        }


    }

    useEffect(() => {

        if (petSelected) {
            document.querySelector(`#nome-input`).value = petSelected.nome
            document.querySelector(`#especie-input`).value = petSelected.especie
            document.querySelector(`#raca-input`).value = petSelected.raca
            document.querySelector(`#idade-input`).value = petSelected.idade

            document.querySelector(".select-list-container").style.display = "none"
        }

        document.querySelector(`#data-input`).value = `${sessionStorage.getItem("ano")}-${sessionStorage.getItem("mes")}-${sessionStorage.getItem("dia")}`

    }, [petSelected])

    return (
        <div className="modal-bg">
            <div className='modal-new-shedule'>
                <h2>Novo atendimento</h2>
                <form>
                    <div className="paciente-container">
                        <div className="input-control">
                            <label>Informe o nome do paciente
                                <input id="nome-input" type="text" onChange={(e) => handleChanges(e)} />
                                <div className='select-list-container'>
                                    {filterArray.map((element) => {
                                        return <div key={element.id} onClick={() => setPetSelected(element)}>{element.nome}</div>
                                    })}
                                </div>
                                <span className="validation-input"></span>
                            </label>
                        </div>
                        <div className="input-control">
                            <label>Informe a especie
                                <input id='especie-input' onChange={(e) => handleChanges(e)} type="text" />
                                <span className="validation-input"></span>
                            </label>
                        </div>
                        <div className="input-control">
                            <label>Informe a raça
                                <input id='raca-input' onChange={(e) => handleChanges(e)} type="text" />
                                <span className="validation-input"></span>
                            </label>
                        </div>
                        <div className="input-control">
                            <label>Informe a idade
                                <input id='idade-input' onChange={(e) => handleChanges(e)} type="text" />
                                <span className="validation-input"></span>
                            </label>
                        </div>
                    </div>
                    <div className="schedule-container">
                        <div className="date-and-hour-container">
                            <div className="input-control">
                                <label>Informe a data desejada
                                    <input id='data-input' onChange={(e) => handleChanges(e)} type="date" />
                                    <span className="validation-input"></span>
                                </label>
                            </div>
                            <div className="input-control">
                                <label>Informe o horário
                                    <input id='horario-input' onChange={(e) => handleChanges(e)} type="time" min="08:00" max="18:00" />
                                    <span className="validation-input"></span>
                                </label>
                            </div>
                        </div>
                        <div className="input-control" >
                            <label>Selecione o motivo do atendimento
                                <div className='servicos-list-container'>
                                    {servicosArray.map((servico) => {
                                        return (
                                            <div className='service-itens' key={servico} onClick={""}>
                                                <label>{servico}
                                                    <input type="checkbox" onChange={(e) => handleChanges(e)} id={servico} name='servicos' value={servico} />
                                                </label>
                                            </div>
                                        )
                                    })}
                                    <div className='service-itens'>
                                        <label>{otherService ? <input id='other-service' type="text" placeholder='insira o motivo do atendimento' /> : <>Outro</>}
                                            <input type="checkbox" id="outro" name='servicos' value="outro" onClick={(e) => setOtherService(e.target.checked)} />
                                        </label>
                                    </div>
                                </div>
                                <span className="validation-input"></span>
                            </label>
                        </div>
                        <div className="schedule-button-control">
                            <input onClick={(e) => handleSubmitNewService(e)} type="submit" id="submit-btn" />
                            <button onClick={() => handleCancel()}>Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalNewShedule