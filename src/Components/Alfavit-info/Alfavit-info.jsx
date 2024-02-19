import React, { useEffect } from 'react';
import s from './Alfavit-info.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Alfavit from '../Alfavit/Alfavit';
import List from '../List'
import { getAlfavitDrinks } from '../../Redux/Drink-slice/Drink-slice';

const AlfavitInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {alfavitDrinks} = useSelector((state) => state.products);
    const { title } = useParams();

    useEffect(() => {
        dispatch(getAlfavitDrinks(title))
    }, [title])

    const infoClick = (id, title) => {
        navigate(`/drink/${id}/${title}`)
    };

  return (
    <div className="container">
        <div className={s.content}>
            {alfavitDrinks ? (
                <List 
                    items={alfavitDrinks}
                    renderItem={(elem, i) => (
                        <div key={i} onClick={() => infoClick(elem.idDrink, elem.strDrink)} className={s.drink_content}>
                            <div className={s.images}>
                                <img src={elem.strDrinkThumb} alt="" />
                            </div>
                            <p>{elem.strDrink}</p>
                        </div>
                    )}
                />
            ) : (
                <h2 className={s.text}>No Drinks ound</h2>
            )}
        </div>
        <div className={s.alfavit}>
            <h2>Browes Drinks</h2>
            <br/>
            <Alfavit/>
        </div>
    </div>
  )
}

export default AlfavitInfo
