import { TestBed } from '@angular/core/testing';

import { USER_STORAGE_KEY, UserSessionService } from '../../../core/user/user-session.service';
import { NEWS_DISMISSED_KEY, NEWS_READ_KEY, NewsService, newsStorageKey } from './news.service';

const ID = 'boton-recogida-2026-11';

describe('NewsService', () => {
  const create = async () => {
    TestBed.resetTestingModule();
    const service = TestBed.inject(NewsService);
    await service.ready;
    return service;
  };

  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('loads the announcements on demand (empty, not "not found", until ready)', async () => {
    TestBed.resetTestingModule();
    const news = TestBed.inject(NewsService);
    expect(news.loaded()).toBe(false);
    expect(news.unreadCount()).toBe(0);
    await news.ready;
    expect(news.loaded()).toBe(true);
    expect(news.unreadCount()).toBe(1);
  });

  it('lists the announcements and finds them by slug', async () => {
    const news = await create();
    expect(news.all().length).toBeGreaterThan(0);
    expect(news.bySlug('boton-de-recogida-en-las-incidencias')?.id).toBe(ID);
    expect(news.bySlug('no-existe')).toBeNull();
  });

  it('counts unread announcements and offers the important one as home banner', async () => {
    const news = await create();
    expect(news.unreadCount()).toBe(1);
    expect(news.banner()?.id).toBe(ID);
  });

  it('marks as read (badge and banner disappear) and can undo it', async () => {
    const news = await create();
    news.markAsRead(ID);
    expect(news.isRead(ID)).toBe(true);
    expect(news.unreadCount()).toBe(0);
    expect(news.banner()).toBeNull();

    news.markAsUnread(ID);
    expect(news.isRead(ID)).toBe(false);
    expect(news.unreadCount()).toBe(1);
  });

  it('closing the banner hides it but does NOT mark the announcement as read', async () => {
    const news = await create();
    news.dismissBanner(ID);
    expect(news.banner()).toBeNull();
    expect(news.isRead(ID)).toBe(false);
    expect(news.unreadCount()).toBe(1);
  });

  it('keeps the state per user, with the global key as fallback', async () => {
    expect(newsStorageKey(NEWS_READ_KEY, 'Diego')).toBe('supporthub_news_read:diego');
    expect(newsStorageKey(NEWS_DISMISSED_KEY, null)).toBe('supporthub_news_dismissed');

    localStorage.setItem(USER_STORAGE_KEY, 'Diego');
    const news = await create();
    news.markAsRead(ID);
    expect(JSON.parse(localStorage.getItem('supporthub_news_read:diego')!)).toEqual([ID]);
    expect(localStorage.getItem(NEWS_READ_KEY)).toBeNull();

    // Another user on the same browser still sees it as unread.
    const session = TestBed.inject(UserSessionService);
    session.clear();
    session.identify('Ana');
    expect(news.isRead(ID)).toBe(false);
    expect(news.unreadCount()).toBe(1);

    // Back to the first user: still read.
    session.identify('Diego');
    expect(news.isRead(ID)).toBe(true);
  });

  it('restores the saved state after a reload', async () => {
    (await create()).markAsRead(ID);
    expect((await create()).isRead(ID)).toBe(true);
  });

  it('ignores corrupted stored values', async () => {
    localStorage.setItem(NEWS_READ_KEY, '{not json');
    expect((await create()).unreadCount()).toBe(1);
  });

  it('follows changes made in another tab', async () => {
    const news = await create();
    localStorage.setItem(NEWS_READ_KEY, JSON.stringify([ID]));
    window.dispatchEvent(new StorageEvent('storage', { key: NEWS_READ_KEY }));
    expect(news.isRead(ID)).toBe(true);
  });
});
