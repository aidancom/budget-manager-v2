import { Button } from 'primereact/button';
import useAppStore from "../stores/useAppStore"
import { useForm } from 'react-hook-form';
import Error from '../components/Error';
import { CircularProgress } from '@mui/material';


const BudgetManager = () => {

  const user = useAppStore(state => state.user)
  const sendBudget = useAppStore(state => state.sendBudget)
  const loading = useAppStore(state => state.loading)

  const {handleSubmit, register, formState: {errors}} = useForm()

  return (
    <div>
      <div className='bg-blue-500 flex justify-center'>
        <div className='bg-white max-w-[500px] w-full mt-10 top-15 relative p-4 shadow-xl/30 rounded'>
          {loading && (
            <div className='absolute w-full h-full flex items-center justify-center top-0 left-0 bg-[#ffffffbf] z-999'>
              <CircularProgress />
            </div>         
          )}          
          <h1 className='text-center text-2xl font-bold pb-5'>Bienvenido, <span className='text-blue-500'>{user.name}</span></h1>
          <p>Para empezar, debes poner la cantidad de presupuesto que tienes disponible a continuación:</p>
          <div className='pt-5'>
            <form
              className="flex flex-col space-y-5"
              onSubmit={handleSubmit((data) => sendBudget(data))}
            >
              <input
                type="number"
                name="budget"
                placeholder="Introduce la cantidad deseada"
                className='border border-gray-500 px-2 py-1 rounded-md w-full'
                {...register("budget", {
                  required: "Este campo es obligatorio"
                })}
              />
              {errors?.budget && <Error>{errors?.budget?.message}</Error>}
              <div className='flex justify-end'>
                <Button
                  label='Enviar'
                  type='submit'
                  className='bg-blue-500 transition text-white px-4 py-1 rounded-lg font-bold hover:bg-blue-600'
                /> 
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetManager
