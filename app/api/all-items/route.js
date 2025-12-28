import pool from "@/lib/db"

// get all tuples from item
export const GET = async () => {
    try {
        const res = await pool.query(`select * from item`)

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