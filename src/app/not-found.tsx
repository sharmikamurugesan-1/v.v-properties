import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-32 md:py-48 bg-ivory min-h-screen flex items-center justify-center text-center">
      <Container className="max-w-lg">
        <Eyebrow>404 &bull; Page Not Found</Eyebrow>
        <Heading level={1} className="mt-3">
          The requested dossier does not exist
        </Heading>
        <p className="text-muted text-sm mt-4 font-light leading-relaxed">
          The link you followed may have expired, or the property identifier has been updated within our master register.
        </p>

        <div className="pt-8 flex items-center justify-center gap-4">
          <Button href="/" variant="primary" size="md">
            Return to Homepage
          </Button>
          <Button href="/projects" variant="outline" size="md">
            View Active Projects
          </Button>
        </div>
      </Container>
    </div>
  );
}
