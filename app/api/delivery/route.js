import pool from "@/lib/db"

export const GET = async (req) => {
    // const searchParams = new URL(req.url).searchParams
    // const uid = searchParams.get("uid")

    try {

        const res = await pool.query(`select * from "order"`)
        console.log(res);

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
