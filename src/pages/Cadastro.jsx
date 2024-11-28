import { useEffect, useState } from "react"

import axios from "axios"

import './Cadastro.css'

const Cadastro = () => {

    const [userCreated, setUserCreated] = useState(false)

    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userBirth, setUserBirth] = useState("")
    const [userPhone, setUserPhone] = useState("")
    const [userAmin, setUserAdmin] = useState(false)

    async function createUser() {
        try {
            await axios.post("https://api-restiful.vercel.app/usuario", {
                nome: userName,
                nascimento: userBirth,
                email: userEmail,
                telefone: userPhone,
                senha: "1234",
                admin: userAmin
            })

        } catch (error) {
            console.log(error)
        }

    }

    function handleChange(e) {

        if (e.target.id === "sing-up-name") {
            setUserName(e.target.value.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase()))
        }

        if (e.target.id === "sing-up-email") {
            setUserEmail(e.target.value)
        }

        if (e.target.id === "sing-up-birth") {
            setUserBirth(e.target.value)
        }

        if (e.target.id === "sing-up-phone") {
            setUserPhone(e.target.value.replace(/[^0-9]/g, "").replace(/(\d{2})?(\d{1})?(\d{4})?(\d{4})/, "($1) $2 $3-$4"))
        }

        if (e.target.id === "sing-up-admin") {
            setUserAdmin(e.target.checked)
        }

    }

    function handleSubmit(e) {
        e.preventDefault()

        if (userName !== "" && userEmail !== "" && userBirth !== "" && userPhone !== "") {

            createUser()

            setUserCreated(true)

        } else {
            const validationSpans = document.querySelectorAll(".validation-input")

            validationSpans.forEach((span) => {
                span.innerHTML = "Dado necessário"
            })
        }
    }

    useEffect(() => {
        document.querySelector("#sing-up-name").value = userName

        document.querySelector("#sing-up-phone").value = userPhone

    }, [userName, userPhone])

    return (<>
        {userCreated ? <div className="user-created">
            <p>Usuário criado com sucesso</p>
            <button onClick={() => setUserCreated(false)}>Criar novo usuário</button>
            </div> : <form className='sing-up-form' onSubmit={(e) => handleSubmit(e)}>
            <h2>Cadastro de usuários</h2>
            <div className="input-control">
                <label>Nome completo
                    <input onChange={(e) => handleChange(e)} type="text" name="nome" id="sing-up-name" />
                    <span className="validation-input"></span>
                </label>
            </div>
            <div className="input-control">
                <label>Email
                    <input onChange={(e) => handleChange(e)} type="text" name="email" id="sing-up-email" />
                    <span className="validation-input"></span>
                </label>
            </div>
            <div className="input-control">
                <label>Telefone
                    <input onChange={(e) => handleChange(e)} type="text" name="phone" id="sing-up-phone" />
                    <span className="validation-input"></span>
                </label>
            </div>
            <div className="input-control">
                <label>Data de nascimento
                    <input onChange={(e) => handleChange(e)} type="date" name="birth" id="sing-up-birth" />
                    <span className="validation-input"></span>
                </label>
            </div>
            <div className="input-control checkbox">
                <label>Adiministrador?
                    <input onChange={(e) => handleChange(e)} type="checkbox" name="admin" id="sing-up-admin" />
                    <span className="validation-input"></span>
                </label>
            </div>
            <div className="submit-control">
                <input type="submit" id="create-user" />
                <input type="reset" />
            </div>
        </form>}
        </>)
}

export default Cadastro