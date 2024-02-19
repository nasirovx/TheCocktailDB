import React from 'react'
import s from './Popular-ingredients.module.css';

const PopularIngredients = ({strIngredient, onClick}) => {
  return (
    <div className={s.content_ingredient} onClick={onClick}>
      <div className={s.images}>
        <img src={`https://www.thecocktaildb.com/images/ingredients/${strIngredient}.png`} alt="" />
      </div>
      <p>{strIngredient}</p>
    </div>
  )
}

export default PopularIngredients
