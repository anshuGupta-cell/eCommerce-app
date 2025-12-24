import pool from "@/lib/db"
import { auth, currentUser } from "@clerk/nextjs/server";


export const GET = async (req) => {

    const { searchParams } = new URL(req.url)
    const handle = searchParams.get("handle")

    try {
        const type = await pool.query("SELECT type from handle where handle_name = $1", [handle])

        let res 
        if (type.rows[0].type === 'public') {
            
            res = await pool.query("SELECT h.handle_name, h.pfp_url, h.description , json_agg(json_build_object('link', l.link, 'link_text', l.link_text)) as links from handle h left join link l on h.hno = l.hno WHERE h.handle_name = $1 GROUP BY h.handle_name, h.pfp_url, h.description", [handle])

        } else if (type.rows[0].type === 'private') {
          
            const { isAuthenticated } = await auth()
            if (!isAuthenticated) {
                return Response.json({
                    message: "unauthorized",
                    success: false
                })
            }
            const user = await currentUser()
            if (!user) {
                return Response.json({
                    message: "user not fetched",
                    success: false
                })
            }

            res = await pool.query("SELECT h.handle_name, h.pfp_url, h.description , json_agg(json_build_object('link', l.link, 'link_text', l.link_text)) as links from handle h left join link l on h.hno = l.hno WHERE h.handle_name = $1 and h.uid = $2 GROUP BY h.handle_name, h.pfp_url, h.description", [handle, user.id])

        }

        // console.log("type", type);

        return Response.json({ success: true, type, res })

    } catch (error) {
        return Response.json({ success: false })
    }
}
