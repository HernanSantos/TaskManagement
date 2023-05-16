import { UserProvider } from "./context/UserProvider"
import { TaskPage } from "./pages/TaskPage"


export const App = () => {

  return (
      <UserProvider>
        <TaskPage/>
      </UserProvider>
  )
}

