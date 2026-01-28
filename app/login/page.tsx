"use client";

import { Card } from "@/components/ui/card";
import LoginHeader from "@/components/login/LoginHeader";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#faf7f3] px-4 py-10">
      <div className="mx-auto w-full max-w-md">
        <Card className="rounded-3xl border-black/10 shadow-sm">
          <LoginHeader />
          <LoginForm />
        </Card>
      </div>
    </div>
  );
}
