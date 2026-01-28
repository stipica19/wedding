"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import EmailField from "@/components/login/EmailField";
import PasswordField from "@/components/login/PasswordField";
import FormError from "@/components/login/FormError";
import SubmitButton from "@/components/login/SubmitButton";
import { CardContent } from "@/components/ui/card";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.length > 0 && !loading;
  }, [email, password, loading]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setErr("Krivi email ili lozinka.");
        return;
      }

      router.push("/admin/rsvp");
    } catch {
      setErr("Došlo je do greške. Pokušaj ponovno.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CardContent className="pt-4">
      <form onSubmit={onSubmit} className="space-y-5">
        <EmailField value={email} onChange={setEmail} />
        <PasswordField
          value={password}
          onChange={setPassword}
          show={showPw}
          onToggleShow={() => setShowPw((v) => !v)}
        />
        <FormError message={err} />
        <SubmitButton disabled={!canSubmit} loading={loading} />
      </form>
    </CardContent>
  );
}
