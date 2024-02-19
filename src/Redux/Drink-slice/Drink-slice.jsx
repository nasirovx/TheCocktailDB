import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from '../../Http/Setting'

const initialState = {
    popular: [],
    popularIngredients: [],
    latest: [],
    infoCocktail: [],
    infoIngredients: [],
    randomIngredients: [],
    randomDrinks: [],
    search: [],
    alfavitDrinks: [],
    types: []
};


export const getLatestCocktails = createAsyncThunk("/latest/getLatestCocktails", async (_, { rejectWithValue, dispatch }) => {
    try {
        const drinkNumbers = [
            178371, 178370, 178369, 178368, 178367, 178366, 178365, 178364,
        ]
        const results = await Promise.all(
            drinkNumbers.map(async (number) => {
                const result = await instance.get(`/lookup.php?i=${number}`)
                return result.data.drinks
            })
        )
        const combinedDrinks = results.flat()
        dispatch(getLatestCocktail(combinedDrinks))
    } catch (error) {
        rejectWithValue(error.message)
    }
})

export const getPopularMeals = createAsyncThunk("popular/getPopularMeals", async (_, {rejectWithValue, dispatch}) => {
    try {
        const drinkNumbers = [
            11000, 11001, 11002, 11003,11004,11005,11006,11007,
        ]
        const results = await Promise.all(
            drinkNumbers.map(async (number) => {
                const result = await instance.get(`/lookup.php?i=${number}`)
                return result.data.drinks
            })
        )
        const combinedDrinks = results.flat()
        dispatch(getPopularMeal(combinedDrinks))
    } catch (error) {
        rejectWithValue(error.message)
    }
})

export const getPopularIngredients = createAsyncThunk("popularIngredients/getPopularIngredients", async (_, {rejectWithValue, dispatch}) => {
    try {
        const drinkNumbers = [
            1, 2, 3,4
        ]
        const results = await Promise.all(
            drinkNumbers.map(async (number) => {
                const result = await instance.get(`/lookup.php?iid=${number}`)
                return result.data.ingredients
            })
        )
        const combinedDrinks = results.flat()
        dispatch(getPopularIngredient(combinedDrinks))
    } catch (error) {
        rejectWithValue(error.message)
    }
})

export const getInfoCocktails = createAsyncThunk("infoCocktail/getInfoCocktails", async (elem, {rejectWithValue, dispatch}) => {
    try {
        const res = await instance.get(`/lookup.php?i=${elem}`)
        dispatch(getInfoCocktail(res.data.drinks))
    } catch (error) {
        rejectWithValue(error.message)
    }
})

export const getInfoIngredients = createAsyncThunk("infoIngredients/getInfoIngredients", async (elem, {rejectWithValue, dispatch}) => {
    try {
        const res = await instance.get(`/filter.php?i=${elem}`)
        dispatch(getInfoIngredient(res.data.drinks))
    } catch (error) {
        rejectWithValue(error.message)
    }
})

export const getRandomIngredients = createAsyncThunk("randomIngredients/getRandomIngredients", async (_, {rejectWithValue, dispatch}) => {
    try {
        const res = await instance.get("/list.php?i=list")
        dispatch(getRandomIngredient(res.data.drinks))
    } catch (error) {
        rejectWithValue(error.message)
    }
})

export const getRandomDrinks = createAsyncThunk("randomDrinks/getRandomDrinks", async (_, {rejectWithValue, dispatch}) => {
    try {
        const res = await instance.get("/filter.php?c=Cocktail")
        dispatch(getRandomDrink(res.data.drinks))
    } catch (error) {
        rejectWithValue(error.message)
    }
})

export const getAlfavitDrinks = createAsyncThunk("alfavitDrinks/getAlfavitDrinks", async (elem, {rejectWithValue, dispatch}) => {
    try {
        const res = await instance.get(`/search.php?f=${elem}`);
        dispatch(getAlfavitDrink(res.data.drinks))
    } catch (error) {
        rejectWithValue(error.message)
    }
})

export const getSearchDrinks = createAsyncThunk('search/getSearchDrinks', async (elem, {dispatch}) => {
    const result = await instance.get(`/search.php?s=${elem}`);
    dispatch(getSearchDrink(result.data.drinks))
})

export const getInfoTypes = createAsyncThunk("types/getInfoTypes", async (elem, {rejectWithValue, dispatch}) => {
    try {
        const res = await instance.get(`/search.php?i=${elem}`)
        dispatch(getInfoType(res.data.ingredients))
    } catch (error) {
        rejectWithValue(error.message)
    }
})

const drinkSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getPopularMeal: (state, action) => {
            state.popular = action.payload
        },
        getPopularIngredient: (state, action) => {
            state.popularIngredients = action.payload
        },
        getLatestCocktail: (state, action) => {
            state.latest = action.payload
        },
        getInfoCocktail: (state, action) => {
            state.infoCocktail = action.payload
        },
        getInfoIngredient: (state, action) => {
            state.infoIngredients = action.payload
        },
        getRandomIngredient: (state, action) => {
            state.randomIngredients = action.payload 
        },
        getRandomDrink: (state, action) => {
            state.randomDrinks = action.payload
        },
        getSearchDrink: (state, action) => {
            state.search = action.payload;
        },
        getAlfavitDrink: (state, action) => {
            state.alfavitDrinks = action.payload
        },
        getInfoType: (state, action) => {
            state.types = action.payload
        }
    },
});

export const { getPopularMeal, getPopularIngredient, getLatestCocktail, getInfoCocktail, getInfoIngredient, getRandomIngredient, getRandomDrink, getAlfavitDrink, getSearchDrink, getInfoType} = drinkSlice.actions;

export default drinkSlice.reducer;