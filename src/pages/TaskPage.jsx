import React, { useEffect, useReducer, useState } from 'react'
import "../sass/style.css"
import { Modal } from '../components/Modal'
import { Task } from '../components/Task'
import { collection, onSnapshot } from 'firebase/firestore'
import { FirebaseDB } from '../firebase/config'
import { AddCard } from '../icons/AddCard'
import { taskReducer } from '../hook/taskReducer'

const initialValue = {
  title: "",
  description: "",
  status: "new",
  priority: "off",
  date:""
}

export const TaskPage = () => {

  const [list, setList] = useState([])
  const [viewModal, setViewModal] = useState(false);

  const [task, dispatch] = useReducer(taskReducer, initialValue);
  

  useEffect(() => {
    onSnapshot(collection(FirebaseDB, "user1/9N87rMRgJdBiNDNKqASb/notes"), (capture)=>{
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

          {
              list.map(data =>{
                  if(data.status == "new"){
                    return(
                        <Task key = {data.id} info = {...data}/>
                    )
                  }
              })
          }

        <div className='add-new-card' onClick={setViewModal}>
          <AddCard className="menu"/>
          <p>Agregar nueva tarea</p>
        </div>

          <Modal state = {viewModal} setState = {()=> setViewModal(false)}/>

        </div>   

        <div className='container-card'>
          <div className='title-container-card'>
              <h2>TAREAS EN PROCESO</h2>
          </div>
            {
              list.map(data =>{

                  if(data.status == "in process"){
                    return(
                      <Task key = {data.id} info = {...data}/>
                    )
                  }
              })
            }
        </div>


        <div className='container-card'>
          <div className='title-container-card'>
            <h2>TAREAS FINALIZADAS</h2>
          </div>
          {
              list.map(data =>{

                  if(data.status == "done"){
                    return(
                      <Task key = {data.id} info = {...data}/>
                    )
                  }
              })
            }
        </div>
    </div> 
    <footer className='footer-page'>
      <p>Este es el footer</p>
    </footer>

  </>
  )
}
