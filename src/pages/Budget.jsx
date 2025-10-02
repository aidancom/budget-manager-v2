import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar'
import useAppStore from '../stores/useAppStore'

const Budget = () => {

  const budget = useAppStore(state => state.budget)

  return (
    <div>
      <div className='bg-blue-500'>
        <h1 className='text-center text-4xl font-bold text-white py-5'>Planificador de gastos</h1>
      </div>
      <div className='flex justify-center mt-5'>
        <div className='flex items-center p-5 shadow-xl/30 rounded max-w-[600px]'>
          <div>
            <CircularProgressbar
              className='pr-10'
              value={20}
              maxValue={1} 
              text={`20%`}
            />
          </div>
          <div className='space-y-2'>
            <p><span className='font-bold'>Presupuesto inicial:</span> {budget.budget}</p>
            <p><span className='font-bold'>Gastado: </span>{budget.spend}</p>
            <p><span className='font-bold'>Disponible: </span>{budget.available}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Budget
