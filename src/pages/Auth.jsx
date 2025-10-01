import useAppStore from '../stores/useAppStore'

import Error from '../components/Error';
import Header from '../components/Header'

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';

const Auth = () => {

  const auth = useAppStore(state => state.auth)
  const authUser = useAppStore(state => state.authUser)

  const {handleSubmit, reset, register, formState: { errors }} = useForm()



  return (
    <div className='w-full h-screen'>
      <Header/>
      <div className='flex justify-center items-center h-full w-full absolute top-0'>
        <form 
          className='shadow-xl/30 rounded p-5'
          onSubmit={handleSubmit((data) => authUser(data))}
        >
          <h1 className='text-center font-bold pb-3 text-2xl'>{auth == 'register' ? "Registrarse" : "Entrar"}</h1>
          <div
            className='space-y-3'
          >
            {auth == 'register' && (
              <fieldset>
                <InputText
                  placeholder='Ingresa tu nombre'
                  className='border border-gray-500 px-2 py-1 rounded-md w-full'
                  {...register("name", {
                    required: "El nombre es obligatorio"
                  })}
                />
                {errors?.name && <Error>{errors?.name?.message}</Error>}                    
              </fieldset>
            )}
            <fieldset>
                <InputText
                  placeholder='Ingresa tu usuario'
                  className='border border-gray-500 px-2 py-1 rounded-md w-full'
                  {...register("user", {
                    required: "El usuario es obligatorio"
                  })}                  
                />
              {errors?.user && <Error>{errors?.user?.message}</Error>}                
            </fieldset>

            <fieldset>
                <InputText
                  type="password"
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
