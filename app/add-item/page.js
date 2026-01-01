"use client"

import Button from "@/components/button/Button";
import { useState } from "react";
import { toast } from "react-toastify";


const AddItem = () => {

    const [itemName, setItemName] = useState("")
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("")
    const [qty, setQty] = useState("")
    const [file, setFile] = useState(null)

    const addItem = async (e) => {
        e.preventDefault()
        try {

            const data = JSON.stringify({
                eid: 1,
                item_name: itemName,
                price: Number(price),
                description: desc,
                stock: Number(qty),
            })
            const form = new FormData()
            form.append("img", file)
            form.append("data", data)

            const res = await fetch("/api/item", {
                method: "POST",
                body: form
            })
            const resData = await res.json()
            toast("Item added successfully")

            setItemName("")
            setPrice("")
            setDesc("")
            setQty("")
            setFile(null)

        } catch (error) {
            toast("Failed to add Item")
        }

    }


    return (
        <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-red-50 py-32 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-700 ">

            <div className=" m-auto max-w-6xl py-6 rounded gap-4 bg-white dark:bg-black/10">

                <form onSubmit={(e) => addItem(e)} className="w-[95%] p-4 mx-auto grid gap-5 focus-within:outline outline-2 outline-gray-800 dark:outline-gray-500 rounded-lg dark:text-white/80">

                    <div className="font-semibold text-3xl ">
                        <h1 >Add New Item</h1>
                    </div>
                    <div className=" grid  res-grid-280 gap-2">
                        <div className="">
                            <ul className="grid">
                                <label for="">Name</label>
                                <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} className="text-black rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100 dark:bg-slate-600 dark:text-white/80" placeholder="Enter item name" required />
                            </ul>
                            <ul className="grid">
                                <label for="">Unit Price</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="text-black rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100 dark:bg-slate-600 dark:text-white/80" min="1" placeholder="Enter item price" required />

                            </ul>
                            <ul className="grid">
                                <label for="">Description of product</label>
                                <textarea name="" value={desc} onChange={(e) => setDesc(e.target.value)} className="text-black rounded-lg w-full focus:outline-green-500 py-1 px-3 bg-slate-100 dark:bg-slate-600 dark:text-white/80" rows="3" placeholder="Enter item description" required></textarea>

                            </ul>
                        </div>
                        <div className="grid gap-2">
                            <ul className="grid">
                                <label for="">Quantity</label>
                                <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} className="text-black rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100 dark:bg-slate-600 dark:text-white/80" min="1" placeholder="Enter item quantity" required />
                            </ul>
                            <ul className="grid gap-2">
                                <ul className="grid">
                                    <label for="">Pick an image file</label>
                                    <input type="file" onChange={(e) => setFile(e.target.files[0])} className="text-black rounded-full focus:outline-green-500 py-1 px-3 bg-slate-100 dark:bg-slate-600 dark:text-white/80  file:rounded-xl file:border-fuchsia-700 file:bg-purple-200/10 file:dark:text-white/80 cursor-pointer file:cursor-pointer"
                                        required
                                    />
                                </ul>
                                <img className="object-cover rounded-lg w-32" src={file ? URL.createObjectURL(file) : "/profile_pic.webp"} alt="pic" />
                            </ul>
                        </div>
                    </div>
                    <Button>Add Item</Button>
                </form>
            </div>
        </div>
    )
}

export default AddItem;