import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { increment } from "../app/features/counter/counterSlice";

const Counter = () =>{
    const {count} = useSelector((state)=>state.counter.value);
    const dispatch = useDispatch() ; 

    const handleIncrement = () =>{
        dispatch(increment());
    }
    return (
        <div>
            <h2>Count : {count}</h2>
            <button onClick={handleIncrement}>+</button>
        </div>
    
    )

};

export default Counter ;



