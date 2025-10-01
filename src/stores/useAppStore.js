import { create } from "zustand";
import { userStore } from "./user-store";

const useAppStore = create((set, get) => ({
  ...userStore(set, get)
}))

export default useAppStore