import { FROM_EMAIL, resend } from "./auth";
import Test from "../components/emails/test";

export async function test() {
    try {
        const message = await Test()
        const { error, data, } = await resend.emails.send({
            from: FROM_EMAIL,
            to: "ondzalaoph@gmail.com",
            subject: "Nouveau contact",
            react: message
        })

        if (error) { console.log("message error:", error); }
        if (data) { console.log("message data:", data); }
    } catch (error) {
        console.log("try catch:",error);

    }


}