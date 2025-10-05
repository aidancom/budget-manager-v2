import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar'
import useAppStore from '../stores/useAppStore'
import { format } from '../helpers/format';
import CategoryFilter from '../components/CategoryFilter';

const Budget = () => {

  const budget = useAppStore(state => state.budget)
  const total = (budget.available / budget.budget) * 100

  return (
    <div>
      <div className='bg-blue-500'>
        <h1 className='text-center text-4xl font-bold text-white py-5'>Planificador de gastos</h1>
      </div>
      <div className='flex justify-center mt-5 flex-col items-center space-y-10'>
        <div className='flex items-center p-5 shadow-xl/30 rounded max-w-[600px]'>
          <div>
            <CircularProgressbar
              className='pr-10'
              value={20}
              maxValue={1} 
              text={`${total}%`}
            />
          </div>
          <div className='space-y-2'>
            <p><span className='font-bold'>Presupuesto inicial:</span> {format(budget.budget)}</p>
            <p><span className='font-bold'>Gastado: </span>{format(budget.spend)}</p>
            <p><span className='font-bold'>Disponible: </span>{format(budget.available)}</p>
          </div>
        </div>
        <CategoryFilter />
      </div>

    </div>
  )
}

export default Budget
