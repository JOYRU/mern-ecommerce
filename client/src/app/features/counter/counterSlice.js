import {createSlice} from '@reduxjs/toolkit'

const intialState = {count:0} ;
const counterSlice = createSlice({
    name:'counter',
    intialState:intialState ,
    reducers:{
        increment:(state,action)=>{
            state.count +=state.count; 
        },
        decrement:(state,action)=>{
            state.count -=state.count; 
        },
        reset:(state,action)=>{
            state.count = 0 ; 
        },
    },
}) ; 

export const {increment,decrement,reset} = counterSlice.actions ; 

export default counterSlice.reducer;