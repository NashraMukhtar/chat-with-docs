import "dotenv/config";

import { hash } from "bcryptjs";

import { db, sql } from "./index";
import { users } from "./schema";

async function main() {
  const email = process.env.DEMO_EMAIL;
  const password = process.env.DEMO_PASSWORD;

  if (!email || !password) {
    console.error("DEMO_EMAIL and DEMO_PASSWORD must be set in .env");
    process.exit(1);
  }

  const passwordHash = await hash(password, 10);

  await db
    .insert(users)
    .values({ email, passwordHash })
    .onConflictDoUpdate({ target: users.email, set: { passwordHash } });

  console.log(`Seeded demo user: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await sql.end();
  });