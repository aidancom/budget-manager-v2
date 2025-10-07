import { toast } from 'react-toastify';

export const userBudget = (set, get) => ({
  budget: null,
  getBudget: async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getBudget`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'user_id': id})
      })
      const json = await res.json()
      if (json.status == 'success') {
        set({
          budget: json.response
        })
      }
    } catch (e) {
      console.log(e)
    }
  },
  sendBudget: async (data) => {
    set({
      loading: true
    })
    const data_budget = {
      'user_id': get().user?.user_id,
      'budget': parseInt(data?.budget),
      'available': parseInt(data?.budget),
      'spend': 0
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sendBudget`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data_budget)
      })
      const json = await res.json()
      if (json.status == 'success') {
        console.log("Hola")
        console.log(get().user.user_id)
        await get().getBudget(get().user.user_id)
        toast.success(json.message)
      }
    } catch(e) {
      console.log(e)
    } finally {
      set({
        loading: false
      })      
    }
  }
})