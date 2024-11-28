import { useState, useEffect } from 'react'

import './Materiais.css'

import FunctionsInput from '../components/FunctionsInput'
import ModalNewElement from '../components/ModalNewElement'

const Materiais = () => {

  const [newItem, setNewItem] = useState(false)
  const [materials, setMaterials] = useState([])
  const [filterArray, setFilterArray] = useState([])

  function handleSearch(e) {
    setFilterArray(materials.filter((material) => material.item.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  function handleClean() {
    setFilterArray(materials)
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
    document.querySelector("body").style.overflowY = "auto"
  }

  useEffect(() => {

    setMaterials(JSON.parse(sessionStorage.getItem("materiais")))
    setFilterArray(JSON.parse(sessionStorage.getItem("materiais")))

  },[])

  return (
    <div className='materiais container'>
      <FunctionsInput element={"material"} handleNewElement={handleNewElement} handleSearch={handleSearch} handleClean={handleClean}/>
      <div className="materiais-grid">
        <div className="materials-list">
          <h2>Estoque de Materiais</h2>
          <div className="inner-list" id='stock'>
            {JSON.parse(sessionStorage.getItem("materiais")) ? filterArray.map((produto) => {
              return (
                <div className="materials-box" id={produto.item}>
                  <img src={produto.imagem} alt="" />
                  <p id='product-name'>{produto.item}</p>
                  <p>{produto.quantidade}x</p>
                  <p>R$ {produto.valor}</p>
                </div>
              )
            }) : <p style={{textAlign: "center", fontSize: "2rem", margin: "2rem 0", color: "var(--background-color)"}}>Material não encontrado</p>}
          </div>
        </div>
      </div>
      {newItem ? <ModalNewElement element={"material"} handleSubmitElement={handleSubmitElement} /> : <></>}
    </div>
  )
}

export default Materiais