import 'react-circular-progressbar/dist/styles.css';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import useAppStore from '../stores/useAppStore'
import { format } from '../helpers/format';
import CategoryFilter from '../components/CategoryFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal';
import { AnimatePresence } from 'framer-motion';
import Expenses from '../components/Expenses';
import ButtonReset from '../components/ButtonReset';
import ConfirmResetModal from '../components/ConfirmResetModal';

const Budget = () => {

  const budget = useAppStore(state => state.budget)
  const modal = useAppStore(state => state.modal);
  const modal_reset = useAppStore(state => state.modal_reset);
  const total = budget.budget 
    ? Math.min(Math.round((budget.spend / budget.budget) * 100), 100) 
    : 0;

  return (
    <div className='relative h-screen'>
      <div className='bg-blue-500'>
        <h1 className='text-center text-4xl font-bold text-white py-5'>Planificador de gastos</h1>
      </div>
      <div className='flex justify-center mt-5 flex-col items-center space-y-10'>
        <div className='flex items-center p-5 shadow-xl/30 rounded max-w-[600px] w-full'>
          <div>
            <CircularProgressbar
              className='pr-10'
              value={total}
              maxValue={100} 
              text={`${total}%`}
              styles={buildStyles({
                pathColor: '#155DFC',
                trailColor: '#f5f5f5',
                textSize: 15,
                textColor: '#4A5565'
              })}               
            />
          </div>
          <div className='space-y-2'>
            <div>
              <ButtonReset/>
            </div>
            <p><span className='font-bold'>Presupuesto:</span> {format(budget.budget)}</p>
            <p><span className='font-bold'>Gastado: </span>{format(budget.spend)}</p>
            <p><span className='font-bold'>Disponible: </span>{format(budget.available)}</p>
          </div>
        </div>
        <div className='max-w-[600px] w-full'>
          <CategoryFilter />
        </div>
        <div className='max-w-[600px] w-full'>
          <Expenses/>
        </div>
      </div>
      <div 
        className='bg-blue-500 absolute bottom-0 right-0 px-3 py-3 rounded-[100%] m-5 cursor-pointer text-white text-2xl'
        onClick={() => useAppStore.setState({'modal': true})}
        >
        <FontAwesomeIcon icon={faPlus}/>
      </div>
      <AnimatePresence>
        {modal && (
            <Modal
              modal={modal}
            />
        )}  
      </AnimatePresence>
      <AnimatePresence>
        {modal_reset && (
            <ConfirmResetModal
              modal_reset={modal_reset}
            />
        )}  
      </AnimatePresence>      
    </div>
  )
}

export default Budget
