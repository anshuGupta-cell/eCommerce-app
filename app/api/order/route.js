import pool from "@/lib/db"

export const GET = async (req) => {
    const searchParams = new URL(req.url).searchParams
    const uid = searchParams.get("uid")

    try {

        const res = await pool.query(`select * from "order" where uid = $1`, [uid])
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

const PATCH = async (req) => {

    const {
        oid,
        description
    } = await req.json()

    try {
        const res = await pool.query(`
            UPDATE "order" SET
            description = $1
            WHERE oid = $2    
        `, [description, oid])
        console.log(res);

        return Response.json({
            success: true,
            message: "Order cancelled succussfully",
            res
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to cancel Order. Some error occured!",
            details: error
        })
    }

}