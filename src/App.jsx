import { useApi } from "./hooks/useApi"
import { useEffect } from "react"

import { ToastContainer } from "react-toastify"

import Auth from "./pages/Auth"
import useAppStore from "./stores/useAppStore"
import BudgetManager from "./pages/BudgetManager"
import Budget from "./pages/Budget"


function App() {

  const logged = useAppStore(state => state.logged)
  const user = useAppStore(state => state.user)
  const budget = useAppStore(state => state.budget)
  
  const { data } = useApi('/getBudget', 'POST', { user_id: user.user_id });  
  
  useEffect(() => {
    localStorage.setItem('logged', logged)
    localStorage.setItem('user',  JSON.stringify(user))
  }, [logged, user])

  useEffect(() => {
    if (data) {
      useAppStore.setState({budget: data.response})
    }
  }, [data]);

  return (
    <>
      {logged && user ? (
        budget ? (
          <Budget/>
        ) : (
          <BudgetManager/>
        )
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
