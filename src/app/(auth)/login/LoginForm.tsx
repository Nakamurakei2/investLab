"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  LockKeyhole,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { loginUserInput, LoginUserInput } from "@/app/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserInput),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (loginData: LoginUserInput) => {
    setSubmitted(true);

    try {
      const res = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("data", data);
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
    <div className="auth-form-content">
      <span className="auth-overline">WELCOME BACK</span>
      <h2>おかえりなさい</h2>
      <p className="auth-description">
        アカウントにログインして、投資体験を続けましょう。
      </p>
      <button
        type="button"
        className="social-button"
        onClick={() => setSubmitted(true)}
      >
        <span className="google-mark">G</span>Googleで続ける
      </button>
      <div className="auth-divider">
        <span />
        またはメールアドレスで
        <span />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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
          <span className="field-label-row">
            パスワード{" "}
            <Link
              href="#password-reset"
              onClick={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              パスワードをお忘れですか？
            </Link>
          </span>
          <div className="auth-input-wrap">
            <LockKeyhole size={17} />
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="パスワードを入力"
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
        <label className="remember-row">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <span className="fake-checkbox">
            <Check size={12} />
          </span>
          ログイン状態を保持
        </label>

        <button className="auth-submit" type="submit">
          ログイン <ArrowRight size={16} />
        </button>
        {submitted && (
          <p role="status" className="auth-feedback">
            画面プレビューです。ログイン機能はまだ接続されていません。
          </p>
        )}
      </form>
      <p className="auth-switch">
        アカウントをお持ちでないですか？{" "}
        <Link href="/signup">
          無料で新規登録 <ArrowRight size={14} />
        </Link>
      </p>
    </div>
  );
}
