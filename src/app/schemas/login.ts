import { z } from "zod";

export const loginUserInput = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスの形式で入力してください")
    .max(255, "メールアドレスは255文字以下で入力してください"),
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください")
    .regex(/^[a-zA-Z0-9]+$/, "半角英数字のみで入力してください"),
});

// create type from schema
export type LoginUserInput = z.infer<typeof loginUserInput>;
