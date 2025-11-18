import { PrismaClient } from "./lib/generated/prisma/client.js";

const prisma = new PrismaClient();

async function test() {
  const account = await prisma.account.findFirst({
    where: { accountId: "ton_email_ici" } // ou userId lié à ton utilisateur
  });
  console.log(account);
}

test();
