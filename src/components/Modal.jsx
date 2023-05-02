import React, { useState } from 'react'
import { Close } from '../icons/Close'
import {collection, doc, setDoc} from "firebase/firestore"
import { FirebaseDB } from '../firebase/config'

export const Modal = ({ state, setState, info}) => {

  const initialValue = {
    title: "",
    description: "",
    status: "new",
    priority: "on",
    date:""
  }

  const [formInfo, setFormInfo] = useState(initialValue);


  const ChangeValue = (event)=>{
    const {name, value} = event.target;
    setFormInfo({...formInfo, [name]:value, status:"new"})
  }

  const addNewNote = async(event) =>{
    event.preventDefault();
    const newDoc = doc (collection(FirebaseDB, "/user1/9N87rMRgJdBiNDNKqASb/notes"));
    await setDoc(newDoc,formInfo);
    setFormInfo({...initialValue})
  }

  return (
    <>
      { state &&
        <div className='container-modal'>
          <div className='modal-style'>
            <div className='header-modal'>
              {
                info?.id ? <h1>EDITAR TAREA</h1> : <h1>NUEVA TAREA</h1>
              }
              <span onClick={setState}><Close className="menu"/></span>
            </div>

            <form onSubmit={addNewNote} className='form-modal'>

              <h2>Titulo</h2>
              <input type="text" name='title' onChange={ChangeValue} defaultValue={info?.title} />
              <h2>Fecha de vencimiento</h2>
              <input type="date" name='date' onChange={ChangeValue} defaultValue={info?.date}/>
              <h2>Descripcion tarea</h2>
              <textarea name="description" id="" cols="30" rows="20" onChange={ChangeValue} defaultValue={info?.description}></textarea>
              <div className='checkbox'>
                <p>Marcar como prioridad</p>
                <input type="checkbox" name='priority' onChange={ChangeValue} value="true" defaultValue={info?.priority}/>
              </div>

            <div className='buttons'>
              <button className='button-form' type='submit'>Guardar</button>
            </div>

            </form>
            <button className='button-form' onClick={setState}>Cerrar</button>
          </div>
        </div>
      }
    </>
  )
}
