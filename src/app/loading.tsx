export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2 h-16">
        <div className="w-2 h-12 bg-primary rounded-full animate-pulse" />
        <div className="w-2 h-16 bg-primary rounded-full animate-pulse delay-75" />
        <div className="w-2 h-10 bg-primary rounded-full animate-pulse delay-150" />
        <div className="w-2 h-14 bg-primary rounded-full animate-pulse delay-200" />
        <div className="w-2 h-8 bg-primary rounded-full animate-pulse delay-300" />
      </div>
      <p className="mt-4 text-text-secondary font-mono text-sm uppercase tracking-widest animate-pulse">
        Loading...
      </p>
    </div>
  );
}
