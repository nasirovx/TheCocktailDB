import { configureStore } from "@reduxjs/toolkit";
import DrinkSlice from "./Drink-slice/Drink-slice";

const store = configureStore({
    reducer: {
        products: DrinkSlice
    }
});

export default store