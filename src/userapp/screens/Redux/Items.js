import {createSlice} from '@reduxjs/toolkit';

const PMItems = createSlice({
  name: 'Items',
  initialState: [],
  reducers: {
    addToPMCart(state, action) {
      const itemIndex = state.findIndex(item => item.id === action.payload.id);

      if (itemIndex === -1) {
        // If the item doesn't exist in the cart, add it as a new item
        return [
          ...state,
          {
            id: action.payload.id,
            category: action.payload.category,
            subcategory: action.payload.subcategory,
            itemname: action.payload.itemname,
            volume: action.payload.volume,
            weight: action.payload.weight,
            offerPrice: action.payload.offerPrice,
            packingPrice: action.payload.packingPrice,
            qty: 1,
          },
        ];
      } else {
        // If the item already exists in the cart, create a new state array with the quantity updated
        return state.map((item, index) => {
          if (index === itemIndex) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          } else {
            return item;
          }
        });
      }
    },
    addToPMCart1(state, action) {
      const itemIndex = state.findIndex(item => item.id === action.payload.id);

      if (itemIndex === -1) {
        // If the item doesn't exist in the cart, add it as a new item
        return [
          ...state,
          {
            id: action.payload.id,
            category: action.payload.category,
            subcategory: action.payload.subcategory,
            itemname: action.payload.itemname,
            offerPrice: action.payload.offerPrice,
            qty: 1,
          },
        ];
      } else {
        // If the item already exists in the cart, create a new state array with the quantity updated
        return state.map((item, index) => {
          if (index === itemIndex) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          } else {
            return item;
          }
        });
      }
    },
    removePMCartItems(state, action) {
      let myindex = -1;
      state.map((item, index) => {
        if (item.id == action.payload.id) {
          myindex = index;
        }
      });
      if (myindex == -1) {
      } else {
        state[myindex].qty = state[myindex].qty - 1;
      }
    },
    deletePMCartItems(state, action) {
      return state.filter(item => item.id !== action.payload);
    },
    clearPMCartItems(state, action) {
      // Simply set the cart to an empty array to clear all items
      return [];
    },
  },
});

export const {
  addToPMCart,
  deletePMCartItems,
  removePMCartItems,
  clearPMCartItems,
  addToPMCart1,
} = PMItems.actions;
export default PMItems.reducer;
