import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "@/lib/auth";

const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
     plugins: [inferAdditionalFields()],
});

export const {

    signIn,
    signUp,
    signOut,
    useSession,
    updateUser,
    sendVerificationEmail,
    requestPasswordReset,
    resetPassword

} = authClient;