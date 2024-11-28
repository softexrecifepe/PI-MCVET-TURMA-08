import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import ModalNewShedule from '../components/ModalNewShedule'

import './Home.css'

const Home = () => {

  const [expireItens, setExpireItens] = useState([])
  const [newService, setNewService] = useState(false)
  const [date, setDate] = useState([])

  function getExpireItens() {
    if (sessionStorage.getItem("materiais")) {
      const result = JSON.parse(sessionStorage.getItem("materiais")).sort((a, b) => {

        if (a.quantidade < b.quantidade) {
          return -1;

        } else {
          return 1;
        }
      })

      setExpireItens(result)
    }
  }

  function getDaySchedule() {

    if (sessionStorage.getItem("atendimentos")) {
      let result = JSON.parse(sessionStorage.getItem("atendimentos")).filter((daySchedule) => daySchedule.dia === `${sessionStorage.getItem("ano")}-${sessionStorage.getItem("mes")}-${sessionStorage.getItem("dia")}`)

      return (result.sort((a, b) => {
        if (a.hora < b.hora) {
          return -1;

        } else {
          return 1;
        }
      }))
    }
  }

  function handleNewService() {
    setNewService(true)
  }

  function handleSubmitNewService() {
    setNewService(false)
  }

  function handleCancel() {
    setNewService(false)
  }

  useEffect(() => {

    getExpireItens()

    setDate([sessionStorage.getItem("ano"), sessionStorage.getItem("mes"), sessionStorage.getItem("dia")])

  }, [])

  return (
    <div className='home container'>
      <Link to='/agenda' className='agenda-dashboard'>
        <h2 id='dashboard-title'>Agenda de hoje</h2>
        <div className="inner-agenda-dashboard">
          {sessionStorage.getItem("atendimentos") ? getDaySchedule().map((schedule) => {
            return (
              <div className='agenda-dashboard-box' key={`${schedule.paciente}-${schedule.hora}`}>
                <p>Hora: {schedule.hora}</p>
                <p>{schedule.paciente}</p>
              </div>
            )
          }) : <></>}
        </div>
      </Link>
      <button id='new-service' onClick={() => handleNewService()}><h2 id='dashboard-title'>Criar Atendimento</h2><img src={window.matchMedia("(prefers-color-scheme:dark)").matches ? "./agendamento.png" : "./agendamento-light.png"} alt="" /></button>
      <Link to='/pacientes' className="pacientes-dashboard">
        <h2 id='dashboard-title'>Pacientes <br></br>cadastrados</h2>
        <span id='paciente-number'><p id='dashboard-title'>{sessionStorage.getItem("pacientes") ? JSON.parse(sessionStorage.getItem("pacientes")).length : ""}</p> <img src={window.matchMedia("(prefers-color-scheme:dark)").matches ? "./animais-de-estimacao.png" : "./animais-de-estimacao-light.png"} alt="" /></span>
      </Link>
      <Link className='internation-dashboard' to='/internacao'>
        <h2 id='dashboard-title'>Altas do Dia</h2>
        <div className="inner-internation-dashboard">
          <p>Não há alta para hoje</p>
        </div>
      </Link>
      <Link id='materiais-button' to='/materiais'>
        <h2 id='dashboard-title'>Baixo Estoque</h2>
        {expireItens.length > 0 ?
          <div className="inner-materiais-dashboard">
            <div className="materials-dashboard-box">
              <span>{expireItens[0].quantidade}x </span><span>{expireItens[0].item}</span>
            </div>
            <div className="materials-dashboard-box" >
              <span>{expireItens[1].quantidade}x </span><span>{expireItens[1].item}</span>
            </div>
            <div className="materials-dashboard-box">
              <span>{expireItens[2].quantidade}x </span><span>{expireItens[2].item}</span>
            </div>
          </div>
          : <></>}
      </Link>
      {newService ? <ModalNewShedule handleSubmitNewService={handleSubmitNewService} handleCancel={handleCancel} /> : <></>}
    </div>
  )
}

export default Home