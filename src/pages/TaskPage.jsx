import React, { useContext, useEffect, useState } from 'react'
import "../sass/style.css"
import { Modal } from '../components/Modal'
import { Task } from '../components/Task'
import { collection, onSnapshot } from 'firebase/firestore'
import { FirebaseDB } from '../firebase/config'
import { AddCard } from '../icons/AddCard'
import { UserContext } from '../context/UserContext'


export const TaskPage = () => {

  // const {openModal, setOpenModal} = useContext(UserContext);


  const [openModal, setOpenModal] = useState(false)
  const [list, setList] = useState([])

  useEffect(() => {
    onSnapshot(collection(FirebaseDB, "usuario"), (capture)=>{
      const taskList = []
      capture.docs.forEach((doc) => {
        taskList.push({...doc.data(), id:doc.id})
      })
      setList((list) => taskList)
    })
  }, [])

  return (
    <>
    <nav className='navbar'>
      <p>LOGO</p>
      <div>
        <p>aca van los iconos</p>
      </div>
      <div>
        <p>aca el usuario logeado</p>
      </div>
    </nav>

    <div className='task-page'>
      
      <div className='container-card'>
        <div className='title-container-card'>
          <h2>TAREAS A REALIZAR</h2>
        </div>
          <ul className='ul-new-task'>
            {
              list.map(data =>{
                  if(data.status == "new"){
                    return(
                        <Task key = {data.id} info = {...data}/>
                    )
                  }
              })
            }
          </ul>

          <div className='add-new-card' onClick={()=>setOpenModal(true)}>
            <AddCard className="menu"/>
            <p>Agregar nueva tarea</p>
          </div>
          <Modal statusModal={openModal} changeStatusModal={setOpenModal}/>


      </div>   

        <div className='container-card'>
          <div className='title-container-card'>
              <h2>TAREAS EN PROCESO</h2>
          </div>
          <ul className='ul-other-task'>

            {
              list.map(data =>{
                
                if(data.status == "in process"){
                  return(
                    <Task key = {data.id} info = {...data}/>
                    )
                  }
                })
              }
          </ul>
        </div>

        <div className='container-card'>
          <div className='title-container-card'>
            <h2>TAREAS FINALIZADAS</h2>
          </div>
          <ul className='ul-other-task'>
            {
                list.map(data =>{

                    if(data.status == "done"){
                      return(
                        <Task key = {data.id} info = {...data}/>
                      )
                    }
                })
              }
          </ul>
        </div>

    </div> 
    <footer className='footer-page'>
      <p>Este es el footer</p>
    </footer>

  </>
  )
}
