import { hash, verify } from "@node-rs/argon2";

const opts = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export async function hashPassword(password) {
  return await hash(password, opts);
}

export async function verifyPassword(password, hashedPassword) {
  return await verify(hashedPassword, password, opts);
}
