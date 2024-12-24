import {createSlice} from '@reduxjs/toolkit';

const PMItems = createSlice({
  name: 'Items',
  initialState: {type: 'user'}, // Initial state is a single object
  reducers: {
    updateBTSwitch(state, action) {
      const {type, ...rest} = action.payload;

      // Update the existing state object with the new properties
      if (state.type === type) {
        Object.assign(state, rest);
      } else {
        // If the type is different, replace the state with the new object
        return {...state, ...action.payload};
      }
    },

    deleteBTSwitch(state) {
      // Reset the state to the initial state
      return {type: 'user'};
    },

    clearBTSwitch() {
      // Return an empty object or reset to initial state
      return {};
    },
  },
});

export const {updateBTSwitch, deleteBTSwitch, clearBTSwitch} = PMItems.actions;

export default PMItems.reducer;
