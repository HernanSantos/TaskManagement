import React, { useEffect, useRef, useState } from 'react'
import "../sass/style.css"
import { AddNewTask } from '../components/AddNewTask'
import { Task } from '../components/Task'
import { collection, onSnapshot } from 'firebase/firestore'
import { FirebaseDB } from '../firebase/config'
import { AddCard } from '../icons/AddCard'
import { Filter } from '../icons/Filter'
import { FilterTask } from '../components/FilterTask'


export const TaskPage = () => {

  const [openModal, setOpenModal] = useState(false) //controla la apertura del modal "newtask"
  const [list, setList] = useState([]) //lista con las tareas obtenido de firebase, sigue siendo util?
  const [openFilterModal, setOpenFilterModal] = useState(false) //este modal controla la apertura del filtro
  const [modalPosition, setModalPosition] = useState({top:0,left:0}); // determina la posicion

  const [filterValue, setFilterValue] = useState("") //contiene el valor del filtro (new,process y done)
  const [selectFilter, setSelectFilter] = useState("")

  //contiene la lista de tareas original
  const [newTask, setNewTask] = useState([]);
  const [developingTask, setDevelopingTask] = useState([]);
  const [doneTask, setDoneTask] = useState([]);
  
  //contiene la lista de tareas filtrada segun el estado de "statusFilter"
  const [filterNewTask, setFilterNewTask] = useState([]);
  const [filterDevelopingTask, setFilterDevelopingTask] = useState([]);
  const [filterDoneTask, setFilterDoneTask] = useState([]);

  
  //contiene el estado de cada lista a filtrar, esto deberia de modif con el filtro y guardarse
  const [statusFilter, setStatusFilter] = useState({
    new:"",
    developing:"",
    done:""
  })

  //referencias para obtener las coordenadas del filtro
  const filterRefNew = useRef(null);
  const filterRefDeveloping = useRef(null);
  const filterRefDone = useRef(null);

  //permite comparar las fechas de forma mas exacta
  const {compare} = Intl.Collator();


  useEffect(() => {

    if(selectFilter){
      setStatusFilter({...statusFilter, [selectFilter]:filterValue})
    }

    const newTaskFilter = () =>{
      switch(statusFilter.new){
        case "creation":
          const creationList = newTask.slice().filter(task => task.creation != "").sort((a,b) => a.creation - b.creation)
          setFilterNewTask(creationList)
          return ;

        case "date":
          const dateList = newTask.slice().filter(task => task.date != "").sort((a,b) => compare(a.date, b.date))
          setFilterNewTask(dateList)
          return;

        case "priority":
          const priorityList = newTask.slice().filter(task => task.priority == true).sort((a,b) => compare(a.date, b.date))
          setFilterNewTask(priorityList)
          return;

        default:
          setFilterNewTask(newTask)
          return;
         }
    }

    const developingTaskFilter = () =>{
      switch(statusFilter.developing){
        case "creation":
          const creationList = developingTask.slice().filter(task => task.creation != "").sort((a,b) => a.creation - b.creation)
          setFilterDevelopingTask(creationList)
          return ;

        case "date":
          const dateList = developingTask.slice().filter(task => task.date != "").sort((a,b) => compare(a.date, b.date))
          setFilterDevelopingTask(dateList)
          return;

        case "priority":
          const priorityList = developingTask.slice().filter(task => task.priority == true).sort((a,b) => compare(a.date, b.date))
          setFilterDevelopingTask(priorityList)
          return;

        default:
          setFilterDevelopingTask(developingTask)
          return;
         }
    }

    const doneTaskFilter = () =>{
      switch(statusFilter.done){
        case "creation":
          const creationList = doneTask.slice().filter(task => task.creation != "").sort((a,b) => a.creation - b.creation)
          setFilterDoneTask(creationList)
          return ;

        case "date":
          const dateList = doneTask.slice().filter(task => task.date != "").sort((a,b) => compare(a.date, b.date))
          setFilterDoneTask(dateList)
          return;

        case "priority":
          const priorityList = doneTask.slice().filter(task => task.priority == true).sort((a,b) => compare(a.date, b.date))
          setFilterDoneTask(priorityList)
          return;

        default:
          setFilterDoneTask(doneTask)
          return;
         }
    }

    newTaskFilter();
    developingTaskFilter();
    doneTaskFilter();

    setSelectFilter("")
    setFilterValue("")
  }, [filterValue])
  

  //funcion para calcular las coordenadas de cada tarea segun el filtro donde se hace clic
  const handleBoxClick = (filterRef)=>{
    const filterRect = filterRef.current.getBoundingClientRect();
    setOpenFilterModal(true);
    setModalPosition({
      top: filterRect.top+50,
      left: filterRect.left+20
    });
    setSelectFilter(filterRef.current.id)
  }

  //se pasa la funcion a filterTask, permite cerrarlo desde el mismo
  const closeModal = () =>{
    setOpenFilterModal(false)
  }

  //recolecta la info de firebase en la lista y luego filtra segun su status
  useEffect(() => {
    onSnapshot(collection(FirebaseDB, "usuario"), (capture)=>{
      const taskList = []
      capture.docs.forEach((doc) => {
        taskList.push({...doc.data(), id:doc.id})
      })

      setList(taskList)

      //raro hay que arreglarlo
      const lala = taskList.slice().filter(task => task.status == "new")
      setFilterNewTask(lala)
      setNewTask(lala)
      const lala2 = taskList.slice().filter(task => task.status == "developing")
      setDevelopingTask(lala2)
      setFilterDevelopingTask(lala2)
      const lala3 = taskList.slice().filter(task => task.status == "done")
      setDoneTask(lala3)
      setFilterDoneTask(lala3)

    })
  }, [])

  //obtiene el valor del filtro (new,process y done)
  const actFilterValue = (value) =>{
    setFilterValue(value)
  }

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
            <span className='filter-task-container' id='new' ref={filterRefNew} onClick={()=> handleBoxClick(filterRefNew)}>
              <Filter className={`filterSize ${statusFilter.new != "creation" && statusFilter.new != "" ?"filterFill" :""}`}/>
            </span>
        </div>
          <ul className='ul-new-task'>
            {
              filterNewTask.map(data =>{
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
              <span className='filter-task-container' id='developing' ref={filterRefDeveloping} onClick={()=> handleBoxClick(filterRefDeveloping)}>
                <Filter className={`filterSize ${statusFilter.developing != "creation" && statusFilter.developing != "" ?"filterFill" :""}`}/>
              </span>
          </div>
          <ul className='ul-other-task'>

            {
              filterDevelopingTask.map(data =>{
                
                if(data.status == "developing"){
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
            <span className='filter-task-container' id='done' ref={filterRefDone} onClick={()=> handleBoxClick(filterRefDone)}>
              <Filter className={`filterSize ${statusFilter.done != "creation" && statusFilter.done != "" ?"filterFill" :""}`}/>
            </span>
          </div>
          <ul className='ul-other-task'>
            {
                filterDoneTask.map(data =>{

                    if(data.status == "done"){
                      return(
                        <Task key = {data.id} info = {...data}/>
                      )
                    }
                })
              }
          </ul>
        </div>

        {
          openFilterModal &&
          <FilterTask 
            isOpen={openFilterModal} 
            onClose={closeModal} 
            position={modalPosition}
            actFilterValue={actFilterValue}
          />
        }

    </div> 
    <footer className='footer-page'>
      <p>Este es el footer</p>
    </footer>

  </>
  )
}
