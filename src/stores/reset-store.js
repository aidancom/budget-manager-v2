import { toast } from "react-toastify"

export const resetStore = (set, get) => ({
  'modal_reset': false,
  'loading_reset': false,
  resetApp: async () => {
    set({
      loading_reset: true
    })
    try {
      const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/deleteBudgetFromUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'user_id': get().user.user_id, 'budget_id': get().budget.budget_id})
      })
      const res = await req.json()
      if (res?.status == 'success') {
        toast.success(res?.message)
        set({
          budget: null
        })
      } else {
        toast.error(res?.message)
      }
    } catch (e) {
      console.log(e)
    } finally {
      set({
        loading_reset: false,
        modal_reset: false
      })
    }
  }
})