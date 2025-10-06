import useAppStore from '../stores/useAppStore'

import Error from '../components/Error';
import Header from '../components/Header'

import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { CircularProgress } from '@mui/material';


const Auth = () => {

  const auth = useAppStore(state => state.auth)
  const authUser = useAppStore(state => state.authUser)
  const loading = useAppStore(state => state.loading)

  const {handleSubmit, register, formState: { errors }} = useForm()
  
  return (
    <div className='w-full h-screen'>
      <Header/>
      <div className='flex justify-center items-center h-full w-full absolute top-0'>
        <form 
          className='shadow-xl/30 rounded p-5 relative'
          onSubmit={handleSubmit(async (data) =>  await authUser(data))}
        >
          {loading && (
            <div className='absolute w-full h-full flex items-center justify-center top-0 left-0 bg-[#ffffffbf] z-999'>
              <CircularProgress />
            </div>         
          )}
 
          <h1 className='text-center font-bold pb-3 text-2xl'>{auth == 'register' ? "Registrarse" : "Entrar"}</h1>
          <div
            className='space-y-3'
          >
            {auth == 'register' && (
              <fieldset>
                <input
                  placeholder='Ingresa tu nombre'
                  name='name'
                  className='border border-gray-500 px-2 py-1 rounded-md w-full'
                  {...register("name", {
                    required: "El nombre es obligatorio"
                  })}
                />
                {errors?.name && <Error>{errors?.name?.message}</Error>}                    
              </fieldset>
            )}
            <fieldset>
                <input
                  placeholder='Ingresa tu usuario'
                  name='user'
                  className='border border-gray-500 px-2 py-1 rounded-md w-full'
                  {...register("user", {
                    required: "El usuario es obligatorio"
                  })}                  
                />
              {errors?.user && <Error>{errors?.user?.message}</Error>}                
            </fieldset>

            <fieldset>
                <input
                  type="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  className="border border-gray-500 px-2 py-1 rounded-md w-full"
                  {...register("password", { 
                    required: "La contraseña es obligatoria"
                   })}
                />
                {errors?.password && <Error>{errors?.password?.message}</Error>}   
            </fieldset>
          </div>
          <div 
            className='text-end mt-4'
          >
            <Button
              label='Enviar'
              type='submit'
              className='bg-blue-500 transition text-white px-4 py-1 rounded-lg font-bold hover:bg-blue-600'
            /> 
          </div>
                  
        </form>
      </div>

    </div>
  )
}

export default Auth
