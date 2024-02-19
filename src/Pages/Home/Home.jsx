import React, {useState} from 'react';
import s from './Home.module.css';
import { useSelector } from 'react-redux';
import List from '../../Components/List/List';
import DrinkItem from '../../Components/Drink-item/Drink-item';
import PopularIngredients from '../../Components/Popular-ingredients/Popular-ingredients';
import { useNavigate } from 'react-router-dom';
import Random from '../../Components/randomImngredients/random'
import Alfavit from '../../Components/Alfavit';

const Home = () => {

    const { popular, popularIngredients, latest, randomIngredients, randomDrinks } = useSelector((state) => state.products);
    console.log("popular>>", popular);
    console.log("latest>>", latest);
    console.log("popularIngredients>>", popularIngredients);
    console.log("randomIngredients>>>", randomIngredients);
    console.log("randomDrinks>>>", randomDrinks);

    const navigate = useNavigate();

    const handleDrink = (id, title) => {
        navigate(`/drink/${id}/${title}`)
    }

    const handleIngredient = ( title) => {
        navigate(`/ingredient/${title}`)
    }

    const randomItems = []
    for(let i = 0; i < 4; i++){
      let randomIndex = Math.floor(Math.random() * randomIngredients.length)
      randomItems.push(randomIngredients[randomIndex])
    }

    const randomDrinksItem = []
    for(let i = 0; i < 8; i++){
      let randomIndex = Math.floor(Math.random() * randomDrinks.length)
      randomDrinksItem.push(randomDrinks[randomIndex])
    }

    const [input, setInput] = useState('');
    const handleSubmit = (e) =>{
      e.preventDefault();
      navigate(`/search/${input}`)
      setInput('')
    } 

  return (
    <section>
        <div className="container">
        <div className={s.header}>
          <div className={s.img_right}>
            <img src="https://www.thecocktaildb.com/images/cocktail_left.png" alt="" />
          </div>
          <div className={s.header_content}>
            <h1>Welcome to TheCocktailDB</h1>
            <span>An open, crowd-sourced database of drinks and cocktails from around the world.</span>
            <span>We also offer a <span className={s.span}>free cocktail API </span> for anyone wanting to use it.</span>
            <span>If you like the site, please consider supporting us on Patreon by clicking the link below...</span>
              <div className={s.header_img}>
                <img src="https://www.thecocktaildb.com/images/patreon_logo.png" alt="" />
              </div>
              <span className={s.span}>Click to upgrade free API to premium for $3</span>
              <span>Currently (336 supporters)</span>
          </div>
          <div className={s.img_right }>
            <img src="https://www.thecocktaildb.com/images/cocktail_right.png" alt="" />
          </div>
        </div>
            <div className={s.home_search}>
                <form className={s.form} onSubmit={handleSubmit}>
                        <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='  Search for a Cocktail..'/>
                        <button type='submit'><i class="fa-solid fa-magnifying-glass"></i></button>
                </form>
                <div className={s.block}>
                    <div className={s.img}><img src="https://www.thecocktaildb.com/images/icons/cocktail-logo.png" alt="" /></div> Total Drinks: 636  
                    <div className={s.img}><img src="https://www.thecocktaildb.com/images/icons/ingredient-logo.png" alt="" /></div> Total Ingredients: 489  
                    <div className={s.img}><img src="https://www.thecocktaildb.com/images/icons/image2.png" alt="" /></div> Drink Images: 636(93cc)
                </div>
            </div>
            <div className={s.popular_drinks}>
                <h3>Popular Drinks</h3>
                <div className={s.drinks_content}>
                    <List 
                        items={popular && popular}
                        renderItem={(elem, i) => {
                            if(i<8){
                                return <DrinkItem key={i} {...elem} onClick={() => handleDrink(elem.idDrink, elem.strDrink)} />
                            }
                        }}
                    />
                </div>
            </div>
            <div className={s.popular}>
                <h3>Popular Ingredients</h3>
                <div className={s.popular_ingredients}>
                <List
                    items={popularIngredients}
                    renderItem={(elem, i) => {
                        if(i < 4){
                        return <PopularIngredients key={i} {...elem} onClick={() => handleIngredient( elem.strIngredient)}/>
                        }
                    }}
                />
                </div>
            </div>
            <div className={s.popular_drinks}>
                <h3>Latest Drinks</h3>
                <div className={s.drinks_content}>
                    <List 
                        items={latest && latest}
                        renderItem={(elem, i) => {
                            if(i<8){
                                return <DrinkItem key={i} {...elem} onClick={() => handleDrink(elem.idDrink, elem.strDrink)}/>
                            }
                        }}
                    />
                </div>
            </div>
            <div className={s.popular}>
                <h3>Random Ingredients</h3>
                <div className={s.popular_ingredients}>
                <List
                    items={randomItems}
                    renderItem={(elem, i) => {
                        return <Random key={i} {...elem} onClick={() => handleIngredient( elem.strIngredient1)}/>
                    }}
                />
                </div>
            </div>
            <div className={s.random_drinks}>
                <h3>Random Drinks</h3>
                <div className={s.drinks_content}>
                    <List 
                        items={randomDrinksItem}
                        renderItem={(elem, i) => {
                                return <DrinkItem key={i} {...elem} onClick={() => handleDrink(elem.idDrink, elem.strDrink)}/>
                        }}
                    />
                </div>
            </div>
            <div className={s.alfavit}>
                <h3>Browse By Name</h3>
                <div className={s.alfavit_content}>
                <Alfavit/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home
