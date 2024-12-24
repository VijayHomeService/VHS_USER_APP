import { createSlice } from "@reduxjs/toolkit";

const MyCartSlice1 = createSlice({
  name: "addon",
  initialState: [],
  reducers: {
    addToCartaddon(state, action) {
      const itemIndex = state.findIndex(
        (item) => item.id === action.payload._id
      );

      if (itemIndex === -1) {
        // If the item doesn't exist in the cart, add it as a new item
        return [
          ...state,
          {
            id: action.payload._id,
            planName: action.payload.addOnsName,
            planPrice: action.payload.addOnsPrice,
            oferprice: action.payload.addOnsOfferPrice,
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
    addToCart1addon(state, action) {
      const itemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex === -1) {
        // If the item doesn't exist in the cart, add it as a new item
        return [
          ...state,
          {
            id: action.payload._id,
            planName: action.payload.addOnsName,
            planPrice: action.payload.addOnsPrice,
            oferprice: action.payload.addOnsOfferPrice,
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
    removeMyCartItemaddon(state, action) {
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
    deleteMyCartItemaddon(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    clearCartaddon(state, action) {
      // Simply set the cart to an empty array to clear all items
      return [];
    },
  },
});

export const {
  addToCartaddon,
  deleteMyCartItemaddon,
  removeMyCartItemaddon,
  clearCartaddon,
  addToCart1addon,
} = MyCartSlice1.actions;
export default MyCartSlice1.reducer;
