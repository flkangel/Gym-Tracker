import { useRegisterSW } from 'virtual:pwa-register/react';

import { Button } from '@/components/ui/button';

/** Shows a banner when a new service worker is waiting, so the user picks when to reload. */
export function PwaUpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div
      role="status"
      className="bg-card text-card-foreground fixed inset-x-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)] mx-auto flex max-w-md items-center justify-between gap-3 rounded-xl border p-4 shadow-lg"
    >
      <p>Hay una nueva versión.</p>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={() => setNeedRefresh(false)}>
          Después
        </Button>
        <Button onClick={() => void updateServiceWorker(true)}>Actualizar</Button>
      </div>
    </div>
  );
}
