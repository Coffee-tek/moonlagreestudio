import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Middleware global
export async function middleware(req) {
    const { nextUrl } = req;
    const pathname = nextUrl.pathname;

    // 🔐 Récupérer la session (exemple: Better Auth stocke le user dans le cookie)
    const sessionCookie = getSessionCookie(req);
    const isLoggedIn = !!sessionCookie;


    const userRole = sessionCookie?.user?.role;

    const isUserRoute = pathname.startsWith("/user");
    const isAdminRoute = pathname.startsWith("/admin");
    const isAuthRoute = pathname.startsWith("/auth");

    console.log("👤 User Role:", sessionCookie);

    // 1️⃣ Si non connecté → redirige vers /auth/connexion
    if ((isUserRoute || isAdminRoute) && !isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/connexion", req.url));
    }

    // 2️⃣ Si connecté mais essaie d'aller sur /auth → redirige vers /user
    if (isAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL("/user/profil-settings", req.url));
    }

    // 3️⃣ Si l'utilisateur n'est pas admin mais tente d'accéder à /admin
    // if (isAdminRoute && userRole !== "admin") {
    //     return NextResponse.redirect(new URL("/user/profil-settings", req.url));
    // }

    // ✅ Si tout est bon, continuer
    return NextResponse.next();
}

// ⚙️ Config pour ignorer les fichiers statiques
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
