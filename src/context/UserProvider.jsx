import { useState } from "react";
import { UserContext } from "./UserContext"


export const UserProvider = ({children}) => {

    const [openModal, setOpenModal] = useState(false);

    return (
    <UserContext.Provider value={{openModal, setOpenModal}}>
        {children}
    </UserContext.Provider>
  )
}
