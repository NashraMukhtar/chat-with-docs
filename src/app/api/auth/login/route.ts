import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";

import { db } from "@/db";
import { users } from "@/db/schema";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email: unknown = body?.email;
  const password: unknown = body?.password;

  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json(
      { ok: false, error: "email and password are required" },
      { status: 400 },
    );
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user || !(await compare(password, user.passwordHash))) {
    return NextResponse.json(
      { ok: false, error: "Invalid credentials" },
      { status: 401 },
    );
  }

  const token = await signSession(user.id);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return NextResponse.json({
    ok: true,
    user: { id: user.id, email: user.email },
  });
}