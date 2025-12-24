"use client"
import Counter from "@/components/counter";
import Spinner from "@/components/Loader/Spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function App() {
  const [handle, setHandle] = useState("")
  const router = useRouter()

  const createTree = (e) => {
    e.preventDefault()
    router.push(`/generate?handle=${handle}`)
  }

  return (
    <main className="px-2 min-h-[100svh] bg-gradient-to-r from-green-100 via-orange-100 to-yellow-100 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-700">
      <div className="grid res-grid-280 py-36 place-items-center gap-y-20 gap-x-2 p-[-5rem] max-w-6xl mx-auto">
        <section className=" grid place-items-center ">

          <div className="grid gap-4">

            <div>
              <p className="text-5xl font-extrabold text-green-700 dark:text-green-600 text-wrap">Everything you are. In one, simple link in bio.</p>
              <p className="my-2">Join 70M+ people using LinkTree for thier link in bio. One link to help you share everthing you create, curate and sell from your Instagram, Tiktok, Youtube and other social media profiles.</p>
            </div>
            <form className="grid res-grid-180 gap-2" onSubmit={(e) => createTree(e)}>
              <input className="rounded-lg p-3 bg-slate-200 text-black outline-offset-[-.3rem] outline-green-200 shadow-md shadow-green-300" type="text" onChange={(e) => { setHandle(e.target.value) }} placeholder="Enter handle name" required />
              <button type="submit" className="text-white bg-purple-700 px-3 py-2 rounded-xl shadow-pink-600 shadow-md" >Claim your handle</button>

            </form>

          </div>

        </section>
        <section className="">
          <img className="rounded-xl" src="/profile_pic.png" alt="" />
        </section>
      </div>
    </main>
  );
}
