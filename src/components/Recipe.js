import React from 'react'

export default function Recipe({recipeData, recipeInfo}) {
  return (
    <div className='recipe'>
        <a href={recipeInfo.sourceUrl}>
            <img className="recipe-img" src={recipeData.image} alt='' ></img>
        <h2 className='recipe-title'>{recipeData.title}</h2>
        </a>
        <p className='recipe-ing-desc'>You have {recipeData.usedIngredientCount} of {recipeData.usedIngredientCount+recipeData.missedIngredientCount} required ingredients.</p>
    </div>
  )
}