import {createSlice} from '@reduxjs/toolkit';

const PMItems = createSlice({
  name: 'PMAddons',
  initialState: [],
  reducers: {
    addToPMAddonsCart(state, action) {
      const itemIndex = state.findIndex(item => item.id === action.payload.id);

      if (itemIndex === -1) {
        // If the item doesn't exist in the cart, add it as a new item
        return [
          ...state,
          {
            id: action.payload.id,
            name: action.payload.name,
            offerPrice: action.payload.offerPrice,
            price: action.payload.price,
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
    addToPMAddonsCart1(state, action) {
      const itemIndex = state.findIndex(item => item.id === action.payload.id);

      if (itemIndex === -1) {
        // If the item doesn't exist in the cart, add it as a new item
        return [
          ...state,
          {
            id: action.payload.id,
            name: action.payload.name,
            offerPrice: action.payload.offerPrice,
            price: action.payload.price,
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
    removePMAddonsCartItems(state, action) {
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
    deletePMAddonsCartItems(state, action) {
      return state.filter(item => item.id !== action.payload);
    },
    clearPMAddonsCartItems(state, action) {
      // Simply set the cart to an empty array to clear all items
      return [];
    },
  },
});

export const {
  addToPMAddonsCart,
  deletePMAddonsCartItems,
  removePMAddonsCartItems,
  clearPMAddonsCartItems,
  addToPMAddonsCart1,
} = PMItems.actions;
export default PMItems.reducer;
