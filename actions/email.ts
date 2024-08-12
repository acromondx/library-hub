"use server";
import { sendEmailParams } from "@/types";

export async function sendEmail(params: sendEmailParams) {
  const data = {
    service_id: process.env.EMAILJS_SERVICE_ID as string,
    template_id: process.env.EMAILJS_TEMPLATE_ID as string,
    user_id: process.env.EMAILJS_USER_ID as string,
    accessToken: process.env.EMAILJS_ACCESS_TOKEN as string,
    template_params: {
      ...params,
    },
  };

  try {
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const responseText = await response.text();

    if (!response.ok) {
      let errorMessage;
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.error || "Failed to send email";
      } catch {
        errorMessage = responseText || "Failed to send email";
      }
      throw new Error(errorMessage);
    }
    console.log("email sent");
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error instanceof Error ? error : new Error("Failed to send email");
  }
}
