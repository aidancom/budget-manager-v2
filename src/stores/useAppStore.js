import { create } from "zustand";
import { userStore } from "./user-store";
import { userBudget } from "./budget-store";
import { categoryStore } from "./category-store";

const useAppStore = create((set, get) => ({
  ...userStore(set, get),
  ...userBudget(set, get),
  ...categoryStore(set, get)
}))

export default useAppStore