import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';

import { News } from '../models/news.model';
import { UserSessionService } from '../../../core/user/user-session.service';

/**
 * localStorage key prefixes. The current user is appended (`supporthub_news_read:diego`);
 * without an identified user the bare key is used as a fallback.
 */
export const NEWS_READ_KEY = 'supporthub_news_read';
export const NEWS_DISMISSED_KEY = 'supporthub_news_dismissed';

/** Scoped storage key for a user (`null` → global fallback key). */
export function newsStorageKey(prefix: string, userName: string | null): string {
  const user = userName?.trim().toLowerCase();
  return user ? `${prefix}:${user}` : prefix;
}

/**
 * Single place that knows the announcements and, per user, which ones were read and which
 * home banners were closed. Closing a banner never marks the announcement as read.
 *
 * The sidebar badge needs this service on every page, so it lives in the initial bundle;
 * the announcements themselves (data/news.data.ts) are loaded on demand with a dynamic
 * import, so their content stays out of the initial bundle. Everything below is a signal
 * and updates by itself when the data arrives.
 */
@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly session = inject(UserSessionService);
  /** Bumped on every write and on storage events from other tabs → re-reads storage. */
  private readonly revision = signal(0);

  /** `null` until the data chunk has loaded. */
  private readonly items = signal<readonly News[] | null>(null);

  /** `true` once the announcements are available (avoids showing "not found" too early). */
  readonly loaded = computed(() => this.items() !== null);

  /** All announcements, newest first (empty until loaded). */
  readonly all = computed<readonly News[]>(() => this.items() ?? []);

  /** Resolves when the announcements are loaded (used by tests). */
  readonly ready: Promise<void> = import('../data/news.data').then(({ NEWS }) =>
    this.items.set([...NEWS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))),
  );

  private readonly readKey = computed(() => newsStorageKey(NEWS_READ_KEY, this.session.name()));
  private readonly dismissedKey = computed(() =>
    newsStorageKey(NEWS_DISMISSED_KEY, this.session.name()),
  );

  /** Last written lists: fallback when localStorage is unavailable (private mode…). */
  private readonly memory = new Map<string, readonly string[]>();

  private readonly readIds = computed(() => {
    this.revision();
    return new Set(this.load(this.readKey()));
  });
  private readonly dismissedIds = computed(() => {
    this.revision();
    return new Set(this.load(this.dismissedKey()));
  });

  readonly unreadCount = computed(
    () => this.all().filter((news) => !this.readIds().has(news.id)).length,
  );

  /** Home banner: most recent important announcement not read and not closed. */
  readonly banner = computed<News | null>(
    () =>
      this.all().find(
        (news) =>
          news.priority === 'important' &&
          !this.readIds().has(news.id) &&
          !this.dismissedIds().has(news.id),
      ) ?? null,
  );

  constructor() {
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key.startsWith('supporthub_news_')) {
        this.revision.update((value) => value + 1);
      }
    };
    globalThis.addEventListener?.('storage', onStorage);
    inject(DestroyRef).onDestroy(() => globalThis.removeEventListener?.('storage', onStorage));
  }

  /** Reactive when called inside a template or `computed`. */
  bySlug(slug: string): News | null {
    return this.all().find((news) => news.slug === slug) ?? null;
  }

  /** Reactive when called inside a template or `computed`. */
  isRead(id: string): boolean {
    return this.readIds().has(id);
  }

  markAsRead(id: string): void {
    this.write(this.readKey(), [...this.readIds(), id]);
  }

  markAsUnread(id: string): void {
    this.write(
      this.readKey(),
      [...this.readIds()].filter((item) => item !== id),
    );
  }

  /** Hides the home banner for this announcement. Does NOT mark it as read. */
  dismissBanner(id: string): void {
    this.write(this.dismissedKey(), [...this.dismissedIds(), id]);
  }

  private write(key: string, ids: readonly string[]): void {
    const unique = [...new Set(ids)];
    this.memory.set(key, unique);
    try {
      globalThis.localStorage?.setItem(key, JSON.stringify(unique));
    } catch {
      // Storage unavailable (private mode…): kept in memory for this session only.
    }
    this.revision.update((value) => value + 1);
  }

  private load(key: string): readonly string[] {
    try {
      const stored = globalThis.localStorage?.getItem(key);
      if (stored != null) {
        const parsed: unknown = JSON.parse(stored);
        return Array.isArray(parsed)
          ? parsed.filter((item): item is string => typeof item === 'string')
          : [];
      }
    } catch {
      // Unavailable or corrupted value: fall back to memory.
    }
    return this.memory.get(key) ?? [];
  }
}
