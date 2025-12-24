"use client"
import Handle from "@/components/Handle"

const YourTrees = () => {


    return (
        <section className="py-32 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50  dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-800 text-black dark:text-white/80 px-2">
            <div className="grid gap-2 max-w-6xl m-auto">
                <h1 className="text-3xl font-semibold">Your Handles</h1>
                <Handle />
            </div>


        </section>
    )
}

export default YourTrees