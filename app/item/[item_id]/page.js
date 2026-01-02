"use client";

import Button from "@/components/button/Button";
import FeedbackCard from "@/components/feedbackCard/FeedbackCard";
import Modal from "@/components/modal/Modal";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Item = ({params}) => {

    const pathname = usePathname()
    const item_id = pathname.split('/')[2]
    // const {item_id } = params;
    console.log("item_id",  item_id);

    

    const [item, setItem] = useState(null);
    const [cart, setCart] = useState([])
    const [feedbacks, setFeedbacks] = useState([])
    const [desc, setDesc] = useState("")
    const [subject, setSubject] = useState("")

    const fetchData = async () => {
        try {
            const res = await fetch(`/api/item?item_id=${item_id}`, {
                cache: "no-store",
            });

            const data = await res.json();
            setItem(data?.res?.rows?.[0] || null);
        } catch (error) {
            toast.error("Failed to load data!");
        } finally {
            setLoading(false);
        }
    };

    // handle add to cart 
    const addToCart = (item) => {
        item.qty = 1
        const cartData = JSON.parse(localStorage.getItem("cartData") || "[]")
        const res = cartData.find((i) => i.item_id == item.item_id)
        console.log("res", res);

        if (res) {
            toast("Item is alredy in cart")
        } else {
            const newCartData = [...cartData, item]
            localStorage.setItem("cartData", JSON.stringify(newCartData))
            setCart(JSON.parse(localStorage.getItem("cartData") || "[]"))
        }
    }

    const changeQuantity = (item_id, value) => {

        const cartData = JSON.parse(localStorage.getItem("cartData") || "[]")
        if (cartData.find(i => i.item_id == item_id).qty === 1 && value === -1) {
            toast("Minimun 1 item is necessary")
        } else {
            const updated = cartData.map(item => item.item_id === item_id ? { ...item, qty: (item.qty || 0) + value } : item)
            localStorage.setItem("cartData", JSON.stringify(updated))
            setCart(updated)
        }
    }

    const getFeedback = async () => {
            const res = await fetch(`/api/feedback?item_id=${item_id}`, { cache: "no-store" })
            const data = await res.json()
            setFeedbacks(data.res.rows)
    }

    //add feedback 
    const addFeedback = async (e) => {
        e.preventDefault()
        // try {

        const res = await fetch("/api/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: 1,
                item_id: item_id,
                description: desc,
                subject
            })
        })
        const data = await res.json()
        toast(data.message)
        console.log(data);

        setDesc("")
        setSubject("")
        // } catch (error) {
        //     toast("failed to add feedback")
        // }
    }

    useEffect(() => {
        fetchData();
        getFeedback()
        setCart(JSON.parse(localStorage.getItem("cartData") || "[]"))
    }, []);

    if (!item) {
        return (
            <section className="py-32 text-center">
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <section className="py-32 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-800 text-black dark:text-white/80 px-2">

            <div className="max-w-3xl  mx-auto space-y-4">
                <img
                    className="m-auto max-h-[24rem] object-cover rounded-lg "
                    src={`/profile_pic.webp`}
                    alt={item.item_name}
                />

                <div className="p-1">
                    <h3 className="font-bold text-lg">{item.item_name}</h3>
                    <p className="text-sm">{item.description}</p>
                    <p className="text-sm font-medium">Price: {item.price}</p>
                    <p className="text-sm">Stock: {item.stock}</p>
                </div>

                {!cart.find((i) => i.item_id == item.item_id) ?
                    <Button onClick={() => addToCart(item)}>Add to cart</Button> :
                    <ul
                        className="flex justify-between items-center qty-box w-32 rounded-full border-2 border-orange-500 px-3 bg-slate-300/5">
                        <button onClick={() => changeQuantity(item.item_id, -1)} className="font-bold pb-1 text-2xl w-6">-</button>
                        <p>
                            {cart.find(i => i.item_id == item.item_id).qty}
                        </p>
                        <button onClick={() => changeQuantity(item.item_id, +1)} className="font-bold pb-1 text-2xl w-6">+</button>
                    </ul>
                }
            </div>

            {/* Feedback section (future use) */}
            <div className="mt-16 max-w-3xl grid gap-4 mx-auto">
                {/* add new feedback  */}
                <ul className="grid ">
                    <Modal
                        btnText={"Add feedback "}
                        isActive={true}

                    >
                        <form className="grid max-w-3xl m-auto bg-slate-800 p-3 gap-5 z-10" onSubmit={(e) => addFeedback(e)}>
                            <ul>
                                <label name="subject" className="font-semibold">Subject</label>
                                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="text-black rounded-lg w-full focus:outline-green-500 py-1 px-3 bg-slate-100 dark:bg-slate-600 dark:text-white/80" placeholder="Enter feedback subject" required />
                            </ul>
                            <ul className="grid gap-2">
                                <label name="desc" className="font-semibold">Enter feedback description</label>
                                <textarea name="desc"
                                    className="text-black rounded-lg w-full focus:outline-green-500 py-1 px-3 bg-slate-100 dark:bg-slate-600 dark:text-white/80"
                                    type="text"
                                    rows={5}
                                    placeholder="Enter details"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    required

                                />
                            </ul>
                            <Button>Submit</Button>
                        </form>
                    </Modal>
                </ul>
                <ul className="grid gap-2">
                    <h2>Feedbacks</h2>
                    {feedbacks.map((feedback)=>(
                    <FeedbackCard
                        feedback={feedback}
                    />
                    ))}

                </ul>
            </div>
        </section>
    );
};

export default Item;
