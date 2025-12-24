import pool from "@/lib/db"

// get all links 
export const GET = async (req) => {
    const { searchParams } = new URL(req.url)
    try {

        const hno = searchParams.get("hno")
        const res = await pool.query('SELECT * FROM link where hno = $1', [hno])
        return Response.json({
            success: true,
            message: "All links fetched successfully!",
            res
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to fetch links. Some error occured!",
            details: error
        })
    }
}

// delete a link 
export const DELETE = async (req) => {

    const { hno, lno } = await req.json()
    try {
        await pool.query('DELETE FROM link WHERE lno = $1 and hno = $2', [lno, hno])
        return Response.json({
            success: true,
            message: "Link deleted successfully!",
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to delete link. Some error occured!",
            details: error
        })
    }

}


// update a link 
export const PATCH = async (req) => {

    const { hno, lno, newLinkText, newLink } = await req.json()
    try {
        const res = await pool.query('UPDATE link SET link_text = $1, link = $2 WHERE hno = $3 and lno = $4', [newLinkText, newLink, hno, lno])
        return Response.json({
            success: true,
            message: "Link updated successfully!",
            res
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to update link. Some error occured!",
            details: error
        })
    }

}


// add a new link
export const POST = async (req) => {

    const { hno, newLinkText, newLink } = await req.json()

    try {
        await pool.query('insert into link(hno, link_text, link) values($1, $2, $3)', [hno, newLinkText, newLink])
        return Response.json({
            success: true,
            message: "Link added successfully!",
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to add link. Some error occured!",
            details: error
        })
    }

}

