import './App.css';
import './components/LeftPage.css'
import './components/RightPage.css'
import './components/Navbar.css'
import LeftPage from './components/LeftPage';
import RightPage from './components/RightPage';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {

  const [recipeData, setRecipeData]= useState([]);
  const [recipeInfo, setRecipeInfo]= useState([]);

  const getRecipeData=(data)=>{
    setRecipeData(data);
  }

  const getRecipeInfo=(data)=>{
    setRecipeInfo(data)
  }

  return (
    <div className="App">
        <Navbar/>
        <LeftPage getRecipeData={getRecipeData} getRecipeInfo={getRecipeInfo}/>
        <RightPage recipeData={recipeData} recipeInfo={recipeInfo}/>
    </div>
  );
}

export default App;
