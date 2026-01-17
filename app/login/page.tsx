"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Eye, EyeOff, Shield } from "lucide-react";

export default function LoginPage() {
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
    <div className="min-h-screen bg-[#faf7f3] px-4 py-10">
      <div className="mx-auto w-full max-w-md">
        <Card className="rounded-3xl border-black/10 shadow-sm">
          <CardHeader className="space-y-2 pb-2">
            <div className="inline-flex w-fit items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black/80">
              <Shield className="h-4 w-4" />
              Admin
            </div>
            <CardTitle className="text-2xl tracking-tight">Prijava</CardTitle>
            <p className="text-sm text-black/70">
              Unesi pristupne podatke za administraciju.
            </p>
          </CardHeader>

          <CardContent className="pt-4">
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mail.com"
                  inputMode="email"
                  autoComplete="email"
                  className="h-12 rounded-2xl border-black/10 bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Lozinka</Label>
                <div className="relative">
                  <Input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    className="h-12 rounded-2xl border-black/10 bg-white pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border border-black/10 bg-white p-2 text-black/70 hover:text-black"
                    aria-label={showPw ? "Sakrij lozinku" : "Prikaži lozinku"}
                  >
                    {showPw ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {err ? (
                <div className="rounded-2xl border border-red-500/25 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {err}
                </div>
              ) : null}

              <Button
                type="submit"
                disabled={!canSubmit}
                className="h-12 w-full rounded-2xl text-base"
              >
                {loading ? "Prijavljujem..." : "Prijava"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
