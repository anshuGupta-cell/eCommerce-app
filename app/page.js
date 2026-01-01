"use client"
import Button from "@/components/button/Button";
import Spinner from "@/components/Loader/Spinner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCartData } from "@/app/redux/cartData/cartDataSlice"

const App = () => {
  const [items, setItems] = useState([])
  const dispatch = useDispatch()
  const [cart, setCart] = useState([])

  //get all records from item table
  const fetchData = async () => {
    try {
      const res = await fetch("/api/all-items", { cache: "no-store" })
      const data = await res.json()
      setItems(data.res.rows)
    } catch (error) {
      toast("Failed to get items")
    }
  }
  useEffect(() => {
    fetchData()
    setCart(JSON.parse(localStorage.getItem("cartData") || "[]"))

  }, [])

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


  return (
    <main className="py-32 px-2 min-h-[100svh] bg-gradient-to-r from-green-100 via-orange-100 to-yellow-100 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-700">

      <div className="max-w-5xl m-auto grid res-grid-280 gap-2 ">
        {items.map((item) => (

          <div key={item.item_id} className="grid p-2 bg-blue-50 dark:bg-blue-50/10 gap-3 rounded-lg ">
            <Link href={`/item/?item_id=${item.item_id}`}>
              <ul className="grid place-items-center">
                <img className="h-full w-full object-cover rounded-lg aspect-square" src={item.item_pic} alt="img" />
              </ul>
              <ul className="p-1">
                <h3 className="font-bold">{item.item_name}</h3>
                <p className="text-sm">{item.description}</p>
                <p className="text-sm font-medium">Price: {item.price}</p>
                <p className="text-sm">Stock: {item.stock}</p>
              </ul>
            </Link>
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
        ))}

      </div>
    </main>
  );
}

export default App;