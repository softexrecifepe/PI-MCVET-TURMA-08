import { NavLink } from "react-router-dom"

import { useState, useEffect } from "react"

import './Navbar.css'

const Navbar = ({ handleFinishSession, orientation }) => {

    const [menuMobile, setMenuMobile] = useState()
    const [menuMobilePosition, setMenuMobilePosition] = useState()

    function handleMenuMobile() {

        if (menuMobile === "none") {
            setMenuMobile("flex")
            setMenuMobilePosition("50vw")

        } else {
            setMenuMobile("none")
            setMenuMobilePosition("0")
        }


    }

    useEffect(() => {
        if (window.matchMedia("(max-width: 900px)").matches) {
            setMenuMobile("none")
            setMenuMobilePosition("0")
        } 

    },[orientation])

    return (
        <div className={menuMobile === "flex" ? "nav-bar-container mobile-show" : "nav-bar-container"}>
            <nav style={{display: menuMobile, width: menuMobilePosition}}>
                <img id="nav-logo" src={window.matchMedia("(prefers-color-scheme:dark)").matches ? "./2.png" : "./nav-logo-light.png"} alt="Logo Mascot's" />
                <div className="nav-links">
                    <NavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to="/">
                        Home
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to="/agenda">
                        Agenda
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to="/pacientes">
                        Pacientes
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to="/internacao">
                        Internação
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to="/materiais">
                        Materiais
                    </NavLink>
                    {sessionStorage.getItem("admin") === "true" ? <NavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to="/cadastro">
                        Cadastro
                    </NavLink> : 
                    <NavLink style={{opacity: "0.5", border:"none", pointerEvents: "none"}}>
                        Cadastro
                    </NavLink>}
                    <a className="links" onClick={() => handleFinishSession()}>
                        Sair
                    </a>
                </div>
            </nav>
            <div style={{left:menuMobilePosition}} className="menu-mobile-container" onClick={() => handleMenuMobile()}>
                <img src="mobile-icon-light.png" alt="Mobile Icon" />
                <p>Menu</p>
            </div>
        </div>
    )
}

export default Navbar