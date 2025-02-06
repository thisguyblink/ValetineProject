import { PUBLIC_KEY } from '$env/static/public';
import { PRIVATE_KEY } from '$env/static/private';
import Mailjet from 'node-mailjet';


export async function POST({ request }) {

    try {
        // Parse request body
        const { email, message, loveStatus } = await request.json();

        // Validate input
        if (!email || !message || loveStatus === null) {
            return new Response(
                JSON.stringify({
                    error: "Missing recipient or message.",
                    details: {
                        email: email || "N/A",
                        message: message || "N/A"
                    }
                }),
                { status: 400 }
            );
        }

        // Check API keys
        if (PUBLIC_KEY === null|| PRIVATE_KEY === null) {
            return new Response(JSON.stringify({ error: "Mailjet API keys are missing" }), { status: 500 });
        }

        const mailjetClient = new Mailjet.Client({
            apiKey: PUBLIC_KEY,
            apiSecret: PRIVATE_KEY
          });

        // Send email
        const result = await mailjetClient
            .post("send", { version: "v3.1" })
            .request({
                Messages: [
                    {
                        From: {
                            Email: "patrickliamsmith@gmail.com",
                            Name: "Anonymous"
                        },
                        To: [
                            {
                                Email: email, 
                                Name: "Recipient"
                            }
                        ],
                        Subject: "Love Letter!!",
                        TextPart: message,
                        HTMLPart: 
                        `<div style="max-width: 500px; margin: auto; padding: 20px; border: 2px solid #ff4081; border-radius: 10px; background-color: #fff5f8; color: #333; font-family: Arial, sans-serif;">
                        <h2 style="color: #d81b60; text-align: center;">Dear Recipient,</h2>
                        <p style="font-size: 16px; line-height: 1.5; text-align: center;">
                        ${message}
                        </p>
                        <br />
                        <h3 style="color: #00796b; text-align: center;">May the delivery force be with you!</h3>
                        </div>`
                    }
                ]
            });

        // Return success response
        return new Response(JSON.stringify({ success: true, messageId: result.body.Messages[0].To[0].MessageID }), { status: 200 });

    } catch (error) {
        console.error("Email sending failed:", error);
        return new Response(JSON.stringify({ error: "Failed to send email", details: error.message }), { status: 500 });
    }
}
