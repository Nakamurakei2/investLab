import { getUserById } from "@/repositories/useRepositories";
import { getAuthCookie } from "./cookie";
import { verifyToken } from "./jwt";

export async function getCurrentUser() {
  const token = await getAuthCookie();

  if (!token) {
    return null;
  }

  const payload = await verifyToken(token);
  if (!payload || typeof payload.userId !== "number") {
    return null;
  }

  const user = await getUserById(payload.userId);

  return user;
}
