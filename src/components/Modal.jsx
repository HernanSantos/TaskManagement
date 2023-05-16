import { useContext, useEffect, useState } from 'react'
import { Close } from '../icons/Close'
import {collection, doc, setDoc} from "firebase/firestore"
import { FirebaseDB } from '../firebase/config'
// import { UserContext } from '../context/UserContext'


export const Modal = ({statusModal,changeStatusModal}) => {

  const initialValue = {
    title: "",
    description: "",
    status: "new",
    priority: false,
    date:""
  }
  
  const [formInfo, setFormInfo] = useState(initialValue);
  // const {openModal, setOpenModal} = useContext(UserContext);


  const onFormSubmit = async(event) =>{
    event.preventDefault();
    const newTask = {
      title: formInfo.title,
      description: formInfo.description,
      status: "new",
      priority: formInfo.priority,
      date: formInfo.date
    }
    if (newTask.title){
      const newDoc = doc (collection(FirebaseDB, "usuario"));
      await setDoc(newDoc,newTask);
      setFormInfo({...initialValue})
      changeStatusModal(false)
    }
  }

  const ChangeValue = (event)=>{
    const {name, value, checked} = event.target;
    setFormInfo({...formInfo, [name]:value, priority:checked})
  }


  return (
    <>
      {
        statusModal &&
      
        <div className='container-modal'>
          <div className='modal-style'>
            <div className='header-modal'>
              <h1>NUEVA TAREA</h1>
              <span onClick={()=>changeStatusModal(false)}><Close className="menu"/></span>
            </div>

            <form onSubmit={onFormSubmit} className='form-modal'>

              <h2>Titulo</h2>
              <input type="text" name='title' onChange={ChangeValue}/>
              <h2>Fecha de vencimiento</h2>
              <input type="date" name='date' onChange={ChangeValue} />
              <h2>Descripcion tarea</h2>
              <textarea name="description" id="" cols="30" rows="20" onChange={ChangeValue}></textarea>
              <div className='checkbox'>
                <label htmlFor="priority">Marcar como prioridad</label>
                <input type="checkbox" name='priority' id='priority' onChange={ChangeValue}/>
              </div>

            <div className='buttons'>
              <button className='button-form' type='submit'>Guardar</button>
            </div>

            </form>
            <button className='button-form' onClick={()=>changeStatusModal(false)}>Cerrar</button>
          </div>
        </div>
      }
    </>
  )
}
