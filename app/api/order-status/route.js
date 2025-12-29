import pool from "@/lib/db"

// set order status to confirmed || delivered 
export const PATCH = async (req) => {

    const { oid, status } = await req.json()

    try {

        await pool.query(`UPDATE "order" SET status = $1 WHERE oid = $2`, [status, oid])

        return Response.json({
            success: true,
            message: "Order status updated successfully!",
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to update the status. Some error occured!",
            details: error
        })
    }

}

// get order status
export const GET = async (req) => {
    const searchParams = new URL(req.url).searchParams
    const uid = searchParams.get("uid")
    const oid = searchParams.get("oid")
    try {

        const res = await pool.query(`select status from "order" where oid = $1 and uid = $2`, [oid, uid])

        return Response.json({
            success: true,
            message: "Status fetched successfully!",
            res
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to fetch status. Some error occured!",
            details: error
        })
    }
}

// delete a link 
// export const DELETE = async (req) => {

//     const { hno, lno } = await req.json()
//     try {
//         await pool.query('DELETE FROM link WHERE lno = $1 and hno = $2', [lno, hno])
//         return Response.json({
//             success: true,
//             message: "Link deleted successfully!",
//         })
//     } catch (error) {
//         return Response.json({
//             success: false,
//             message: "Failed to delete link. Some error occured!",
//             details: error
//         })
//     }

// }


// // update a link
// export const PATCH = async (req) => {

//     const { hno, lno, newLinkText, newLink } = await req.json()
//     try {
//         const res = await pool.query('UPDATE link SET link_text = $1, link = $2 WHERE hno = $3 and lno = $4', [newLinkText, newLink, hno, lno])
//         return Response.json({
//             success: true,
//             message: "Link updated successfully!",
//             res
//         })
//     } catch (error) {
//         return Response.json({
//             success: false,
//             message: "Failed to update link. Some error occured!",
//             details: error
//         })
//     }

// }


