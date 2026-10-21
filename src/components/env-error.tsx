/** Rendered instead of the app when required VITE_* variables are missing or invalid. */
export function EnvError({ missing }: { missing: string[] }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-4 px-6">
      <h1 className="text-2xl font-bold">Falta configuración</h1>
      <p className="text-muted-foreground">
        La app no puede arrancar porque estas variables de entorno faltan o son inválidas:
      </p>
      <ul className="list-disc pl-6 font-mono text-sm">
        {missing.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <p className="text-sm text-muted-foreground">
        Copiá <code>.env.example</code> a <code>.env</code> y completalas (o configuralas en
        Vercel).
      </p>
    </main>
  );
}
