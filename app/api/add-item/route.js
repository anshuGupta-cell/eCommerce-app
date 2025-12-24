import pool from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

// add item, vendor or admin adds this items
export const POST = async (req) => {
    const body = await req.json()
    const { item_name, eid, price, description, item_pic, stock } = body
    console.log(item_name, eid, price, description, item_pic, stock);
    try {
        const res = await pool.query(`insert into item(item_name, eid, price, description, item_pic, stock) values($1, $2, $3, $4, $5, $6) RETURNING item_id`, [item_name, eid, price, description, item_pic, stock])

        return Response.json({
            success: true,
            message: "Item added successfully!",
            res
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to add Item. Some error ocurred!",
            details: error

        })

    }

}

// get all details from item
export const GET = async () => {
    try {
        const res = await pool.query(`select * from item`)

        return Response.json({
            success: true,
            message: "Item added successfully!",
            res
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to add Item. Some error ocurred!",
            details: error

        })

    }
}