import { useForm } from "react-hook-form"
import useAppStore from "../stores/useAppStore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { Button } from "primereact/button"
import { motion } from "framer-motion"

const Modal = ({modal}) => {

  const categories = useAppStore(state => state.categories)
  const sendExepnse = useAppStore(state => state.sendExepnse)
  
  const {handleSubmit, register, formState: {errors}} = useForm()

  return (
    <div className="absolute w-full h-full flex items-center justify-center top-0 bg-[#0000008f] flex-col">
      
      <motion.div 
        className="w-[300px]"
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
          className="bg-white rounded-tl-sm rounded-b-sm p-3 space-y-4"
          onSubmit={handleSubmit((data) => sendExepnse(data))}
          >
          <fieldset className="flex flex-col space-y-1">
            <label>Nombre del gasto</label>
            <input
              type="text"
              name="expense_name"
              placeholder="Introduce el nombre del gasto"
              className={`border rounded px-2 ${errors?.expense_name && 'border-red-500'}`}
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
              className={`border rounded px-2 ${errors?.expense_category_id && 'border-red-500'}`}
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
              type="text"
              name="expense_quantity"
              placeholder="Introduce la cantidad del gasto"
              className={`border rounded px-2 ${errors?.expense_quantity && 'border-red-500'}`}
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
              className={`border rounded px-2 ${errors?.expense_date && 'border-red-500'}`}
              {...register("expense_date", {
                required: "Este campo es obligatorio"
              })}                      
            />
          </fieldset>
            <Button
              label='Enviar'
              type='submit'
              className='bg-blue-500 transition text-white px-4 py-1 rounded-lg font-bold hover:bg-blue-600'
            />                           
        </form>
      </motion.div>
    </div>

  )
}

export default Modal
