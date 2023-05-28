import { useContext, useState } from 'react'
import { deleteDoc, doc, updateDoc, getDoc} from "firebase/firestore"
import { FirebaseDB } from '../firebase/config'

import { EditTask } from './EditTask'
import { UserContext } from '../context/UserContext'

export const EditModalOptions = ({state, close, info}) => {
  const [value, setValue] = useState()
  const {id} = info;

  const stateTask = [["new","Nueva Tarea"],["developing","En Proceso"],["done","Finalizado"]]
  const {openEditModal, setOpenEditModal} = useContext(UserContext);

    const getValues = async() =>{
      if (info.id){
        const docTask = doc(FirebaseDB, "usuario", info.id);
        const docSnap = await getDoc(docTask);
        
        if (docSnap.exists()) {
          const dataId = docSnap.data()
          setValue({...dataId, id}) 
        } else {
          console.log("La tarea no existe");
        }
      }
    }
  
  const openEdit = async() =>{
    await getValues();
    setOpenEditModal(true)
    close()
  }

  const deleteTask = async() =>{
    const docTask = doc (FirebaseDB, "usuario",info.id);
    try{
      await deleteDoc(docTask);
    } catch(error){
      console.log(error)
    }
    close()
  }

  const changePriority = async() =>{

    const docTask = doc(FirebaseDB, "usuario", info.id);
    const docSnap = await getDoc(docTask);
    
    if (docSnap.exists()) {
      const valuePriority = docSnap.data().priority
      const investValue = !valuePriority
      const newPriority = {priority: investValue}
      await updateDoc(docTask,newPriority);
    } else {
      console.log("La tarea no existe");
    }
    close()
  }

  const changeStatus = async(value) =>{
    const docTask = doc(FirebaseDB, "usuario", info.id);
    const docSnap = await getDoc(docTask);
    
    if (docSnap.exists()) {
      if (value){
        const newStatus = {status: value}
        await updateDoc(docTask,newStatus);
      } else {
        console.log("La tarea no existe");
      }
  }

}

  return (
     <>
        { 
          state &&
            <div className='modal-content'>
            <p onClick={()=>openEdit()}>Ver / Editar</p>
            <ul className='change-state-hover'>
              <p className='text-hidden'>Cambiar Estado</p>
              {
                stateTask.map(state=>{
                  if(info.status != state[0]){
                    return(
                      <p key={state[0]} className='state-hidden' onClick={()=>changeStatus(state[0])}>{state[1]}</p>
                    )
                  }
                })
              }
            </ul>
            <p onClick={changePriority}>Cambiar Prioridad</p>
            <p onClick={deleteTask}>Eliminar</p>
            </div>
        }

        {
          openEditModal &&
          <EditTask value={value} setState={()=>setOpenEditModal(false)}/>
        }
     </> 
  )
}
