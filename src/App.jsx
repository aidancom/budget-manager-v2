import { ToastContainer } from "react-toastify"
import Auth from "./pages/Auth"


function App() {

  return (
    <>
      <Auth/>
      <ToastContainer
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  )
}

export default App
