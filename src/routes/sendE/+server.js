import { PUBLIC_KEY } from '$env/static/private';
import { PRIVATE_KEY } from '$env/static/private';

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

        // Initialize Mailjet
        const mailjet = require('node-mailjet')
            .connect(PUBLIC_KEY, PRIVATE_KEY);

        // Send email
        const result = await mailjet
            .post("send", { version: "v3.1" })
            .request({
                Messages: [
                    {
                        From: {
                            Email: "patrickliamsmith@gmail.com",
                            Name: "Patrick Smith"
                        },
                        To: [
                            {
                                Email: email, 
                                Name: "Recipient"
                            }
                        ],
                        Subject: "Your email flight plan!",
                        TextPart: message,
                        HTMLPart: `<h2>Dear Recipient, hope you liked this letter!</h2><br /><h3>May the delivery force be with you!</h3>`
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
