import { toast } from "react-toastify"

export const expenseStore = (set, get) => ({
  'modal': false,
  'expenses': [],
  sendExepnse: async (data) => {
    set({
      loading: true
    })
    try {
      const body_expense = {
        'budget_id': get().budget.budget_id,
        ...data
      }
      const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sendExpense`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body_expense)
      })
      const res = await req.json()
      if (res.status) {
        if (res.status == 'success') {
          toast.success(res.message)
          set({
            modal: false
          })
          get().getExpenses()
          get().getBudget(get().user.user_id)
        } else {
          toast.error(res.message)
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      set({
        loading: false
      })
    }
  },
  getExpenses: async () => {
    try {
      const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getUserExpenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'budget_id': get().budget.budget_id})
      })
      const res = await req.json()
      if (res.status == 'success') {
        set({
          expenses: res.response
        })
      }
    } catch(e) {
      console.log(e)
    }
  }
  
})