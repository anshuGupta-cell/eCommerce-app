"use client"
import { useDispatch, useSelector } from "react-redux"
import { increment, decrement, incrementByAmount } from "@/app/redux/counter/counterSlice"

const Counter = () => {

    const count = useSelector((state)=> state.counter.value)
    const dispatch = useDispatch()
    return (
        <>
            <div>
                <button onClick={()=>dispatch(decrement())}>-</button>
                count: {count}
                <button onClick={()=>dispatch(increment())}>+</button>
            </div>
        </>
    )
}

export default Counter