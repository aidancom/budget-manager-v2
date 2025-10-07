import { Button } from "primereact/button"
import useAppStore from "../stores/useAppStore"
import { motion } from "framer-motion"
import { CircularProgress } from "@mui/material"

const ConfirmResetModal = ({modal_reset}) => {

  const resetApp = useAppStore(state => state.resetApp)
  const loading_reset = useAppStore(state => state.loading_reset)

  return (
    <div className="absolute w-full h-full flex items-center justify-center top-0 bg-[#0000008f] flex-col">
  
      <motion.div 
        className="w-[400px] bg-white p-3 rounded relative"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}  
        key={modal_reset}      
      >
      {loading_reset && (
        <div className='absolute w-full h-full flex items-center justify-center top-0 left-0 bg-[#ffffffbf] z-999 rounded'>
          <CircularProgress />
        </div>         
      )}            
      <h3 className="text-center text-2xl font-bold pb-3">¿Confirmar para resetear la app?</h3>
      <p className="pb-4">Al darle a continuar, se eliminara todo resgistro asociado a la cuenta. Si no deseas continuar, cancela para volver</p>
      <div className="flex justify-between">
        <Button
          label="Continuar"
          className='bg-blue-500 transition text-white px-4 py-1 rounded-lg font-bold hover:bg-blue-600'
          onClick={() => resetApp()}
        />
        <Button
          label="Cancelar"
          className='bg-red-500 transition text-white px-4 py-1 rounded-lg font-bold hover:bg-red-600'
          onClick={() => useAppStore.setState({'modal_reset': false})}
        />
      </div>
      </motion.div>
    </div>
  )
}

export default ConfirmResetModal
