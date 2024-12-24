import { createSlice } from "@reduxjs/toolkit";

const MyprodctSlice=createSlice({
    name:'product',
    initialState:[],
    reducers:{
        addMyProducts(state,action){
            state.push(action.payload);
        },
        increaseQty(state,action){
            let myindex= -1;
            state.map((item,index)=>{
                myindex =index;

            });
            if(myindex == -1){

            }else{
                state[myindex].qty=state[myindex].qty+1;
            }
        }
    }
});


export const {addMyProducts}=MyprodctSlice.actions;
export default MyprodctSlice.reducer;