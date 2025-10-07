import { create } from "zustand";
import { userStore } from "./user-store";
import { userBudget } from "./budget-store";
import { categoryStore } from "./category-store";
import { expenseStore } from "./expense-store";
import { resetStore } from "./reset-store";

const useAppStore = create((set, get) => ({
  ...userStore(set, get),
  ...userBudget(set, get),
  ...categoryStore(set, get),
  ...expenseStore(set, get),
  ...resetStore(set, get)
}))

export default useAppStore