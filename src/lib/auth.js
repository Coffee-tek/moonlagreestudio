import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../lib/generated/prisma/client.js";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { normalizeName, VALID_DOMAINS } from "./utils.js";

const prisma = new PrismaClient();

export const auth = betterAuth({
  // 🔥 OBLIGATOIRE : secret, baseURL, origin
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL, // https://moonlagreestudio.vercel.app
  origin: process.env.BETTER_AUTH_URL,  // même valeur que baseURL

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
  },

  user: {
    additionalFields: {
      role: {
        type: ["client", "agent", "admin"],
      },
      genre: "string",
      ville: "string",
      telephone: "number",
      date_naissance: "date",
      adresse: "string",
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(";") ?? [];

          if (ADMIN_EMAILS.includes(user.email)) {
            return { data: { ...user, role: "admin" } };
          }

          return { data: user };
        },
      },
    },
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const email = String(ctx.body.email);
        // const domain = email.split("@")[1];

        // if (!VALID_DOMAINS().includes(domain)) {
        //   throw new APIError("BAD_REQUEST", {
        //     message: "Domaine invalide.",
        //   });
        // }

        const name = normalizeName(ctx.body.name);

        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name,
            },
          },
        };
      }
    }),
  },

  session: {
    expiresIn: 60 * 60 * 24 * 30,
  },

  plugins: [nextCookies()],
});


