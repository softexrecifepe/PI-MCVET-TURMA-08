import { useEffect, useState } from 'react'

import './Internacao.css'

const Internacao = ( {}) => {

  const [dayInternation, setDayInternation] = useState()

  function getDayInternations() {
    setDayInternation(JSON.parse(sessionStorage.getItem("internacoes")))

    // const result = internations.filter((dayInternations) => dayInternations.entrada === `${day}/${month}/${year}`)

    // console.log(internations)

    // setDayInternation(result.sort((a, b) => {
    //   if (a.hora < b.hora) {
    //     return -1;

    //   } else {
    //     return 1;
    //   }
    // }))

  }

  useEffect(() => {
    getDayInternations()

    
  }, [])

  console.log(dayInternation)


  return (
    <div className="internation container">
          <h2 id='dashboard-title'>Internações</h2>
          <div className="inner-internation">
          {dayInternation ? dayInternation.map((internation) => {
            return (
              <div className="internation-box">
                <p>{internation.entrada}</p>
                <p>{internation.permanencia == 1 ? internation.permanencia + " dia" : internation.permanencia + " dias"}</p>
                <p className='internation-paciente'>{internation.paciente}</p>
                <span>{internation.observacoes}</span>
              </div>)
          }) : <p> Não há internações no momento</p>}
        </div>
        </div>
  )
}

export default Internacao