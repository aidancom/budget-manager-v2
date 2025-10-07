import { useForm } from "react-hook-form"
import useAppStore from "../stores/useAppStore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { Button } from "primereact/button"
import { motion } from "framer-motion"
import { CircularProgress } from "@mui/material"

const Modal = ({modal}) => {

  const categories = useAppStore(state => state.categories)
  const sendExepnse = useAppStore(state => state.sendExepnse)
  const loading = useAppStore(state => state.loading)
  
  const {handleSubmit, register, formState: {errors}} = useForm()

  return (
    <div className="absolute w-full h-full flex items-center justify-center top-0 bg-[#0000008f] flex-col">
      
      <motion.div 
        className="max-w-[500px] w-full px-5"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}  
        key={modal}      
      >
        <div className="flex justify-end">
          <FontAwesomeIcon
            className="bg-white px-3 py-1 rounded-tl-sm rounded-tr-sm cursor-pointer"
            icon={faXmark}
            onClick={() => useAppStore.setState({'modal': false})}
          />
        </div>

        <form 
          className="bg-white rounded-tl-sm rounded-b-sm p-3 space-y-4 relative"
          onSubmit={handleSubmit((data) => sendExepnse(data))}
          >
            <h2 className="text-2xl font-bold text-center">Añadir nuevo <span className="text-blue-500">gasto</span></h2>
            <div className="w-full bg-blue-500 h-1"></div>            
          {loading && (
            <div className='absolute w-full h-full flex items-center justify-center top-0 left-0 bg-[#ffffffbf] z-999'>
              <CircularProgress />
            </div>         
          )}                 
          <fieldset className="flex flex-col space-y-1">
            <label>Nombre del gasto</label>
            <input
              type="text"
              name="expense_name"
              placeholder="Introduce el nombre del gasto"
              className={`bg-gray-200 rounded px-2 py-1 ${errors?.expense_name && 'border-red-500 border'}`}
              {...register("expense_name", {
                required: "Este campo es obligatorio"
              })}
            />
          </fieldset>
          <fieldset className="flex flex-col space-y-1">
            <label>Categoria del gasto</label>
            <select
              {...register("expense_category_id", {
                required: "Este campo es obligatorio"
              })}
              className={`bg-gray-200 rounded px-2 py-1 ${errors?.expense_category_id && 'border-red-500 border'}`}
            >
              <option value="">--- Selecciona una categoria ---</option>
              {categories.length && (
                categories.map(category => (
                  <option value={category.category_id}>{category.category_name}</option>
                ))
              )}
            </select>
          </fieldset>        
          <fieldset className="flex flex-col space-y-1">
            <label>Cantidad del gasto</label>
            <input
              type="number"
              name="expense_quantity"
              placeholder="Introduce la cantidad del gasto"
              className={` bg-gray-200 rounded px-2 py-1 ${errors?.expense_quantity && 'border-red-500 border'}`}
              {...register("expense_quantity", {
                required: "Este campo es obligatorio"
              })}              
            />
          </fieldset>
          <fieldset className="flex flex-col space-y-1">
            <label>Fecha del gasto</label>
            <input
              type="date"
              name="expense_date"
              defaultValue={new Date().toISOString().split('T')[0]}
              className={`bg-gray-200 rounded px-2 py-1 ${errors?.expense_date && 'border-red-500 border'}`}
              {...register("expense_date", {
                required: "Este campo es obligatorio"
              })}                      
            />
          </fieldset>
            <Button
              label='Enviar'
              type='submit'
              className='bg-blue-500 transition text-white px-4 py-1 rounded-lg font-bold hover:bg-blue-600 w-full'
            />                           
        </form>
      </motion.div>
    </div>

  )
}

export default Modal
