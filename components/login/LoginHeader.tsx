"use client";

import { CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function LoginHeader() {
  return (
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
  );
}
