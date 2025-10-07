import { Button } from 'primereact/button'
import React from 'react'
import useAppStore from '../stores/useAppStore'

const ButtonReset = () => {
  return (
      <Button
        label='Resetear'
        className='bg-pink-500 text-white text-[18px] font-bold text-center rounded transition hover:bg-pink-600 w-full'
        onClick={() => useAppStore.setState({'modal_reset': true})}
      />

  )
}

export default ButtonReset
