import { useState } from "react";
import { Close } from "../icons/Close"
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";


export const ModalEdit = ({setState ,value}) => {

    const{dataId, id} = value;
    const [formInfo, setFormInfo] = useState(dataId);

  const ChangeValue = (event)=>{
    const {name, value, checked} = event.target;
    setFormInfo({...formInfo, [name]:value, priority:checked})
  }
  

  const onFormSubmit = async(event) =>{
    event.preventDefault();
    const docTask = doc(FirebaseDB, "usuario", id);
    const docSnap = await getDoc(docTask);
    
    if (docSnap.exists()) {
      const NewValuesId = {
        title: formInfo.title,
        description: formInfo.description,
        status: formInfo.status,
        priority: formInfo.priority,
        date: formInfo.date
      }
      await updateDoc(docTask,NewValuesId);
    } else {
      console.log("La tarea no existe");
    }
    setState(false)
  }
  
  
    return (

        <div className='container-modal'>
          <div className='modal-style'>
            <div className='header-modal'>
                <h1>EDITAR TAREA</h1>
              <span onClick={setState}><Close className="menu"/></span>
            </div>

            <form onSubmit={onFormSubmit} className='form-modal'>

              <h2>Titulo</h2>
              <input type="text" name='title' onChange={ChangeValue} defaultValue={dataId?.title} />
              <h2>Fecha de vencimiento</h2>
              <input type="date" name='date' onChange={ChangeValue} defaultValue={dataId?.date}/>
              <h2>Descripcion tarea</h2>
              <textarea name="description" id="" cols="30" rows="20" onChange={ChangeValue} defaultValue={dataId?.description}></textarea>
              <div className='checkbox'>
                <label htmlFor="priority">Marcar como prioridad</label>
                <input type="checkbox" name='priority' id='priority' onChange={ChangeValue} defaultChecked={dataId?.priority}/>
              </div>

            <div className='buttons'>
              <button className='button-form' type='submit'>Guardar</button>
            </div>

            </form>
            <button className='button-form' onClick={()=>setState()}>Cerrar</button>
          </div>
        </div>
  )
}
