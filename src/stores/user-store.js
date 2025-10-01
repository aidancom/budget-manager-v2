export const userStore = (set, get) => ({
  'auth': 'login',
  'user': null,
  authUser: (data) => {
    console.log(data)
  }
})