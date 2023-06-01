import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userReducer';
import { brandReducer } from './brandReducer';
import { typeReducer } from './typeReducer';
import { catalogReducer } from './catalogReducer';
import { basketReducer } from './basketReducer';


export const store = configureStore({
  reducer: {
    user: userReducer,
    brand: brandReducer,
    type: typeReducer,
    catalog: catalogReducer,
    basket: basketReducer,
  }
})
