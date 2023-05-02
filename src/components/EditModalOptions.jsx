import React from 'react'
import { Modal } from './Modal'


export const EditModalOptions = ({state, close}) => {

  return (

     <div>
        { 
            state &&
              <div className='modal-content' onClick={()=>close()}>
                <p >Editar</p>
                <p onClick={()=>console.log("Mover")}>Mover</p>
                <p onClick={()=>console.log("Prioridad")}>Prioridad</p>
                <p onClick={()=>console.log("Eliminar")}>Eliminar</p>
              </div>
        }
     </div> 
  )
}
