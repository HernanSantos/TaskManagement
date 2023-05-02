import React, { useState } from 'react'
import { EditModalOptions } from './EditModalOptions';
import { Menu } from '../icons/Menu';


export const Task = ({info}) => {

  const [openModal, setOpenModal] = useState(false)

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
                  <p>{info.title}</p>
                  {
                    info?.priority 
                      ?<p className='little-p'>Prioridad</p>
                      :""
                  }
              </div>
              <div className='menu-card-list'>
                <p className='menu-card' onClick={()=>setOpenModal(!openModal)}><Menu className="menu"/></p>
                <EditModalOptions state={openModal} close={()=>setOpenModal(false)}/>
              </div>
            </div>
        </div>
        
        : 
        <div className='card-list'>
            <div className='card'>
              <div className='card-input-date'>
                  {
                    info?.date 
                      ?<p className='little-p'>Vencimiento: {info.date} </p>
                      :""
                  }
                  <p>{info.title}</p>
                  {
                    info?.priority 
                      ?<p className='little-p'>Prioridad</p>
                      :""
                  }
              </div>
              <div className='menu-card-list'>
                <p className='menu-card' onClick={()=>setOpenModal(!openModal)}><Menu className="menu"/></p>
                <EditModalOptions state={openModal} close={()=>setOpenModal(false)}/>
              </div>
            </div>
        </div>
      }
    </>
  )
}
