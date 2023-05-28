import React, { useContext, useState } from 'react'
import { EditModalOptions } from './EditModalOptions';
import { Menu } from '../icons/Menu';
import {EditTask} from "./EditTask"
import { UserContext } from '../context/UserContext';
import { dateFormat } from '../hook/dateFormat';

export const Task = ({info}) => {

  const [openModal, setOpenModal] = useState(false)
  const {openEditModal, setOpenEditModal, infoTask, setInfoTask} = useContext(UserContext);
  const {compare} = Intl.Collator();

  const saveInfo = () =>{
    setInfoTask(info);
    setOpenEditModal(true)
  }

  const openEditMenu =()=>{
    setInfoTask(info);
    setOpenModal(false)
  }

  const fecha = dateFormat(info.date)
  const dateInfo = new Date(fecha)
  const today = new Date()

  const infoDate = dateInfo.setHours(0,0,0,0);
  const todayDate = today.setHours(0,0,0,0);


  return (
    <>
      {
        openModal
        ? 
        <div className='modal-backdrop' onClick={()=>setOpenModal(false)}>
          <div className='card' onClick={e=>{e.stopPropagation()}}>
              <div className='card-input-date' onClick={saveInfo}>
                  {
                    info?.date 
                      ?<p className={`little-p ${todayDate > infoDate ? "overdue" : ""}`}>Vencimiento: {info.date} </p>
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
                <EditModalOptions state={openModal} close={openEditMenu} info={info} />
              </div>
            </div>
        </div>
        
        : 
        <div className='card-list'>
            <div className='card'>
              <div className='card-input-date' onClick={saveInfo}>
                  {
                    info?.date 
                      ?<p className={`little-p ${todayDate > infoDate ?"overdue" : ""}`}>Vencimiento: {info.date} </p>
                      :""
                  }
                  <p className='title-task'>{info.title}</p>
                  {
                    info?.priority 
                      ?<p className='little-p'>Prioridad</p>
                      :""
                  }
                {
                  openEditModal &&
                  <EditTask value={info} state={openEditModal} setState={()=>setOpenEditModal(false)} />
                }

              </div>
              <div className='menu-card-list'>
                <p className='menu-card' onClick={()=>setOpenModal(!openModal)}><Menu className="menu"/></p>
                <EditModalOptions state={openModal} close={()=>setOpenModal(false)} info={info} />
              </div>
            </div>
        </div>
      }
    </>
  )
}
