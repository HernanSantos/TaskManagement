import React, { useEffect, useState } from 'react'
import "../sass/style.css"
import { AddNewTask } from '../components/AddNewTask'
import { Task } from '../components/Task'
import { collection, onSnapshot } from 'firebase/firestore'
import { FirebaseDB } from '../firebase/config'
import { AddCard } from '../icons/AddCard'


export const TaskPage = () => {

  const [openModal, setOpenModal] = useState(false)
  const [list, setList] = useState([])

  useEffect(() => {
    onSnapshot(collection(FirebaseDB, "usuario"), (capture)=>{
      const taskList = []
      capture.docs.forEach((doc) => {
        taskList.push({...doc.data(), id:doc.id})
      })
      const sortList = taskList.slice().sort((a,b) => a.creation - b.creation)
      setList((list) => sortList)
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
          <AddNewTask statusModal={openModal} changeStatusModal={setOpenModal}/>


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
