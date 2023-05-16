import React, { useState } from 'react'
import { EditModalOptions } from './EditModalOptions';
import { Menu } from '../icons/Menu';
import {ModalEdit} from "../components/ModalEdit"

export const Task = ({info}) => {

  const [openModal, setOpenModal] = useState(false)

  const click = ()=>{
    console.log("me hice click wn")
  }

  return (
    <>
      {
        openModal
        ? 
        <div className='modal-backdrop' onClick={()=>setOpenModal(false)}>
          <div className='card' onClick={e=>{e.stopPropagation()}}>
              <div className='card-input-date'>
                  {
                    info?.date 
                      ?<p className='little-p'>Vencimiento: {info.date} </p>
                      :""
                  }
                  <p className='title-task'>{info.title}</p>
                  {
                    info?.priority 
                      ?<p className='little-p'>Prioridad</p>
                      :""
                  }
              </div>
              <div className='menu-card-list'>
                <p className='menu-card' onClick={()=>setOpenModal(true)}><Menu className="menu"/></p> 
                <EditModalOptions state={openModal} close={()=>setOpenModal(false)} id={info.id}/>
              </div>
            </div>
        </div>
        
        : 
        <div className='card-list'>
            <div className='card'>
              <div className='card-input-date' onClick={click}>
                  {
                    info?.date 
                      ?<p className='little-p'>Vencimiento: {info.date} </p>
                      :""
                  }
                  <p className='title-task'>{info.title}</p>
                  {
                    info?.priority 
                      ?<p className='little-p'>Prioridad</p>
                      :""
                  }
                {/* <ModalEdit /> */}

              </div>
              <div className='menu-card-list'>
                <p className='menu-card' onClick={()=>setOpenModal(!openModal)}><Menu className="menu"/></p>
                {/* <EditModalOptions state={openModal} close={()=>setOpenModal(false)} id={info.id}/> */}
              </div>
            </div>
        </div>
      }
    </>
  )
}
