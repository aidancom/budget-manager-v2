import React, { useEffect } from 'react'
import useAppStore from '../stores/useAppStore'

const CategoryFilter = () => {

const categories = useAppStore(state => state.categories)
const getCategories = useAppStore.getState().getCategories

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    console.log(categories)
  }, [categories])  

  return (
    <div className='max-w-[600px] w-full'>
      <select className='w-full p-2 bg-blue-500 rounded text-white'>
        <option
          disabled={true}
          selected={true}
          value=""
        >--- Selecciona una categoria ---</option>
        {categories.length && (
          categories.map(category => (
            <option value={category.category_id}>{category.category_name}</option>
          ))
        )}
      </select>
    </div>
  )
}

export default CategoryFilter
