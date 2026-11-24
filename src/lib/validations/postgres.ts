export interface PostgresError {
  code: string;
  detail?: string;
  constraint?: string;
}

export function isPostgresError(error: unknown): error is PostgresError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as Record<string, unknown>).code === "string"
  );
}

// duplicated error
export function isUniqueConstraintError(
  error: unknown,
): error is PostgresError {
  return isPostgresError(error) && error.code === "23505";
}
