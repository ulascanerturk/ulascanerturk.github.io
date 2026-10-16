import { describe, expect, it } from 'vitest';

import { THEME_STORAGE_KEY, isTheme, resolveTheme, themeScript } from './theme';

describe('resolveTheme', () => {
  it('prefers a stored manual choice over the system preference', () => {
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });

  it('falls back to the system preference when nothing valid is stored', () => {
    expect(resolveTheme(null, true)).toBe('dark');
    expect(resolveTheme('sepia', true)).toBe('dark');
  });

  it('defaults to light', () => {
    expect(resolveTheme(null, false)).toBe('light');
    expect(resolveTheme(undefined, false)).toBe('light');
  });
});

describe('isTheme', () => {
  it('accepts only the two themes', () => {
    expect(isTheme('light')).toBe(true);
    expect(isTheme('dark')).toBe(true);
    expect(isTheme('auto')).toBe(false);
    expect(isTheme(null)).toBe(false);
  });
});

type Listener = (event: { target?: unknown; matches?: boolean }) => void;

/** Runs themeScript against a minimal fake DOM and returns handles to drive it. */
function runScript(options: {
  stored?: string | null;
  systemDark?: boolean;
  storageThrows?: boolean;
}) {
  const store = new Map<string, string>();
  if (options.stored != null) store.set(THEME_STORAGE_KEY, options.stored);

  const button = {
    attrs: new Map<string, string>(),
    setAttribute(name: string, value: string) {
      this.attrs.set(name, value);
    },
    closest(selector: string) {
      return selector === '[data-theme-toggle]' ? this : null;
    },
  };
  const docListeners = new Map<string, Listener>();
  let mediaListener: Listener | undefined;

  const documentElement = { dataset: {} as Record<string, string> };
  const fakeDocument = {
    documentElement,
    querySelectorAll: () => [button],
    addEventListener: (type: string, fn: Listener) => docListeners.set(type, fn),
  };
  const fakeStorage = {
    getItem(key: string) {
      if (options.storageThrows) throw new Error('blocked');
      return store.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      if (options.storageThrows) throw new Error('blocked');
      store.set(key, value);
    },
  };
  const media = {
    matches: options.systemDark ?? false,
    addEventListener: (_type: string, fn: Listener) => {
      mediaListener = fn;
    },
  };
  const fakeMatchMedia = () => media;

  new Function('window', 'document', 'localStorage', 'matchMedia', themeScript)(
    { matchMedia: fakeMatchMedia },
    fakeDocument,
    fakeStorage,
    fakeMatchMedia,
  );

  return {
    theme: () => documentElement.dataset.theme,
    pressed: () => button.attrs.get('aria-pressed'),
    stored: () => store.get(THEME_STORAGE_KEY),
    click: () => docListeners.get('click')?.({ target: button }),
    clickElsewhere: () => docListeners.get('click')?.({ target: { closest: () => null } }),
    systemChange: (dark: boolean) => mediaListener?.({ matches: dark }),
  };
}

describe('themeScript', () => {
  it('stays within the 1 KB inline script budget', () => {
    expect(new TextEncoder().encode(themeScript).length).toBeLessThanOrEqual(1024);
  });

  it.each([
    { stored: 'light', systemDark: true },
    { stored: 'dark', systemDark: false },
    { stored: null, systemDark: true },
    { stored: null, systemDark: false },
    { stored: 'sepia', systemDark: true },
  ])('applies the same theme as resolveTheme (%o)', ({ stored, systemDark }) => {
    const page = runScript({ stored, systemDark });
    expect(page.theme()).toBe(resolveTheme(stored, systemDark));
    expect(page.pressed()).toBe(String(page.theme() === 'dark'));
  });

  it('toggles, persists the choice and updates aria-pressed', () => {
    const page = runScript({ systemDark: false });
    page.click();
    expect(page.theme()).toBe('dark');
    expect(page.stored()).toBe('dark');
    expect(page.pressed()).toBe('true');
    page.click();
    expect(page.theme()).toBe('light');
    expect(page.stored()).toBe('light');
    expect(page.pressed()).toBe('false');
  });

  it('ignores clicks outside the toggle', () => {
    const page = runScript({ systemDark: false });
    page.clickElsewhere();
    expect(page.theme()).toBe('light');
    expect(page.stored()).toBeUndefined();
  });

  it('follows system changes only while no choice is stored', () => {
    const page = runScript({ systemDark: false });
    page.systemChange(true);
    expect(page.theme()).toBe('dark');
    page.click();
    page.systemChange(true);
    expect(page.theme()).toBe('light');
  });

  it('still works when storage is unavailable', () => {
    const page = runScript({ systemDark: true, storageThrows: true });
    expect(page.theme()).toBe('dark');
    page.click();
    expect(page.theme()).toBe('light');
  });
});
