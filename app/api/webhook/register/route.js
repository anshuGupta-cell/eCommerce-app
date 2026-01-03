import { headers } from "next/headers";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import pool from "@/lib/db";

export const POST = async (req) => {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
    if (!WEBHOOK_SECRET) {
        throw new Error("please add webhook secret in env")
    }

    const headerPayload = headers()
    const svix_id = headerPayload.get("svix-id")
    const svix_timestamp = headerPayload.get("svix-timestamp")
    const svix_signature = headerPayload.get("svix-signature")

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return Response("Some error occured - no svix headers")
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

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
            const {email_addresses, primary_email_address_id} = evt.data

            const primaryEmail = email_addresses.find(
                (email)=> email_id === primary_email_address_id
            )

            if (!primaryEmail) {
                return new Response("No primary email found", {status: 400})
            }

        const res = await pool.query(`
            insert into "users" 
            (uid, name, pfp, email) 
            values($1, $2, $3, $4)
            `[evt.data.id, primaryEmail.email_address, ])
            console.log("user created");
            

        } catch (error) {
            return new Response("Error creating user in db")
        }

    }

    return new Response("Webhook received successfully", {status: 200})

}