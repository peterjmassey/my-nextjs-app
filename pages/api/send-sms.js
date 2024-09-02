// pages/api/send-sms.js
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const port = process.env.PORT || 8080;

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Check if environment variables are loaded correctly
    console.log("TWILIO_ACCOUNT_SID:", process.env.TWILIO_ACCOUNT_SID);
    console.log("TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN);
    console.log("TWILIO_PHONE_NUMBER:", process.env.TWILIO_PHONE_NUMBER);

    const { to, message } = req.body;

    try {
      // Ensure you create the Twilio client with correct credentials
      const client = require("twilio")(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      const messageResponse = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: to,
      });

      res.status(200).json({ success: true, sid: messageResponse.sid });
    } catch (error) {
      console.error("Error sending SMS:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
