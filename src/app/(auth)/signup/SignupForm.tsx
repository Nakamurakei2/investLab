"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  LockKeyhole,
  UserRound,
  Check,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { CreateUserInput, createUserSchema } from "@/app/schemas/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false),
    [accepted, setAccepted] = useState(false),
    [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      checkbox: false,
    },
  });

  const onSubmit = async (userInputs: CreateUserInput) => {
    setSubmitted(true);

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInputs),
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message);
        return;
      }

      const data = await res.json();
      toast.success(data.message);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (e: unknown) {
      console.error("e", e);
      // timeout error
      if (e instanceof Error && e.name === "TimeoutError") {
        toast.error(
          "通信がタイムアウトしました。通信環境をご確認のうえ、再度お試しください。",
        );
        return;
      }

      // offline/server down error
      toast.error("通信エラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setSubmitted(false);
    }
  };
  return (
    <div className="auth-form-content signup-content">
      <span className="auth-overline">START YOUR JOURNEY</span>
      <h2>アカウントを作成</h2>
      <p className="auth-description">
        無料で登録して、自分だけの投資ラボを始めましょう。
      </p>
      <div className="signup-benefit">
        <span>
          <CheckCircle2 size={15} />
          初期設定はかんたん1分
        </span>
        <span>
          <CheckCircle2 size={15} />
          仮想資金で安心して体験
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form signup-form">
        <label className="auth-field">
          <span>お名前</span>
          <div className="auth-input-wrap">
            <UserRound size={17} />
            <input
              type="text"
              autoComplete="name"
              placeholder="山田 太郎"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </label>
        <label className="auth-field">
          <span>メールアドレス</span>
          <div className="auth-input-wrap">
            <Mail size={17} />
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </label>
        <label className="auth-field">
          <span>パスワード</span>
          <div className="auth-input-wrap">
            <LockKeyhole size={17} />
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="8文字以上で入力"
              minLength={8}
              {...register("password")}
            />

            <button
              type="button"
              className="password-toggle"
              aria-label={
                showPassword ? "パスワードを隠す" : "パスワードを表示"
              }
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </label>
        <label className="remember-row terms-row">
          <input
            type="checkbox"
            checked={accepted}
            {...register("checkbox")}
            onChange={(e) => setAccepted(e.target.checked)}
          />

          <span className="fake-checkbox">
            {accepted && <Check size={12} />}
          </span>

          <span>利用規約とプライバシーポリシーに同意します</span>
        </label>
        {errors.checkbox && (
          <p className="error-message">{errors.checkbox.message}</p>
        )}
        <button className="auth-submit" type="submit">
          無料でアカウントを作成 <ArrowRight size={16} />
        </button>
        {submitted && (
          <p role="status" className="auth-feedback">
            画面プレビューです。アカウント登録機能はまだ接続されていません。
          </p>
        )}
      </form>
      <p className="auth-switch">
        すでにアカウントをお持ちですか？{" "}
        <Link href="/login">
          ログイン <ArrowRight size={14} />
        </Link>
      </p>
    </div>
  );
}
