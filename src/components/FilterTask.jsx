import { useEffect, useState } from "react";
import { Close } from "../icons/Close";

export const FilterTask = ({isOpen, onClose, position,actFilterValue}) => {

  if(!isOpen){
    return null;
  }

  const modalStyle = {
    position: "absolute",
    top: position.top,
    left: position.left,
    transform: "translate(-50%, 0%)"
    }

  const creationFilter = ()=>{
    actFilterValue("creation");
    onClose()
  }

  const dateFilter = ()=>{
    actFilterValue("date");
    onClose()
  }

  const priorityFilter = () =>{
    actFilterValue("priority");
    onClose()
  }

  return (

    <div className='filter-options-container' style={modalStyle}>
      <div className="div-title-closeModal">
        <p className='title-filter'>Filtrar tareas</p>
        <span className="close-filter-options" onClick={onClose}><Close className="small"/></span>
      </div>

        <div className='line-title'></div>

        <ul className='ul-filter-options'>
            <p onClick={dateFilter}>Por vencimiento</p>
            <p onClick={priorityFilter}>Por vencimiento con prioridad</p>
            <p onClick={creationFilter}>Por creación</p>
        </ul>
    </div>
  )
}
