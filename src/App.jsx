import { useState, useEffect } from 'react'

import { Outlet } from 'react-router-dom'

import './App.css'

import getData from './api/requisicoesApi'

import Navbar from './components/Navbar'
import LoginComponent from './components/LoginComponent'

function App() {

  const [login, setLogin] = useState(false)
  const [orientation, setOrientation] = useState(false)

  function handleFinishSession() {
    localStorage.clear()
    sessionStorage.clear()
    setLogin(false)
  }

  function handleLogin() {
    setLogin(true)
  }

  window.addEventListener("orientationchange", () => {
    setOrientation(true)
  })

  useEffect(() => {

    if (localStorage.getItem("login")) {
      setLogin(localStorage.getItem("login"))
    }

    if (sessionStorage.getItem("login")) {
      setLogin(sessionStorage.getItem("login"))
    }


  }, [])

  return (

    <div className="app">
      {login || sessionStorage.getItem("login") || localStorage.getItem("login") ? <>
        <Navbar orientation={orientation} handleFinishSession={handleFinishSession} />
        <div className="side-container">
          <Outlet />
        </div>
      </> : <LoginComponent handleLogin={handleLogin} />}
    </div>
  )
}

export default App
