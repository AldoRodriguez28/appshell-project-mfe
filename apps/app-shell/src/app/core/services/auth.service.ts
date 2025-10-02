import { Injectable, Signal, signal } from '@angular/core';

import { User } from '../../shared/models/user.model';

declare const Buffer: any;

const AUTH_TOKEN_KEY = 'appshell.auth.token';

interface TokenPayload {
  sub: string;
  name: string;
  email?: string;
  avatar?: string;
  claims: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSignal = signal<User | null>(null);

  constructor() {
    this.loadUser();
  }

  user(): Signal<User | null> {
    return this.userSignal.asReadonly();
  }

  get snapshot(): User | null {
    return this.userSignal();
  }

  hasClaim(claim: string): boolean {
    return this.userSignal()?.claims.includes(claim) ?? false;
  }

  private loadUser(): void {
    const token = this.getOrCreateToken();
    if (!token) {
      this.userSignal.set(null);
      return;
    }

    const payload = this.decodeToken(token);
    if (!payload) {
      this.userSignal.set(null);
      return;
    }

    const user: User = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      avatarUrl: payload.avatar,
      claims: payload.claims ?? []
    };

    this.userSignal.set(user);
  }

  private getOrCreateToken(): string | null {
    const existing = this.readToken();
    if (existing) {
      return existing;
    }

    // const defaultPayload: TokenPayload = {
    //   sub: 'user-001',
    //   name: 'AppShell User',
    //   email: 'user@appshell.dev',
    //   avatar:
    //     'https://lh3.googleusercontent.com/aida-public/AB6AXuC_70b5l-yCx6cwyhbh8KQouk2vVTv5dFZdi6jJFyeYKQQbBqWZ7aFNNSmnrJ-xSMXQOSZXSBueDOjNNVwROurQhdqCx4AripEA8ChZpEQzN7PE-YTety6OF7U4_3jzFlzTme1MhsOseEDrUqI0vcJ1S8wf0ImP_EIL1viPQM_f-rMqbgtO3DjDUfK7TPmf1tHFird3s2mp5Zz16HN8OY0_3fAyChctCLlu_8Fu0BuZBl570HQNgpgqQnbpAHRfq53qwNBnr6B7tFxS',
    //   claims: [
    //     'module:dashboard',
    //     'module:tasks',
    //     'module:iam',
    //     'module:marketing',
    //     'action:create-order',
    //     'action:search-order',
    //     'action:close-order',
    //     'module:sales',
    //     'module:marketing-secondary',
    //     'module:operations',
    //     'module:analytics',
    //     'utility:settings',
    //     'utility:help'
    //   ]
    // };

    const defaultPayload: TokenPayload = {
      sub: 'user-001',
      name: 'AppShell User',
      email: 'user@appshell.dev',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC_70b5l-yCx6cwyhbh8KQouk2vVTv5dFZdi6jJFyeYKQQbBqWZ7aFNNSmnrJ-xSMXQOSZXSBueDOjNNVwROurQhdqCx4AripEA8ChZpEQzN7PE-YTety6OF7U4_3jzFlzTme1MhsOseEDrUqI0vcJ1S8wf0ImP_EIL1viPQM_f-rMqbgtO3DjDUfK7TPmf1tHFird3s2mp5Zz16HN8OY0_3fAyChctCLlu_8Fu0BuZBl570HQNgpgqQnbpAHRfq53qwNBnr6B7tFxS',
      claims: [
        'module:dashboard',
        'module:tasks',
        'module:iam',
        'module:marketing'
      ]
    };

    const token = this.buildToken(defaultPayload);
    this.storeToken(token);
    return token;
  }

  private readToken(): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  private storeToken(token: string): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  private buildToken(payload: TokenPayload): string {
    const header = { alg: 'none', typ: 'JWT' };
    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
    return `${encodedHeader}.${encodedPayload}.`;
  }

  private decodeToken(token: string): TokenPayload | null {
    const segments = token.split('.');
    if (segments.length < 2) {
      return null;
    }

    try {
      const json = this.base64UrlDecode(segments[1]);
      return JSON.parse(json) as TokenPayload;
    } catch {
      return null;
    }
  }

  private base64UrlEncode(value: string): string {
    let base64: string;
    if (typeof btoa === 'function') {
      base64 = btoa(value);
    } else if (typeof Buffer !== 'undefined') {
      base64 = Buffer.from(value, 'utf-8').toString('base64');
    } else {
      throw new Error('No base64 encoder available in this environment');
    }

    return base64.replace(/=+/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  }

  private base64UrlDecode(value: string): string {
    let base64 = value.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }

    if (typeof atob === 'function') {
      return atob(base64);
    }

    if (typeof Buffer !== 'undefined') {
      return Buffer.from(base64, 'base64').toString('utf-8');
    }

    throw new Error('No base64 decoder available in this environment');
  }
}
