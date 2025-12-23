
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to Your New App
        </h1>
        <p className="text-lg text-muted-foreground">
          This is a fresh start. What would you like to build?
        </p>
        <div className="flex gap-4 justify-center">
            <Button asChild>
                <Link href="#">Get Started</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
