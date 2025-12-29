import pool from "@/lib/db"
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

// place order
export const POST = async (req) => {

    const body = await req.json()
    const {
        uid, total_amount, address, mobile, status, cartData
    } = body
console.log(body);


    // try {
        const res = await pool.query(`insert into "order" (uid, total_amount, address, mobile_no, status) values ($1, $2, $3, $4, $5) returning oid`, [uid, total_amount, address, mobile, status])
        console.log(res);

        for (let i = 0; i < cartData.length; i++) {
            await pool.query(`insert into "order_item" (qty, oid, item_id) values ($1, $2, $3)`, [cartData[i].qty, res.rows[0].oid, cartData[i].item_id])
        }

        return Response.json({
            success: true,
            message: "Order placed successfully!",
        })
    // } catch (error) {
    //     return Response.json({
    //         success: false,
    //         message: "Failed to place order. Some error occured!",
    //         details: error
    //     })
    // }
}

// Get order and order_items details
export const GET = async (req) => {

    const searchParams = new URL(req.url).searchParams
    const uid = searchParams.get("uid")
    const oid = searchParams.get("oid")

    console.log(uid, oid);


    try {

        // const order = await pool.query(`select * from "order" where oid = $1 and uid = $2`, [oid, uid])
        // const order_item = await pool.query(`select * from "order_item" where oid = $1`, [oid])
        // const item = await pool.query(`select * from "item" where item_id = $1`, [order_item.rows[0].item_id])

        const res = await pool.query(`
            SELECT 
            o.oid, 
            o.total_amount, 
            json_agg(json_build_object(
                'item_id', oi.item_id, 
                'item_name', i.item_name,
                'price', i.price,
                'description', i.description,
                'item_pic', i.item_pic,
                'qty', oi.qty
            )) as order_items 
             from "order" o 
             join "order_item" oi 
             on oi.oid = o.oid 
             join item i 
             on i.item_id = oi.item_id
             where o.oid = $1 and o.uid = $2 group by o.oid, o.total_amount;
             `, [oid, uid]);



        return Response.json({
            success: true,
            message: "Order details fetched successfully!",
            res

        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to fetch order details. Some error occured!",
            details: error
        })
    }
}


// Delete a handle and all links of that handle
export const DELETE = async (req) => {

    const { hno } = await req.json()
    const client = await pool.connect()

    const { isAuthenticated } = await auth()
    if (!isAuthenticated) {
        return Response.json({
            message: "unauthorized"
        })
    }
    const user = await currentUser()


    try {

        await client.query('BEGIN')
        await client.query('DELETE FROM link WHERE hno = $1', [hno])
        const res = await client.query('DELETE FROM handle WHERE hno = $1 and uid = $2', [hno, user.id])
        await client.query('COMMIT')

        await client.release()
        return Response.json({
            success: true,
            message: "Handle deleted successfully!",
        })

    } catch (error) {
        await client.query('ROLLBACK')
        await client.release()
        return Response.json({
            success: false,
            message: "Failed to delete handle. Some error occured!",
            details: error
        })
    }

}


//update handle
export const PATCH = async (req) => {

    const { isAuthenticated } = await auth()
    if (!isAuthenticated) {
        return Response.json({
            message: "unauthorized"
        })
    }
    const user = await currentUser()

    const { hno, newHandle, newPfp_url, newDesc, newType } = await req.json()
    try {

        await pool.query('UPDATE handle SET handle_name = $1, pfp_url = $2, description = $3, type = $4 WHERE hno = $5 and uid = $6', [newHandle, newPfp_url, newDesc, newType, hno, user.id])
        return Response.json({
            success: true,
            message: "Handle updated successfully!"
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to update handle. Some error occured!",
            details: error
        })
    }

}