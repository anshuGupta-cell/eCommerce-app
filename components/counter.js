"use client"
import { useDispatch, useSelector } from "react-redux"
import { increment, decrement } from "@/app/redux/qtyCounter/qtyCounterSlice"

const Counter = () => {

    const count = useSelector((state)=> state.qtyCounter.qty)
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