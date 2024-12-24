import {configureStore} from '@reduxjs/toolkit';
import MyProductReducer from './MyProductSlice';
import MyCartReducer from './MyCartSlice';
import MyCartReducer1 from '../Redux/MyCartSlice';
import PMCartItems from '../Redux/Items';
import BTSwitch from '../Redux/BTSwitch';
import PMAddons from '../Redux/PMAddons';

export const mystore = configureStore({
  reducer: {
    product: MyProductReducer,
    cart: MyCartReducer,
    addon: MyCartReducer1,
    Items: PMCartItems,
    BTSwitch: BTSwitch,
    PMAddons: PMAddons,
  },
});
