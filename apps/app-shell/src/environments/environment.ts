type RemoteMap = Record<string, string>;

declare global {
  // eslint-disable-next-line no-var
  var __appShellRemotes__: RemoteMap | undefined;
}

const overrides: RemoteMap = globalThis.__appShellRemotes__ ?? {};

export const environment = {
  production: true,
  remotes: {
    'mfe-dashboard': overrides['mfe-dashboard'] ?? 'http://localhost:4300/remoteEntry.json',
    'mfe-tasks': overrides['mfe-tasks'] ?? 'http://localhost:4301/remoteEntry.json',
    'mfe-iam': overrides['mfe-iam'] ?? 'http://localhost:4302/remoteEntry.json',
    'mfe-marketing': overrides['mfe-marketing'] ?? 'http://localhost:4303/remoteEntry.json'
  }
} as const;
