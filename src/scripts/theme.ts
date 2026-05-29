// Theme management utility
const THEMES = ['default', 'strategic', 'innovator', 'midnight'] as const;
type Theme = (typeof THEMES)[number];

const THEME_STORAGE_KEY = 'theme';

export function getAvailableThemes(): Theme[] {
  return [...THEMES];
}

export function getCurrentTheme(): Theme {
  // Check localStorage first
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored) {
    const match = stored.match(/^(\w+)-dark$/);
    if (match && THEMES.includes(match[1] as Theme)) {
      return match[1] as Theme;
    }
  }

  // Check document data-theme attribute
  const root = document.documentElement;
  const dataTheme = root.getAttribute('data-theme');
  if (dataTheme) {
    const match = dataTheme.match(/^(\w+)-dark$/);
    if (match && THEMES.includes(match[1] as Theme)) {
      return match[1] as Theme;
    }
  }

  return 'default';
}

export function setTheme(theme: Theme): void {
  if (!THEMES.includes(theme)) {
    console.warn(`Invalid theme: ${theme}. Using 'default' instead.`);
    theme = 'default';
  }

  const themeAttribute = `${theme}-dark`;

  // Update document attribute
  document.documentElement.setAttribute('data-theme', themeAttribute);

  // Save to localStorage (matching existing format)
  localStorage.setItem(THEME_STORAGE_KEY, themeAttribute);

  // Dispatch custom event for other listeners
  window.dispatchEvent(
    new CustomEvent('theme-changed', { detail: { theme } })
  );
}

export function getNextTheme(): Theme {
  const current = getCurrentTheme();
  const currentIndex = THEMES.indexOf(current);
  const nextIndex = (currentIndex + 1) % THEMES.length;
  return THEMES[nextIndex];
}

export function initializeTheme(): void {
  const theme = getCurrentTheme();
  setTheme(theme);
}
