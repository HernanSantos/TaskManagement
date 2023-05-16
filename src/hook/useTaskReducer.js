import React, { useEffect, useReducer } from 'react'
import { taskReducer } from './taskReducer'


export const useTaskReducer = () => {
  
    const initialState = []

    const init = () =>{
        return JSON.parse(localStorage.getItem("")) || []
    }
    
    const [tasks, dispatch] = useReducer(taskReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem("task",JSON.stringify(tasks))
    }, [tasks])
    

    const handleNewTask = (task)=>{
        const action ={
            type: "Add Task",
            payload: task
        }
        dispatch(action)
    }

    const handleDeleteTask = (id) =>{
        const action ={
            type: "Delete Task",
            payload: id
        }
        dispatch(action)
    }

    return {
        handleDeleteTask,
        handleNewTask,
        tasks
    }
}
