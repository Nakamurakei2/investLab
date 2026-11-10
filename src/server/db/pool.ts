import "server-only";
import { Pool, type PoolConfig } from "pg";

const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: Number(process.env.DB_POOL_MAX ?? 10),
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
  application_name: "investlab",
};

let pool: Pool | undefined;

/** Returns the process-wide PostgreSQL pool. Call only from server-side code. */
export function getPool(): Pool {
  if (!pool) {
    if (!poolConfig.connectionString) {
      throw new Error("DATABASE_URL is required to connect to PostgreSQL.");
    }
    pool = new Pool(poolConfig);
    pool.on("error", (error: Error) => {
      console.error("Unexpected PostgreSQL pool error:", error);
    });
  }
  return pool;
}

/** Closes the pool; intended for graceful shutdown and isolated integration tests. */
export async function closePool(): Promise<void> {
  if (pool) {
    const currentPool = pool;
    pool = undefined;
    await currentPool.end();
  }
}
