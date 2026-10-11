import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="glass-card max-w-md p-8 border border-border">
        <h1 className="text-6xl font-bold font-mono text-gradient mb-2">404</h1>
        <h2 className="text-xl font-semibold text-text-primary mb-3">
          Page Not Found
        </h2>
        <p className="text-text-secondary mb-6 text-sm">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="glow">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
