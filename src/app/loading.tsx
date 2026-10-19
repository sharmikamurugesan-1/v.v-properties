import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="py-32 md:py-48 bg-ivory min-h-screen flex items-center justify-center">
      <Container className="max-w-md text-center space-y-4">
        <div className="w-10 h-10 border-2 border-stone/30 border-t-accent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-mono uppercase tracking-widest text-muted">
          Loading V.V Properties Dossier...
        </p>
      </Container>
    </div>
  );
}
