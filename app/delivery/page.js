'use client'
import Button from "@/components/button/Button"
import Modal from "@/components/modal/Modal.js"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Delivery = () => {

    const [orders, setOrders] = useState([])
    const [desc, setDesc] = useState("")

    const fetchData = async () => {
        try {
            const res = await fetch("/api/delivery", { cache: "no-store" })
            const data = await res.json()
            setOrders(data.res.rows)
            console.log(data.res);

        } catch (error) {
            toast("Failed to get items")
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const orderComplete = async (oid) => {
        try {
            const res = await fetch(`/api/order-status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    oid,
                    status: "completed",
                    description: "Order is deliverd"
                })
            })
            const data = await res.json()
            fetchData()
            toast(`Order ${oid} is completed`)
        } catch (error) {
            toast("Failed to update order status to completed")
        }
    }

    const orderFailed = async (oid, e) => {
        e.preventDefault()
        try {
            const res = await fetch(`/api/order-status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    oid,
                    status: "cancelled",
                    description: desc
                })
            })
            const data = await res.json()
            fetchData()
            toast(`Order ${oid} status is updated to cancelled`)

        } catch (error) {
            toast("Failed to update order status to cancelled")
        }

        fetchData()

    }


    return (
        <section className="py-40 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50  dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-800 text-black dark:text-white/80 px-2">
            <div className="max-w-5xl m-auto grid res-grid-280 gap-2 ">

                {orders.map((order) => (
                    order.status !== "completed" && order.status !== "cancelled" ? <div key={order.oid} className="grid gap-2 bg-slate-800 rounded-lg p-2 ">
                        <ul className="">
                            <ul className="flex justify-between">
                                <p className="font-bold">Order id: {order.oid}</p>
                                <p className="text-sm">{order.date}</p>
                            </ul>
                            <ul >
                                <p>Mobile no: {order.mobile_no}</p>
                                <p>Address: {order.address}</p>
                                {/* <p>Total items: 5</p> */}
                                <p>Total amount: {order.total_amount} Rs</p>
                            </ul>
                        </ul>
                        <ul className="flex w-full justify-around">
                            <Modal
                                btnText={"Delivery failed"}
                                isActive={true}
                            >
                                <form className="grid bg-slate-800 p-3 gap-5 z-10" onSubmit={(e) =>orderFailed(order.oid, e)}>
                                    <ul className="grid gap-2">
                                        <label name="desc" className="font-semibold">Enter the reason, why delivery is failed.</label>
                                        <textarea name="desc" 
                                        className="text-black rounded-lg w-full focus:outline-green-500 py-1 px-3 bg-slate-100 dark:bg-slate-600 dark:text-white/80" 
                                        type="text"
                                        rows={5} 
                                        placeholder="Enter details"
                                        value={desc}
                                        onChange={(e)=> setDesc(e.target.value)}
                                        required 
                                        
                                        />
                                    </ul>
                                    <Button>Submit</Button>
                                </form>
                            </Modal>
                            <button onClick={() => orderComplete(order.oid)} className="bg-green-500 rounded-lg py-1 px-3">Delivered</button>
                        </ul>
                    </div>:<div></div>
                ))}

            </div>
        </section >

    )
}

export default Delivery