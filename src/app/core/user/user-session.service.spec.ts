import { TestBed } from '@angular/core/testing';

import { USER_STORAGE_KEY, UserSessionService, normalizeUserName } from './user-session.service';

describe('UserSessionService', () => {
  afterEach(() => localStorage.removeItem(USER_STORAGE_KEY));

  it('starts unidentified when nothing is saved', () => {
    const session = TestBed.inject(UserSessionService);
    expect(session.name()).toBeNull();
    expect(session.isIdentified()).toBe(false);
  });

  it('reads a saved name on start', () => {
    localStorage.setItem(USER_STORAGE_KEY, 'Lucía');
    expect(TestBed.inject(UserSessionService).name()).toBe('Lucía');
  });

  it('ignores a saved value made only of spaces', () => {
    localStorage.setItem(USER_STORAGE_KEY, '   ');
    expect(TestBed.inject(UserSessionService).isIdentified()).toBe(false);
  });

  it('saves the trimmed name', () => {
    const session = TestBed.inject(UserSessionService);
    expect(session.identify('   María   José  ')).toBe(true);
    expect(session.name()).toBe('María José');
    expect(localStorage.getItem(USER_STORAGE_KEY)).toBe('María José');
  });

  it('refuses an empty name', () => {
    const session = TestBed.inject(UserSessionService);
    expect(session.identify('    ')).toBe(false);
    expect(session.isIdentified()).toBe(false);
    expect(localStorage.getItem(USER_STORAGE_KEY)).toBeNull();
  });

  it('forgets the name on clear ("Cambiar usuario")', () => {
    const session = TestBed.inject(UserSessionService);
    session.identify('Pablo');
    session.clear();
    expect(session.name()).toBeNull();
    expect(localStorage.getItem(USER_STORAGE_KEY)).toBeNull();
  });

  it('normalizes names', () => {
    expect(normalizeUserName('  a  b ')).toBe('a b');
    expect(normalizeUserName(' \t ')).toBe('');
  });
});
