"use client"

import Button from '@/components/button/Button'
import ItemCard from '@/components/itemCard/ItemCard'
import Modal from '@/components/modal/Modal'
import OrderDetails from '@/components/orderDetails/OrderDetails'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Cart = ({ }) => {
    const [cartData, setCartData] = useState([])
    const [mobile, setMobile] = useState("")
    const [address, setAdress] = useState("")

    useEffect(() => {
        setCartData(JSON.parse(localStorage.getItem("cartData")))
    }, [])

    const removeItem = (id) => {
        console.log("removing");

        const newData = cartData.filter((item) => item.item_id != id)
        localStorage.setItem("cartData", JSON.stringify(newData))
        setCartData(newData)
    }

    const changeQuantity = (item_id, value) => {

        const cartData = JSON.parse(localStorage.getItem("cartData") || "[]")
        if (cartData.find(i => i.item_id == item_id).qty === 1 && value === -1) {
            toast("Minimun 1 item is necessary")
        } else {
            const updated = cartData.map(item => item.item_id === item_id ? { ...item, qty: (item.qty || 0) + value } : item)
            localStorage.setItem("cartData", JSON.stringify(updated))
            setCartData(updated)
        }
    }

    const placeOrder = async (e) => {
        e.preventDefault()
        console.log("mobile: ", typeof (mobile), "\nAddress: ", address);
        const data = {
            mobile,
            address,
            total_amount: cartData.reduce((sum, item) => sum + item.price, 0),
            status: "Order Placed",
            uid: 1,
            cartData
        }
        try {
            
            const res = await fetch("/api/place-order", {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const resData = await res.json()
            setMobile("")
            setAdress("")
            localStorage.setItem("cartData", JSON.stringify([]))
            setCartData(JSON.parse(localStorage.getItem("cartData")))
            toast(resData.message)

        } catch (error) {
            toast("Failed to place order. Some error occured")
        }
        console.log(resData);
        

        
    }

    return (
        <main className="py-32 px-2 min-h-[100svh] bg-gradient-to-r from-green-100 via-orange-100 to-yellow-100 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-700 ">

            <section className='max-w-5xl m-auto grid gap-3 bg-slate-800'>
                <div className='grid res-grid-280 gap-3'>
                    {cartData.length > 0? cartData.map((item) => (
                        <ItemCard key={item.item_id} item={item} removeItem={removeItem} changeQuantity={changeQuantity} />
                    )): <h3 className='m-auto font-semibold text-xl'>Cart is Empty</h3>}
                </div>

                {/* Total price and plce order */}
                <div className='grid justify-center gap-3 px-3 py-2 '>
                    <ul className='flex justify-center gap-1 font-semibold text-xl'>Sub Total
                        <p className='font-bold'>
                            <sup>&#8377;</sup>
                            {cartData.reduce((sum, item) => sum + item.price, 0)}
                            <sup>00</sup>
                        </p>
                    </ul>

                    { <Modal btnText={`Proceed to Place Order ( ${cartData.length} items )`} isActive={cartData.length > 0}>
                        <OrderDetails
                            mobile={mobile}
                            setMobile={setMobile}
                            address={address}
                            setAdress={setAdress}
                            placeOrder={placeOrder}
                        />
                    </Modal>}
                </div>
            </section>
        </main>
    )

}

export default Cart