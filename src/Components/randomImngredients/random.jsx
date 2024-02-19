import React from 'react';
import s from './random.module.css';

const Random = ({strIngredient1, onClick}) => {
  return (
    <div className={s.content_ingredient} onClick={onClick}>
      <div className={s.images}>
        <img src={`https://www.thecocktaildb.com/images/ingredients/${strIngredient1}.png`} alt="" />
      </div>
      <p>{strIngredient1}</p>
    </div>
  )
}

export default Random
