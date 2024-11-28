import { useState, useEffect } from 'react'
import axios from 'axios'

import getData from '../api/requisicoesApi'

import './LoginComponent.css'

const LoginComponent = ({ handleLogin }) => {

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [users, setUsers] = useState([])

    const [loadingData, setLoadingData] = useState(false)

    async function getUsers() {
        try {
            const response = await axios.get("https://api-restiful.vercel.app/usuarios")

            setUsers(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    function handleChange(e) {
        if (e.target.id === "email-login") {
            setLoginEmail(e.target.value.toLowerCase())
        }

        if (e.target.id === "senha-login") {
            setLoginPassword(e.target.value)
        }
    }

    function handleSubmit() {

        if (users.length > 1) {
            getLogin()

        } else {
            setLoadingData(true)

            getUsers()
        }
    }

    function getLogin() {

        setLoadingData(false)

        const user = users.find((user) => user.email === loginEmail)

        const emailError = document.querySelector("#email-error")

        if (loginEmail === "" || !user) {

            emailError.innerHTML = "Digite um email válido"
        } else {

            emailError.innerHTML = ""

            if (loginPassword === "" || loginPassword !== user.senha) {
                const emailError = document.querySelector("#password-error")

                emailError.innerHTML = "Senha incorreta"
            }
        }

        if (user.senha === loginPassword) {

            handleLogin()

            sessionStorage.setItem("login", true)

            sessionStorage.setItem("admin", user.admin)

        }

    }

    function handleStorage(e) {
        if (e.target.checked) {
            localStorage.setItem("login", login)
        }
    }

    useEffect(() => {
        getUsers()

    }, [])

    useEffect(() => {
        getData()

        if(users.length > 1) {
            getLogin()
        }

    }, [loadingData])

    return (
        <>
            <div className="login-container">
                <img src={window.matchMedia("(prefers-color-scheme:dark)").matches ? "./1.png" : "./nova-logo.png"} alt="" />
                <div className='form'>
                    <h2>Faça seu login</h2>
                    <div className="input-control">
                        <input onChange={(e) => handleChange(e)} type="text" placeholder="E-mail" id="email-login" />
                        <span className="validation-input" id="email-error"></span>
                    </div>
                    <div className="input-control">
                        <input onChange={(e) => handleChange(e)} type="password" placeholder="Senha" id="senha-login" />
                        <button>esqueci minha senha</button>
                        <span className="validation-input" id="password-error"></span>
                    </div>
                    <div className="submit-control">
                        <div className="checkbox-control">
                            <label>Continuar logado
                                <input type="checkbox" onChange={(e) => handleStorage(e)} />
                            </label>
                        </div>
                        <input onClick={() => handleSubmit()} type="submit" id="submit-btn" />
                    </div>
                </div>
            </div>
            {loadingData ? <img id='loader-gif' src="loader.gif" alt="Loader Gif" /> : <></>}
        </>
    )
}

export default LoginComponent