import './Pacientes.css'

import { useState, useEffect } from 'react'

import FunctionsInputs from '../components/FunctionsInput'
import ModalNewElement from '../components/ModalNewElement'

import getData from "../api/requisicoesApi"

const Pacientes = () => {

  const [newItem, setNewItem] = useState(false)
  const [pacientes, setPacientes] = useState([])
  const [filterArray, setFilterArray] = useState([])

  function handleSearch(e) {
    setFilterArray(pacientes.filter((paciente) => paciente.nome.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  function handleClean() {
    setFilterArray(pacientes)
  }

  function handleNewElement(e) {
    e.preventDefault()

    setNewItem(true)

    document.querySelector("body").style.height = "100vh"
    document.querySelector("body").style.overflow = "hidden"
  }

  function handleSubmitElement() {
    setNewItem(false)

    document.querySelector("body").style.height = "100%"
    document.querySelector("body").style.overflow = "auto"
  }

  useEffect(() => {

    setPacientes(JSON.parse(sessionStorage.getItem("pacientes")))
    setFilterArray(JSON.parse(sessionStorage.getItem("pacientes")))

  }, [])

  useEffect(() => {

    getData()

  }, [newItem])

  return (
    <div className='pacientes container'>
      <FunctionsInputs element={"paciente"} handleNewElement={handleNewElement} handleSearch={handleSearch} handleClean={handleClean} />
      <div className="pacientes-list">
        {filterArray.length > 0 ? filterArray.map((paciente) => {
          return (<div className="paciente-box" id={paciente.name}>
            <img src={"./" + paciente.type + ".png"} alt="Ícone de Tipo" />
            <h3>{paciente.nome}</h3>
            <p>{paciente.raca}</p>
          </div>)

        }) : <p style={{ textAlign: "center", fontSize: "2rem", marginTop: "2rem" }}>Paciente não encontrado</p>}
      </div>
      {newItem ? <ModalNewElement element={"paciente"} handleSubmitElement={handleSubmitElement} /> : <></>}
    </div>
  )
}

export default Pacientes