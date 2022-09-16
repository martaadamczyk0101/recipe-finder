import React from 'react'

export default function Ingredient({ing, onDelete}) {
  return (
    <div className="ingredient">
        <p>{ing.ingredient}</p>
        <button className='del-ing-btn' onClick={()=>onDelete(ing.id)}>x</button>
    </div>
  )
}
