import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

const globalForDb = globalThis as unknown as { sql?: ReturnType<typeof postgres> };

if (!globalForDb.sql) {
  globalForDb.sql = postgres(process.env.DATABASE_URL!, { max: 1 });
}

export const sql = globalForDb.sql;
export const db = drizzle(sql, { schema });