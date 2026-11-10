import { describe, expect, it, vi } from "vitest";
import type { Pool, PoolClient, QueryResult } from "pg";
import { withTransaction } from "@/server/db/transaction";

function createMockPool() {
  const query = vi.fn<(sql: string) => Promise<QueryResult>>().mockResolvedValue({ rows: [], command: "", rowCount: 0, oid: 0, fields: [] });
  const release = vi.fn();
  const client = { query, release } as unknown as PoolClient;
  const pool = { connect: vi.fn().mockResolvedValue(client) } as unknown as Pool;
  return { pool, query, release };
}

describe("withTransaction", () => {
  it("commits successful work and releases the client", async () => {
    const { pool, query, release } = createMockPool();
    const result = await withTransaction(async () => 42, pool);
    expect(result).toBe(42);
    expect(query.mock.calls.map(([sql]) => sql)).toEqual(["BEGIN", "COMMIT"]);
    expect(release).toHaveBeenCalledOnce();
  });

  it("rolls back failed work, rethrows, and releases the client", async () => {
    const { pool, query, release } = createMockPool();
    const failure = new Error("operation failed");
    await expect(withTransaction(async () => { throw failure; }, pool)).rejects.toBe(failure);
    expect(query.mock.calls.map(([sql]) => sql)).toEqual(["BEGIN", "ROLLBACK"]);
    expect(release).toHaveBeenCalledOnce();
  });
});
