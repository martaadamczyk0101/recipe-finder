import React from 'react'
import { useState } from 'react';
import Ingredient from './Ingredient';

export default function LeftPage({getRecipeData, getRecipeInfo}) {

    const [ingredient, setIngredient] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);
    const [index, setIndex]= useState(0);
    const [ranking, setRanking]= useState(1);

    var recipeIds;

    const deleteIngredient=(del_id)=>{
        setIngredientsList(ingredientsList.filter((ingredient)=> ingredient.id !== del_id))
    }

    const handleSubmit=(e)=> {
        if(ingredient)
        {
            setIngredientsList([...ingredientsList, {id:index,ingredient:ingredient}]);
            setIndex(index+1)
                    
        }
        setIngredient("");
      }

    const handleChangeCheckbox = event => {
       if (event.target.checked) {
          setRanking(2);
          console.log('checked');
        } else {
          setRanking(1);
          console.log("NOT checked");
        }
      };

    const sendRequest=()=>{
        var names = ingredientsList.map(function(el) {
            return el['ingredient'];
          });
        names= names.join();
        const axios = require("axios");

        const options = {
          method: 'GET',
          url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
          params: {
            ingredients: names,
            number: '10',
            ignorePantry: 'true',
            ranking: ranking
          },
          headers: {
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'db6409671emsh1d25ad81f0cd5b8p17b1e6jsn3666920689d5'
          }
        };
        
        axios.request(options).then(function (response) {
            getRecipeData(response.data);

            recipeIds= response.data.map(function(el) {
                return el['id'];
              });
            recipeIds= recipeIds.join();
     
            sendRequestGetInfo();

        }).catch(function (error) {
            console.error(error);
        });
    }

    const sendRequestGetInfo=()=>{
        const axios = require("axios");

        const options = {
          method: 'GET',
          url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk',
          params: {ids: recipeIds},
          headers: {
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'X-RapidAPI-Key': 'db6409671emsh1d25ad81f0cd5b8p17b1e6jsn3666920689d5'
          }
        };
        
        axios.request(options).then(function (response) {
            getRecipeInfo(response.data);
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <div className='whole-left'>
            <div className="add-ing">
              <div className='add-ing-div'>
                <input className="add-ing-input" type='text' maxLength="25" value={ingredient} placeholder='Add ingredient...' onChange={(event) => {
                    setIngredient(event.target.value)
                }
                }/>
                <div className='add-ing-button-div'>
                  <button className="add-ing-button" onClick={
                      handleSubmit
                  }>Add</button>
                </div>
              </div>
                <button className='get-recipes-btn' onClick={
                    sendRequest
                }
                ><img className='search-img' src={require('.//search.png')} alt=""/></button>
            </div>

            <div className="toggle-checkbox-wrapper">
                <input className="toggle-checkbox" type="checkbox" id="toggle" onChange={handleChangeCheckbox}/>
                <label className="slider" for="toggle">
                <span className="toggle-switch opt1">Maximize used ingredients</span>
                <span className="toggle-switch opt2">Minimize missing ingredients</span>
                </label>
            </div>

            <div className='display-ingredients'>
                {ingredientsList.map((ingredient, id) => {
                    return <Ingredient key={ingredient.id} ing={ingredient} onDelete={deleteIngredient} />
                })}
            </div>

        </div>
    )
}

