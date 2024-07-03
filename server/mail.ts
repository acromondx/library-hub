import { nanoid } from "nanoid";
import { resend } from "@/lib/resend";
import {
  type SendWelcomeEmailProps,
  type sendVerificationEmailProps,
} from "@/types";
import ThanksTemp from "@/emails/thanks";
import VerificationTemp from "@/emails/verification";

export const sendWelcomeEmail = async ({
  toMail,
  userName,
}: SendWelcomeEmailProps) => {
  const subject = "Thanks for using LibraryHub!";
  const temp = ThanksTemp({ userName });

  await resend.emails.send({
    from: `LibraryHub  <donotreply@libraryhub.com>`,
    to: toMail,
    subject: subject,
    headers: {
      "X-Entity-Ref-ID": nanoid(),
    },
    react: temp,
  });
};

export const sendVerificationEmail = async ({
  toMail,
  verificationUrl,
  userName,
}: sendVerificationEmailProps) => {
  const subject = "Email Verification for LibraryHub";
  const temp = VerificationTemp({ userName, verificationUrl });

  await resend.emails.send({
    from: `LibraryHub  <donotreply@libraryhub.com>`,
    to: toMail,
    subject: subject,
    headers: {
      "X-Entity-Ref-ID": nanoid(),
    },
    react: temp,
  });
};
