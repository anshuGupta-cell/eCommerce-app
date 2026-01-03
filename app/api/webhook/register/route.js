// import { headers } from "next/headers"
// import { Webhook } from "svix"

// export async function POST(req) {
//   try {
//     const secret = process.env.WEBHOOK_SECRET
//     if (!secret) return new Response("OK", { status: 200 })

//     const h = headers()
//     const svix_id = h.get("svix-id")
//     const svix_timestamp = h.get("svix-timestamp")
//     const svix_signature = h.get("svix-signature")

//     if (!svix_id || !svix_timestamp || !svix_signature) {
//       return new Response("OK", { status: 200 })
//     }

//     const body = await req.text()
//     const wh = new Webhook(secret)

//     wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     })

//     //  do async work later
//     return new Response("OK", { status: 200 })
//   } catch (e) {
//     console.error(e)
//     return new Response("OK", { status: 200 })
//   }
// }


import { headers } from "next/headers";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import pool from "@/lib/db";

export const POST = async (req) => {

    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET


    if (!WEBHOOK_SECRET) {
        return new Response("please add webhook secret in env", { status: 400 })
    }

    const headerPayload = headers()
    const svix_id = headerPayload.get("svix-id")
    const svix_timestamp = headerPayload.get("svix-timestamp")
    const svix_signature = headerPayload.get("svix-signature")

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Some error occured - no svix headers", { status: 400 })
    }

    // const payload = await req.json()
    // const body = JSON.stringify(payload)

    const body = await req.text()

    const wh = new Webhook(WEBHOOK_SECRET)
    let evt
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        })
    } catch (error) {
        console.error("Error verifying webhook");
        return new Response("Error occured", { status: 400 })

    }
    const { id } = evt.data
    const eventType = evt.type
    console.log(id);

    if (eventType === "user.created") {
        try {
            const { email_addresses, primary_email_address_id } = evt.data

            const primaryEmail = email_addresses.find(
                (email) => email.id === primary_email_address_id
            )

            if (!primaryEmail) {
                return new Response("No primary email found", { status: 400 })
            }

            await pool.query(
                `INSERT INTO "users" (uid, email) VALUES ($1, $2)`,
                [evt.data.id, primaryEmail.email_address]
            )


        } catch (error) {
            return new Response("Error creating user in db")
        }

    }

    return new Response("Webhook received successfully", { status: 200 })

}


// export const GET = async () => {

//     return Response.json({
//         success: true,
//         message: "Item fetched successfully!",

//     })

// }
