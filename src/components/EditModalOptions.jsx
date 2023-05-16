import { useContext, useState } from 'react'
import { deleteDoc, doc, updateDoc, getDoc} from "firebase/firestore"
import { FirebaseDB } from '../firebase/config'
import { Modal } from './Modal'
import { UserContext } from '../context/UserContext'
import { ModalEdit } from './ModalEdit'

export const EditModalOptions = ({state, close, id}) => {
  
  // const {openModal, setOpenModal} = useContext(UserContext);
  const [value, setValue] = useState()

  const [openEditModal, setOpenEditModal] = useState(false)

    const getValues = async() =>{
      if (id){
        const docTask = doc(FirebaseDB, "usuario", id);
        const docSnap = await getDoc(docTask);
        
        if (docSnap.exists()) {
          const dataId = docSnap.data()
          setValue({dataId,id}) 
        } else {
          console.log("La tarea no existe");
        }
      }
    }
  
  const prueba = async() =>{
    await getValues();
    setOpenEditModal(true)
    close()
  }



  const deleteTask = async() =>{
    const docTask = doc (FirebaseDB, "usuario",id);
    try{
      await deleteDoc(docTask);
    } catch(error){
      console.log(error)
    }
  }

  const changePriority = async() =>{

    const docTask = doc(FirebaseDB, "usuario", id);
    const docSnap = await getDoc(docTask);
    
    if (docSnap.exists()) {
      const valuePriority = docSnap.data().priority
      const investValue = !valuePriority
      const newPriority = {priority: investValue}
      await updateDoc(docTask,newPriority);
    } else {
      console.log("La tarea no existe");
    }
  }

  const changeStatus = async() =>{
    const docTask = doc(FirebaseDB, "usuario", id);
    const docSnap = await getDoc(docTask);
    
    if (docSnap.exists()) {
      const value = docSnap.data().status

        if (value == "new"){
          const newStatus = {status: "in process"}
          await updateDoc(docTask,newStatus);
        } else {
          console.log("La tarea no existe");
        }
        if(value == "in process"){
          const newStatus = {status: "done"}
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

              <div className='modal-content' onClick={close}>
                <p onClick={()=>prueba()}>Ver / Editar</p>
                <p onClick={changeStatus}>Cambiar Estado</p>
                <p onClick={changePriority}>Cambiar Prioridad</p>
                <p onClick={deleteTask}>Eliminar</p>

              </div>

        }
        {
          openEditModal &&
          <ModalEdit value={value} setState={()=>setOpenEditModal(false)}/>

        }
     </> 
  )
}
