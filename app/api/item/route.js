import cloudinary from "@/lib/cloudinary";
import pool from "@/lib/db";
import uploadToCloudinary from "@/lib/uploadToCloudinary";
import { auth, currentUser } from "@clerk/nextjs/server";

// add item, vendor or admin adds this items
export const POST = async (req) => {
    const formData = await req.formData()
    const imgFile = formData.get("img")
    const data = formData.get("data")
    const { item_name, eid, price, description, item_pic, stock } = JSON.parse(data)
    const url = await uploadToCloudinary(imgFile);
    // const { item_name, eid, price, description, item_pic, stock } = body

    console.log(item_name, eid, price, description, item_pic, stock, url);
    try {
        const res = await pool.query(`insert into item(item_name, eid, price, description, item_pic, stock, item_pic) values($1, $2, $3, $4, $5, $6, $7) RETURNING item_id`, [item_name, eid, price, description, item_pic, stock, url])

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

// get all details of single item
export const GET = async (req) => {
    const searchParams = new URL(req.url).searchParams
    const item_id = searchParams.get("item_id")

    try {
        const res = await pool.query(`select * from item WHERE item_id = $1`, [item_id])

        return Response.json({
            success: true,
            message: "Item fetched successfully!",
            res
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to fetch Item. Some error ocurred!",
            details: error

        })

    }
}