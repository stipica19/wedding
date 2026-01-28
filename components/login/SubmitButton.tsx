"use client";

import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  disabled: boolean;
  loading: boolean;
}

export default function SubmitButton({ disabled, loading }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className="h-12 w-full rounded-2xl text-base"
    >
      {loading ? "Prijavljujem..." : "Prijava"}
    </Button>
  );
}
