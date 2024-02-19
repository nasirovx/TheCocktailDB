import React from 'react';
import s from './Drink-item.module.css';

const DrinkItem = ({strDrink, strDrinkThumb, onClick}) => {
  return (
    <div className={s.content} onClick={onClick}>
      <div className={s.images}>
        <img src={strDrinkThumb} alt="" />
      </div>
      <p>{strDrink}</p>
    </div>
  )
}

export default DrinkItem
