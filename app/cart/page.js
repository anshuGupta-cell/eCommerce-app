"use client"

import Button from '@/components/button/Button'
import ItemCard from '@/components/itemCard/ItemCard'
import React from 'react'
import { useSelector } from 'react-redux'

const cart = ({}) => {
    
    const cardItems = useSelector((state)=>state.cardData.cardItems)
console.log("cardItems", cardItems);


    return (
        <main className="py-32 px-2 min-h-[100svh] bg-gradient-to-r from-green-100 via-orange-100 to-yellow-100 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-700 ">

            <section className='max-w-5xl m-auto grid gap-3 bg-slate-300/40'>
                <div>
                    <ItemCard />
                </div>
                <div className='grid justify-center gap-3 px-3 py-2 '>
                    <ul className='flex justify-center gap-1 font-semibold text-xl'>Total
                        <p className='font-bold'>
                            <sup>&#8377;</sup>
                            5000
                            <sup>00</sup>
                        </p>
                    </ul>
                    <Button>
                        Place Order ( 2 items )
                    </Button>
                </div>
            </section>
        </main>
    )

}

export default cart