export const environment = {
  production: false,
  remotes: {
    'mfe-dashboard': 'http://localhost:4300/remoteEntry.json',
    'mfe-tasks': 'http://localhost:4301/remoteEntry.json',
    'mfe-iam': 'http://localhost:4302/remoteEntry.json',
    'mfe-marketing': 'http://localhost:4303/remoteEntry.json'
  }
} as const;
