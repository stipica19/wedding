"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  onToggleShow: () => void;
}

export default function PasswordField({
  value,
  onChange,
  show,
  onToggleShow,
}: PasswordFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="password">Lozinka</Label>
      <div className="relative">
        <Input
          id="password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          type={show ? "text" : "password"}
          autoComplete="current-password"
          className="h-12 rounded-2xl border-black/10 bg-white pr-12"
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border border-black/10 bg-white p-2 text-black/70 hover:text-black"
          aria-label={show ? "Sakrij lozinku" : "Prikaži lozinku"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
