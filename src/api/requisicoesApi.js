import axios from "axios"

function getData() {

    const url = "https://api-restiful.vercel.app"

    function getDate() {
        const date = new Date

        if (date.getDate() < 10) {
            sessionStorage.setItem("dia", `0${date.getDate()}`)
        } else {
            sessionStorage.setItem("dia", date.getDate())
        }

        if (date.getMonth() < 9) {
            sessionStorage.setItem("mes", `0${date.getMonth() + 1}`)
        } else {
            sessionStorage.setItem("mes", date.getMonth() + 1)

        }

        sessionStorage.setItem("ano", date.getFullYear())

    }

    async function getPets() {
        try {
            const response = await axios.get(url + "/pacientes")

            sessionStorage.setItem("pacientes", JSON.stringify(response.data))

        } catch (error) {
            console.log(error)
        }
    }

    async function getProducts() {
        try {
            const response = await axios.get(url + "/produtos")

            sessionStorage.setItem("materials", JSON.stringify(response.data))

        } catch (error) {
            console.log(error)
        }
    }

    async function getHosptalizations() {
        try {
            const response = await axios.get(url + "/internacoes")

            sessionStorage.setItem("internacoes", JSON.stringify(response.data))

        } catch (error) {
            console.log(error)
        }
    }

    async function getServices() {
        try {
            const response = await axios.get(url + "/atendimentos")

            sessionStorage.setItem("atendimentos", JSON.stringify(response.data))

        } catch (error) {
            console.log(error)
        }

    }

    getDate()
    getPets()
    getProducts()
    getHosptalizations()
    getServices()
}

export default getData