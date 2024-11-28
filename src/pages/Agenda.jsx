import { useState, useEffect } from 'react'

import './Agenda.css'

import ModalNewShedule from '../components/ModalNewShedule'
import ModalEditShedule from '../components/ModalEditShedule'

import getData from '../api/requisicoesApi'

const Agenda = () => {

  const [selectDate, setSelectDate] = useState([])
  const [newService, setNewService] = useState(false)
  const [dayShedule, setDayShedule] = useState([])
  const [editService, setEditService] = useState(false)

  const [type, setType] = useState("")

  const [pacientes, setPacientes] = useState([])


  function handleChangesDate(e) {
    setSelectDate(e.target.value.split("-"))
  }

  function getDayShedule() {

    if (sessionStorage.getItem("atendimentos")) {
      const result = JSON.parse(sessionStorage.getItem("atendimentos")).filter((daySchedule) => daySchedule.dia === `${selectDate[0]}-${selectDate[1]}-${selectDate[2]}`)

      console.log(sessionStorage.getItem("atendimentos"))

      setDayShedule(result.sort((a, b) => {
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

  function handleEditService(e) {

    setEditService(true)

    setType(e.target.id)

  }

  function handleSubmitEditService() {
    setEditService(false)
  }

  function handleSubmitService() {
    setNewService(false)

  }

  function handleCancel() {
    setNewService(false)
  }

  useEffect(() => {

    setSelectDate([sessionStorage.getItem("ano"), sessionStorage.getItem("mes"), sessionStorage.getItem("dia")])

    setPacientes(JSON.parse(sessionStorage.getItem("pacientes")))

  }, [])

  useEffect(() => {

    getDayShedule()

  }, [selectDate])

  useEffect(() => {

    getData()

  }, [newService])

  return (
    <div className='agenda container'>
      <div className="menu-agenda">
        <input type="date" value={selectDate[0] + "-" + selectDate[1] + "-" + selectDate[2]} onChange={(e) => handleChangesDate(e)} />
        <button onClick={(e) => handleNewService(e)}>Criar Atendimento</button>
        <button id='editar' onClick={(e) => handleEditService(e)}>Editar Atendimento</button>
        <button id='deletar' onClick={(e) => handleEditService(e)}>Cancelar Atendimento</button>
      </div>
      <div className="day-container">
        <h2>Agenda do dia {selectDate[2]}/{selectDate[1]}</h2>
        <div className="inner-schedule">
          {dayShedule.length > 0 ? dayShedule.map((schedule) => {
            return (
              <div className="schedule-box">
                <p>{schedule.hora}</p>
                <p>{schedule.paciente}</p>
                <div className="service-box">
                  {schedule.servicos.map((servico) => {
                    return <span className='service-span'>{servico}</span>
                  })}
                </div>
              </div>)
          }) :
            <p id='empty-shedule-message'>Não há agenda para o dia selecionado</p>
          }
        </div>
      </div>
      {newService ? <ModalNewShedule handleSubmitService={handleSubmitService} handleCancel={handleCancel} /> : <></>}
      {editService ? <ModalEditShedule type={type} handleSubmitEditService={handleSubmitEditService} /> : <></>}
    </div>
  )
}

export default Agenda