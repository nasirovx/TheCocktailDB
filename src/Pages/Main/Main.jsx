import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import { useDispatch } from 'react-redux';
import { getPopularMeals, getPopularIngredients, getLatestCocktails, getRandomIngredients, getRandomDrinks } from '../../Redux/Drink-slice/Drink-slice';
import InfoIngredients from '../../Components/info-ingredients';
import PopularInfoIngredients from '../../Components/Popular-infoIngredients';
import AlfavitInfo from '../../Components/Alfavit-info';
import SearchInfo from '../../Components/Search-info/Search-info';

const Main = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularMeals())
    dispatch(getPopularIngredients())
    dispatch(getLatestCocktails())
    dispatch(getRandomIngredients())
    dispatch(getRandomDrinks())
  }, [])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/drink/:idDrink/:title' element={<InfoIngredients />} />
        <Route path='/ingredient/:title' element={<PopularInfoIngredients />} />
        <Route path='/alfavit/:title' element={<AlfavitInfo />} />
        <Route path='/search/:text' element={<SearchInfo />} />
      </Routes>
    </div>
  )
}

export default Main
