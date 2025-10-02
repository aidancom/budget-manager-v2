import { ToastContainer } from "react-toastify"
import Auth from "./pages/Auth"
import useAppStore from "./stores/useAppStore"
import BudgetManager from "./pages/BudgetManager"
import { useEffect } from "react"


function App() {

  const logged = useAppStore(state => state.logged)
  const user = useAppStore(state => state.user)

  useEffect(() => {
    localStorage.setItem('logged', logged)
    localStorage.setItem('user',  JSON.stringify(user))
  }, [logged, user])

  return (
    <>
      {logged && user ? (
        <BudgetManager/>
      ) : (
        <Auth/>
      )}

      <ToastContainer
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  )
}

export default App
