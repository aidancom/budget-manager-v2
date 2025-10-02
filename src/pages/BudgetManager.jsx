import { Button } from 'primereact/button';
import useAppStore from "../stores/useAppStore"


const BudgetManager = () => {

  const user = useAppStore(state => state.user)

  return (
    <div>
      <div className='bg-blue-500 flex justify-center'>
        <div className='bg-white max-w-[500px] w-full mt-10 top-15 relative p-4 border'>
          <h1 className='text-center text-2xl font-bold pb-5'>Bienvenido, <span className='text-blue-500'>{user.name}</span></h1>
          <p>Para empezar, debes poner la cantidad de presupuesto que tienes disponible a continuación:</p>
          <div className='pt-5'>
            <form
              className="flex flex-col space-y-5"
            >
              <input
                type="number"
                name="budget"
                placeholder="Introduce la cantidad deseada"
                className='border border-gray-500 px-2 py-1 rounded-md w-full'
              />
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
