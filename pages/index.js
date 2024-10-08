// pages/index.js
import { useState } from "react";
require("dotenv").config({ path: "complete_path/.env" });

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    try {
      const response = await fetch("/api/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: phoneNumber, // Replace with actual phone number input
          message: message, // Replace with actual message input
        }),
      });

      const data = await response.json();
      console.log("Response Data:", data);

      if (data.success) {
        alert("Message sent successfully!");
      } else {
        alert(
          "Failed to send message: " + (data.error || "Unidentified error")
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const wordy = "Hello, World!";

  return (
    <div>
      <h1>Send SMS with Twilio</h1>
      <h3>{wordy}</h3>

      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}
