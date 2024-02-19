import React, { useEffect } from 'react';
import s from './Popular-infoIngredients.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import List from '../List/List';
import { getInfoIngredients, getInfoTypes } from  '../../Redux/Drink-slice/Drink-slice'
import Alfavit from '../Alfavit';

const PopularInfoIngredients = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { title } = useParams();
  const {infoIngredients, types} = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getInfoIngredients(title))
    dispatch(getInfoTypes(title))
  }, [])

  const handleDrink = (id, title) => {
    navigate(`/drink/${id}/${title}`)
}
  console.log("InfoIngredient>>>",infoIngredients);
  console.log("types>>>", types);

  return (
    <div className='container'>
      <div className={s.content}>
        <div className={s.title}>
          <h2>{title}</h2>
          <div className={s.content_title}>
            <img src={`https://www.thecocktaildb.com/images/ingredients/${title}.png`} alt={title} />
          </div>
        </div>
        <div className={s.images_title}>
          <h2>Drinks</h2>
          <div className={s.images}>
            <List 
              items={infoIngredients}
              renderItem={(elem, i) => (
                <div key={i} className={s.images_item}>
                  <div onClick={() => handleDrink(elem.idDrink, elem.strDrink)} className={s.item}>
                    <img  src={elem.strDrinkThumb} alt={elem.strDrink} />
                  </div>
                  <p>{elem.strDrink}</p>
                </div>
              )}
            />
          </div>
        </div>
      </div>
      <List
        items={types && types}
        renderItem={(elem) => (
          <div>
          <div className={s.description}>
            <h3>Description</h3>
              <p>{elem.strDescription}</p>
          </div>
          <div className={s.description}>
            <h3>Type</h3>
              <p>{elem.strType}</p>
          </div>
          </div>
        )}
      />
      <div className={s.alfavit}>
        <h3>Browse More</h3>
          <div className={s.alfavit_content}>
            <Alfavit/>
          </div>
      </div>
    </div>
  )
}
export default PopularInfoIngredients
