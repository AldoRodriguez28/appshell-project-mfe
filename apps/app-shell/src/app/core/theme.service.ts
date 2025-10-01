import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'appshell-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly mode = signal<ThemeMode>(this.resolveInitialMode());

  readonly mode$ = this.mode.asReadonly();

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    this.applyClass(this.mode());
  }

  toggle(): void {
    const next = this.mode() === 'dark' ? 'light' : 'dark';
    this.setMode(next);
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
    this.applyClass(mode);
    if (typeof localStorage === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (err) {
      console.warn('Failed to persist theme preference', err);
    }
  }

  private resolveInitialMode(): ThemeMode {
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
        if (stored === 'light' || stored === 'dark') {
          return stored;
        }
      } catch {
        // Ignore storage errors
      }
    }

    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  private applyClass(mode: ThemeMode): void {
    const root = this.document.documentElement;
    root.classList.toggle('dark', mode === 'dark');
    root.setAttribute('data-theme', mode);
  }
}
