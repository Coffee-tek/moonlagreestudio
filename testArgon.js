import { hash, verify } from "@node-rs/argon2";

const opts = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

async function test() {
  const password = "qwertyuiop";

  // Hash du mot de passe
  const hashed = await hash(password, opts);
  console.log("Hashed:", hashed);

  // Vérification
  const result = await verify(hashed, password, opts);
  console.log("Verify result:", result); // doit afficher true
}

test().catch(console.error);
