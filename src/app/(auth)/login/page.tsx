import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "./LoginForm";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/auth";
export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) redirect("/dashboard");

  return (
    <AuthLayout mode="login">
      <LoginForm />
    </AuthLayout>
  );
}
