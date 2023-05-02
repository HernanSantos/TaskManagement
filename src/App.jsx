import { Route, Routes } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { TaskPage } from "./pages/TaskPage"


export const App = () => {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/" element={<TaskPage/>}/>
    </Routes>
  )
}

