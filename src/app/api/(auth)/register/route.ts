import { setAuthCookie } from "@/lib/auth/cookie";
import { generateToken } from "@/lib/auth/jwt";
import { hashPassword } from "@/lib/db/password";
import { pool } from "@/lib/db/pool";
import { isUniqueConstraintError } from "@/lib/validations/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // validation
    if (!email || !password || !name) {
      return NextResponse.json(
        {
          message: "必須項目を入力してください",
        },
        {
          status: 400,
        },
      );
    }

    const normalizedEmail = email.trim();

    // hash password
    const passwordHash = await hashPassword(password);

    // save to DB
    const query = `
    INSERT INTO users (email, password_hash, name, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, email, name, role, created_at
    `;

    const result = await pool.query(query, [
      normalizedEmail,
      passwordHash,
      name,
      "user",
    ]);

    const rows = result.rows[0];

    // jwt
    const jwt = await generateToken(rows.id);
    // set-cookie
    await setAuthCookie(jwt);

    return NextResponse.json(
      {
        message: "ユーザー登録に成功しました。",
        name: rows.name,
        email: rows.email,
        role: rows.role,
        createdAt: rows.created_at,
      },
      {
        status: 201,
      },
    );
  } catch (e: unknown) {
    // unique contraint error
    if (isUniqueConstraintError(e)) {
      console.error("重複制約エラー", e);

      return NextResponse.json(
        {
          message:
            "入力されたメールアドレスは登録できないか、すでに使用されている可能性があります。",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      { message: "予期せぬエラーが発生しました" },
      { status: 500 },
    );
  }
}
