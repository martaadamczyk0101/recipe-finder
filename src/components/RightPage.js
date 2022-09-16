import React from 'react';
import Recipe from './Recipe';

export default function RightPage({recipeData, recipeInfo}) {

  return (
    <div className='whole-right'>
      { recipeData.length > 0 &&
        <>
        {recipeData.map((el, id) => {
            return <Recipe key={id} recipeData={recipeData[id]} recipeInfo={recipeInfo[id]}/>
        })}
        </>
      }

      { recipeData.length === 0 &&
        <div className='right-text'>Add ingredients and click the search button to look for recipes</div>
      }
    </div>

  )
}
