import { initFederation } from '@angular-architects/native-federation';

import { environment } from './environments/environment';

initFederation(environment.remotes)
  .catch((err) => console.error('Error inicializando federación', err))
  .then(() => import('./bootstrap'))
  .catch((err) => console.error('Error arrancando AppShell', err));
