import { AuthLayout } from "@/components/auth/auth-layout";
import { SignupForm } from "./SignupForm";
import { getCurrentUser } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
export default async function SignupPage() {
  const user = await getCurrentUser();

  if (user) redirect("/dashboard");

  return (
    <AuthLayout mode="signup">
      <SignupForm />
    </AuthLayout>
  );
}
