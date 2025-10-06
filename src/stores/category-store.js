export const categoryStore = (set, get) => ({
  categories: [],
  getCategories: async () => {
    try {
      const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getCategories`)
      const res = await req.json()
      if (res.status == 'success') {
        set({
          categories: res.response
        })
      }
    } catch (e) {
      console.log(e)
    }
  },
  changeCategory: async (data) => {
    set({
      loading: true
    })
    try {
      const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getExpensesByCategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'budget_id': get().budget.budget_id, 'category_id': data})
      })
      const res = await req.json()
      if (res.status === 'success') {
        set({ expenses: res.response });
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