import React from 'react'
import Button from '../button/Button';

const ItemCard = () => {
  return (
    <div className="grid p-2 bg-blue-50 dark:bg-blue-50/10 gap-3 rounded-lg ">
      <div >
        <ul className="grid place-items-center">
          <img className="h-full w-full object-cover rounded-lg" src="/profile_pic.webp" alt="" />
        </ul>
        <ul className="p-1">
          <h3 className="font-bold">item.item_name</h3>
          <p className="text-sm">item.description</p>
          <p className="text-sm font-medium">Price: item.price</p>
          <p className="text-sm">Stock: item.stock</p>
        </ul>
      </div>
      <Button>Delete</Button>
      <ul
        className="flex justify-between items-center qty-box w-32 rounded-full border-2 border-orange-500 px-3 bg-slate-300/5">
        <button className="font-bold pb-1 text-2xl w-6">-</button>

        <p>3</p>
        <button className="font-bold pb-1 text-2xl w-6">+</button>
      </ul>
    </div>
  )
}

export default ItemCard;