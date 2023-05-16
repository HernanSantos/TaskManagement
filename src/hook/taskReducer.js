import React from 'react'


export const taskReducer = (initialState, action) => {
    switch(action.type){
        case "Add Task":
          return[...initialState, action.payload];

        case "Delete Task":
          return initialState.filter( task => task.id !== action.payload)

        default:
          return initialState;
    }

}
