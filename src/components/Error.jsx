import React from 'react'

const Error = ({children}) => {
  return (
    <p className='bg-red-400  text-center mt-2 text-white'>
      {children}
    </p>
  )
}

export default Error
