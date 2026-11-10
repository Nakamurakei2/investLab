import "server-only";
import type { Pool, PoolClient } from "pg";
import { getPool } from "./pool";

/** Runs work atomically and always releases the checked-out client. */
export async function withTransaction<T>(
  operation: (client: PoolClient) => Promise<T>,
  pool: Pool = getPool(),
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await operation(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("Failed to roll back PostgreSQL transaction:", rollbackError);
    }
    throw error;
  } finally {
    client.release();
  }
}
