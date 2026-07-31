import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type EdsTheme = 'light' | 'dark';

type ThemeContextValue = {
  theme: EdsTheme;
  setTheme: (theme: EdsTheme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export type ThemeProviderProps = {
  theme?: EdsTheme;
  defaultTheme?: EdsTheme;
  children: ReactNode;
  /** Element that receives `eds-theme-dark` (defaults to document.documentElement). */
  target?: HTMLElement | null;
};

/**
 * Applies light/dark tokens via the `eds-theme-dark` class (parity with WC Storybook themes).
 */
export function ThemeProvider({
  theme: controlledTheme,
  defaultTheme = 'light',
  children,
  target,
}: ThemeProviderProps) {
  const [uncontrolled, setUncontrolled] = useState<EdsTheme>(defaultTheme);
  const theme = controlledTheme ?? uncontrolled;

  const setTheme = useCallback(
    (next: EdsTheme) => {
      if (controlledTheme === undefined) setUncontrolled(next);
    },
    [controlledTheme],
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);

  useEffect(() => {
    const isDark = theme === 'dark';
    const targets = target
      ? [target]
      : [document.documentElement, document.body].filter(Boolean);

    for (const el of targets) {
      el.classList.toggle('eds-theme-dark', isDark);
    }

    return () => {
      if (!target) {
        document.documentElement.classList.remove('eds-theme-dark');
        document.body.classList.remove('eds-theme-dark');
      }
    };
  }, [theme, target]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
