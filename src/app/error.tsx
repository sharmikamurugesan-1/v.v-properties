"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Runtime Error]", error);
  }, [error]);

  return (
    <div className="py-32 md:py-48 bg-ivory min-h-screen flex items-center justify-center text-center">
      <Container className="max-w-lg">
        <Eyebrow>System Notice</Eyebrow>
        <Heading level={2} className="mt-3">
          An unexpected interruption occurred
        </Heading>
        <p className="text-muted text-sm mt-4 font-light leading-relaxed">
          We encountered an issue rendering this section. You can retry the operation or return to our homepage.
        </p>

        <div className="pt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-ink text-ivory text-xs uppercase tracking-wider font-medium hover:bg-ink/90 transition-colors"
          >
            Retry Request
          </button>
          <Button href="/" variant="outline" size="md">
            Return to Homepage
          </Button>
        </div>
      </Container>
    </div>
  );
}
