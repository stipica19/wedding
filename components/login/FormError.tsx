"use client";

interface FormErrorProps {
  message: string | null;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <div className="rounded-2xl border border-red-500/25 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </div>
  );
}
