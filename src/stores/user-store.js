import { toast } from "react-toastify"

export const userStore = (set, get) => ({
  'auth': 'login',
  'user': localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
  'logged': localStorage.getItem('logged') ? localStorage.getItem('logged') : false,
  'loading': false,
  authUser: async (data) => {
    set({
      loading: true
    })
    if (get().auth == 'register') {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/registerUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        const json = await res.json()
        if (json.status == 'success') {
          toast.success(json.message)
          set({
            auth: 'login'
          })
        } else {
           toast.error(json.message)
        }
      } catch (e) {
        toast.error("Error al registrar el usuario")
      } finally {
        set({
          loading: false
        })
      }

    } else {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/loginUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        const json = await res.json()
        if (json.status == 'success') {
          toast.success(json.message)
          set({
            user: json.response,
            logged: true
          })
        } else {
          toast.error(json.message)
        }
      } catch (e) {
        toast.error("Error al intentar entrar")
      } finally {
        set({
          loading: false
        })
      }    
    }
  }
})