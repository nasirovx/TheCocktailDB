import React, { useEffect } from 'react';
import s from './Search-info.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchDrinks } from '../../Redux/Drink-slice/Drink-slice';
import List from '../List';

const SearchInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {text} = useParams();
    console.log("text>>>", text);
    const {search} = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getSearchDrinks(text))
    }, [text])

    const handleInfo = (id, title) => {
        navigate(`/drink/${id}/${title}`)
    }

  return (
    <div className='container'>
      <div className={s.content}>
        {search ? (
            <List 
                items={search}
                renderItem={(elem) => (
                    <div  onClick={() => handleInfo(elem.idDrink, elem.strDrink)} className={s.meal_content}>
                        <div className={s.images}>
                            <img src={elem.strDrinkThumb} alt="" />
                        </div>
                        <p>{elem.strDrink}</p>
                    </div>
                )}
            />
        ) : (
            <h2 className={s.text}>No product</h2>
        )}
      </div>
    </div>
  )
}

export default SearchInfo
