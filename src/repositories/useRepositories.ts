import { pool } from "@/lib/db/pool";

/**
 * ユーザー情報取得処理
 */
export const getUserById = async (userId: number) => {
  try {
    const query = ``;
    const result = await pool.query(query, []);
    console.log("result", result);
  } catch (e: unknown) {}
};
