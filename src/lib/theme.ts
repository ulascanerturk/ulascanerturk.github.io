export type Theme = 'light' | 'dark';

export const THEMES: readonly Theme[] = ['light', 'dark'];
export const DEFAULT_THEME: Theme = 'light';
export const THEME_STORAGE_KEY = 'theme';

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

/**
 * Resolves the active theme: a stored manual choice wins, then the system
 * preference, then the default (light).
 */
export function resolveTheme(stored: string | null | undefined, systemPrefersDark: boolean): Theme {
  if (isTheme(stored)) return stored;
  return systemPrefersDark ? 'dark' : DEFAULT_THEME;
}

/**
 * Inline <head> script (ADR-004, ≤ 1 KB): applies the theme before first paint
 * (no FOUC), keeps `aria-pressed` on `[data-theme-toggle]` buttons in sync,
 * persists the manual choice and follows system changes while none is stored.
 *
 * It mirrors `resolveTheme` because inline scripts are not bundled; theme.test.ts
 * runs this exact string to keep both in step. Keep it static (no interpolation)
 * so a CSP hash stays valid (Faz 4, ADR-011).
 */
export const themeScript = `(function () {
  var d = document.documentElement, k = 'theme', s = null;
  var m = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  try { s = localStorage.getItem(k); } catch (e) {}
  if (s !== 'light' && s !== 'dark') s = null;
  function set(t) {
    d.dataset.theme = t;
    var b = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < b.length; i++) b[i].setAttribute('aria-pressed', String(t === 'dark'));
  }
  set(s || (m && m.matches ? 'dark' : 'light'));
  document.addEventListener('DOMContentLoaded', function () { set(d.dataset.theme); });
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest || !t.closest('[data-theme-toggle]')) return;
    s = d.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(k, s); } catch (e) {}
    set(s);
  });
  if (m && m.addEventListener) m.addEventListener('change', function (e) { if (!s) set(e.matches ? 'dark' : 'light'); });
})();`;
