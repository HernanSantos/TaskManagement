import { useState } from "react";
import { Close } from "../icons/Close"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


export const EditTask = ({setState}) => {

    const {infoTask} = useContext(UserContext);
    const [formInfo, setFormInfo] = useState({
      title: infoTask.title,
      description: infoTask.description,
      status: infoTask.status,
      priority: infoTask.priority,
      date: infoTask.date,
    });

    const ChangeValue = (event)=>{
      const {name, value, checked} = event.target; 
      setFormInfo({...infoTask, [name]:value, priority:checked})
    }
    
    const onFormSubmit = async(event) =>{
      event.preventDefault();
      const docTask = doc(FirebaseDB, "usuario", infoTask.id);
      const docSnap = await getDoc(docTask);
      
      if (docSnap.exists()) {
        const NewValuesId = {
          title: formInfo.title,
          description: formInfo.description,
          status: formInfo.status,
          priority: formInfo.priority,
          date: formInfo.date,
        }
        await updateDoc(docTask,NewValuesId);
      } else {
        console.log("La tarea no existe");
      }
      setState(false)
    }
    

    const close = () =>{
      setState(false)
    }
  
    return (
          <div className='container-modal' onClick={close}>
            <div className='modal-style' onClick={e=>{e.stopPropagation()}}>
              <div className='header-modal'>
                  <h1>EDITAR TAREA</h1>
                <span onClick={close}><Close className="menu"/></span>
              </div>

              <form onSubmit={onFormSubmit} className='form-modal'>

                <h2>Titulo</h2>
                <input type="text" name='title' onChange={ChangeValue} defaultValue={infoTask?.title} />
                <h2>Fecha de vencimiento</h2>
                <input type="date" name='date' onChange={ChangeValue} defaultValue={infoTask?.date}/>
                <h2>Descripcion tarea</h2>
                <textarea name="description" id="" cols="30" rows="20" onChange={ChangeValue} defaultValue={infoTask?.description}></textarea>
                <div className='checkbox'>
                  <label htmlFor="priority">Marcar como prioridad</label>
                  <input type="checkbox" name='priority' id='priority' onChange={ChangeValue} defaultChecked={infoTask?.priority}/>
                </div>

              <div className='buttons'>
                <button className='button-form' type='submit'>Guardar</button>
              </div>

              </form>
              <button className='button-form' onClick={close}>Cerrar</button>
            </div>
          </div>
  )
}
