import React from 'react'




export const taskReducer = (state = [], action) => {

    switch(action.type){
        case "Add Task":
            return[...state, action.payload]
    }

  return state;
}
