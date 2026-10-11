"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="glass-card max-w-md p-8 border border-red-500/30">
        <h2 className="text-2xl font-bold text-text-primary mb-3">
          Something went wrong
        </h2>
        <p className="text-text-secondary mb-6 text-sm">
          An unexpected error occurred. Please try reloading the application.
        </p>
        <Button onClick={() => reset()} variant="glow">
          Try again
        </Button>
      </div>
    </div>
  );
}
