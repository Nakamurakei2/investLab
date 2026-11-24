import { setAuthCookie } from "@/lib/auth/cookie";
import { generateToken } from "@/lib/auth/jwt";
import { verifyPassword } from "@/lib/db/password";
import { pool } from "@/lib/db/pool";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // get current user
    const getHashedPassword = `
    SELECT id, password_hash FROM users
    WHERE email = $1
    `;

    const result = await pool.query(getHashedPassword, [email]);
    const user = result.rows[0];
    if (!user) {
      return NextResponse.json(
        { message: "メールアドレスまたはパスワードが正しくありません。" },
        { status: 401 },
      );
    }

    // verify password
    const isValid = await verifyPassword(password, user.password_hash);

    if (!isValid) {
      return NextResponse.json(
        { message: "メールアドレスまたはパスワードが正しくありません。" },
        { status: 401 },
      );
    }

    // generate jwt
    const token = await generateToken(user.id);

    // add cookie
    await setAuthCookie(token);

    return NextResponse.json(
      {
        message: "ログインに成功しました",
      },
      { status: 200 },
    );
  } catch (e: unknown) {
    console.error("e", e);

    return NextResponse.json(
      {
        message: "予期せぬエラーが発生しました",
      },
      { status: 500 },
    );
  }
}
