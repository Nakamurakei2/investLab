import { afterAll, describe, expect, it } from "vitest";
import { closePool, getPool, withTransaction } from "@/server/db";

const enabled = Boolean(process.env.DATABASE_URL);

describe.skipIf(!enabled)("PostgreSQL integration", () => {
  afterAll(async () => closePool());

  it("connects and executes a simple query", async () => {
    const result = await getPool().query<{ value: number }>("SELECT 1 AS value");
    expect(result.rows[0]?.value).toBe(1);
  });

  it("commits a transaction against PostgreSQL", async () => {
    const value = await withTransaction(async (client) => {
      const result = await client.query<{ value: number }>("SELECT 2 AS value");
      return result.rows[0]?.value;
    });
    expect(value).toBe(2);
  });
});
