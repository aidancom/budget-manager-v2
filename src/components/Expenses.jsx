import { useEffect } from 'react'
import useAppStore from '../stores/useAppStore'
import { format } from '../helpers/format'
import { formatDate } from '../helpers/formatDate'
import { CircularProgress } from '@mui/material'

const Expenses = () => {

  const expenses = useAppStore(state => state.expenses)
  const categories = useAppStore(state => state.categories)
  const loading_category = useAppStore(state => state.loading_category)
  const getExpenses = useAppStore.getState().getExpenses

  useEffect(() => {
    getExpenses()
  }, [])

  return (
    <div className='p-5 shadow-xl/30 rounded'>
        
      <h2 className='text-center text-2xl font-bold pb-10'>Listado de gastos</h2>
      <div className={`space-y-4 max-h-[200px] overflow-auto relative ${loading_category && 'h-[90px]'}`}>
      {loading_category ? (
        <div className='absolute w-full h-full flex items-center justify-center top-0 left-0 bg-[#ffffffbf] z-999'>
          <CircularProgress />
        </div>         
      ) : (
        expenses.length ? (
        expenses.map(expense => {
          const category = categories.find(category => category.category_id === expense.expense_category_id);
          return (
            <>
            <div key={expense.id} className='flex justify-between items-center'>
              <div>
                <p className='font-bold'>{category ? category.category_name : "Sin categoría"}</p>                
                <p className='italic'>{expense.expense_name}</p>
                <p className='text-[13px]'>{formatDate(expense.expense_date)}</p>
              </div>
              <div>
                <p className='font-bold text-[19px]'>{format(expense.expense_quantity)}</p>
              </div>
            </div>
            <div className='bg-blue-500 w-full h-1'></div>
            </>
          );
        })
      ) : (
        <p className='text-center'>No hay gastos</p>
      )
      )}          

      </div>

    </div>
  )
}

export default Expenses
