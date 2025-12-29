'use client'
import OrderStatusCard from "@/components/orderStatusCard/OrderStatusCard"
import Link from "next/link"
import { useEffect, useState } from "react"

const MyOrder = () => {

    const [orders, setOrders] = useState([])
    const fetchData = async () => {
        try {
            const res = await fetch("/api/", { cache: "no-store" })
            const data = await res.json()
            setOrders(data.res.rows)
        } catch (error) {
            toast("Failed to get items")
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <section className="py-40 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50  dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-800 text-black dark:text-white/80 px-2">
            <div className="max-w-5xl m-auto grid res-grid-280 gap-2 ">

                <div class="grid gap-2 bg-slate-800 rounded-lg p-2 ">
                    <ul class="">
                        <ul class="flex justify-between">
                            <p class="font-bold">Order id: 1</p>
                            <p className="text-sm">12/12/1200</p>
                        </ul>
                        <ul >
                            <p>Mobile no: 9897100000</p>
                            <p>Address: Pk ka gola</p>
                            <p>Total amount: 40234 Rs</p>
                        </ul>
                    </ul>
                    <ul class="flex w-full justify-between text-sm font-semibold">
                        <Link href="/" className="">see more details</Link>
                        <p>Order Status: Confirmed</p>
                    </ul>
                </div>

            </div>
        </section >

    )
}

export default MyOrder