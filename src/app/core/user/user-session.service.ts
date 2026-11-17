import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';

/** localStorage key holding the user's name (this browser/profile only). */
export const USER_STORAGE_KEY = 'supporthub_user';

/** Secondary text shown under the user's name. */
export const USER_ROLE = 'Agente';

export const USER_NAME_MAX_LENGTH = 60;

/** Trims the name and collapses repeated inner spaces. Returns '' when nothing is left. */
export function normalizeUserName(value: string): string {
  return value.trim().replace(/\s+/g, ' ').slice(0, USER_NAME_MAX_LENGTH);
}

/**
 * Simple user identification (no authentication): the name typed on the identification
 * screen is kept in localStorage. This service is the only place that touches the storage;
 * components read the `name` signal.
 */
@Injectable({ providedIn: 'root' })
export class UserSessionService {
  private readonly current = signal<string | null>(readStoredName());

  /** Saved name, or `null` when the user has not identified yet. */
  readonly name = this.current.asReadonly();
  readonly isIdentified = computed(() => this.current() !== null);

  constructor() {
    // Keep several open tabs in sync (e.g. "Cambiar usuario" in another tab).
    const onStorage = (event: StorageEvent) => {
      if (event.key === USER_STORAGE_KEY || event.key === null) {
        this.current.set(readStoredName());
      }
    };
    globalThis.addEventListener?.('storage', onStorage);
    inject(DestroyRef).onDestroy(() => globalThis.removeEventListener?.('storage', onStorage));
  }

  /** Saves the name. Returns `false` (and saves nothing) if it is empty after trimming. */
  identify(rawName: string): boolean {
    const name = normalizeUserName(rawName);
    if (!name) {
      return false;
    }
    try {
      globalThis.localStorage?.setItem(USER_STORAGE_KEY, name);
    } catch {
      // Storage unavailable (private mode…): the name lasts for this session only.
    }
    this.current.set(name);
    return true;
  }

  /** Forgets the saved name ("Cambiar usuario"). */
  clear(): void {
    try {
      globalThis.localStorage?.removeItem(USER_STORAGE_KEY);
    } catch {
      // Ignore: nothing else to clean.
    }
    this.current.set(null);
  }
}

function readStoredName(): string | null {
  try {
    const stored = globalThis.localStorage?.getItem(USER_STORAGE_KEY);
    const name = normalizeUserName(stored ?? '');
    return name || null;
  } catch {
    return null;
  }
}
