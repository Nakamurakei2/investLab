import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, "名前を入力してください")
    .max(100, "名前は100文字以下で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスの形式で入力してください")
    .max(255, "メールアドレスは255文字以下で入力してください"),
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください")
    .regex(/^[a-zA-Z0-9]+$/, "半角英数字のみで入力してください"),
  checkbox: z.boolean().refine((val) => val === true, {
    message: "利用規約への同意が必要です",
  }),
});

// create type from schema
export type CreateUserInput = z.infer<typeof createUserSchema>;
