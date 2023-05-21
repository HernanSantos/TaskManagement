import { useState } from "react";
import { UserContext } from "./UserContext"


export const UserProvider = ({children}) => {

  const [openEditModal, setOpenEditModal] = useState(false)
  const [infoTask, setInfoTask] = useState([])

    return (
    <UserContext.Provider value={{openEditModal, setOpenEditModal,infoTask,setInfoTask}}>
        {children}
    </UserContext.Provider>
  )
}
