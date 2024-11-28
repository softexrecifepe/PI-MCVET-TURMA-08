import { useEffect, useState } from "react"
import axios from "axios"

import './ModalEditShedule.css'

const ModalEditShedule = ({ handleSubmitEditService, type }) => {

  const [schedule, setSchedule] = useState([])

  async function deleteService(id) {
    try {
      await axios.post("https://api-restiful.vercel.app/delete", {
        id: id
      })
    } catch (error) {
      console.log(error)
    }

  }

  function handleSchedule(e) {
    if (e.target.className.includes("delete")) {
      deleteService(e.target.id)
    }
  }

  useEffect(() => {
    setSchedule(JSON.parse(sessionStorage.getItem("atendimentos")))
  }, [])

  return (
    <div className="modal-bg">
      <div className='modal-new-element' id="edit-modal">
        <h2>Selecione a consulta</h2>
        <div className="inner-schedule">
          {schedule ? schedule.map((schedule) => {
            return (
              <div className="schedule-box" id="edit-schedule">
                <p>{schedule.dia}</p>
                <p>{schedule.hora}</p>
                <p>{schedule.paciente}</p>
                <span id={schedule._id} className={type === "deletar" ? "delete btn" : "btn"} onClick={(e) => handleSchedule(e)}>{type === "editar" ? "+" : "-"}</span>
              </div>)
          }) :
            <p id='empty-shedule-message'>Agenda vazia</p>
          }
        </div>
        <button onClick={() => handleSubmitEditService()}>Fechar</button>
      </div>
    </div>
  )
}

export default ModalEditShedule