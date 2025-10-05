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

  }
})