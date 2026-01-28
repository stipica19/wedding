"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function EmailField({ value, onChange }: EmailFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="admin@mail.com"
        inputMode="email"
        autoComplete="email"
        className="h-12 rounded-2xl border-black/10 bg-white"
      />
    </div>
  );
}
