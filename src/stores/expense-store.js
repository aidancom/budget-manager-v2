import { toast } from "react-toastify"

export const expenseStore = (set, get) => ({
  'modal': false,
  'expenses': [],
  sendExepnse: async (data) => {
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
        } else {
          toast.error(res.message)
        }
      }
    } catch (e) {
      console.log(e)
    }
  } 
})