"use client"
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Item = () => {
  const searchParam = useSearchParams()
  const item_id = searchParam.get("item_id");
  const [item, setItem] = useState(null)

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/item?item_id=${item_id}`, { cache: "no-store" })
      const data = await res.json()
      setItem(data)

    } catch (error) {
      toast("Failed to load data!!!")
    }
  }


  return (
    <section className="py-32 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50  dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-800 text-black dark:text-white/80 px-2">
      Item
    </section>

  )
}

export default Item