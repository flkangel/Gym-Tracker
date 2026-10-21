import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-3 px-6">
      <h1 className="text-4xl font-bold tracking-tight">Gym-Tracker</h1>
      <p className="text-muted-foreground text-lg">
        Estamos armando la base. Muy pronto vas a poder registrar tus entrenos acá.
      </p>
    </main>
  );
}
