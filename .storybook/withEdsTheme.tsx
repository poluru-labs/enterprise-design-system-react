import { useEffect, type ReactNode } from 'react';
import type { Decorator } from '@storybook/react';
import { DecoratorHelpers } from '@storybook/addon-themes';

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

initializeThemeState(['light', 'dark'], 'light');

function applyThemeClass(isDark: boolean) {
  const className = 'eds-theme-dark';
  const targets = [
    document.documentElement,
    document.body,
    document.getElementById('storybook-root'),
    document.getElementById('storybook-docs'),
  ].filter(Boolean) as HTMLElement[];

  for (const el of targets) {
    el.classList.toggle(className, isDark);
  }
}

function EdsThemeFrame({
  isDark,
  children,
}: {
  isDark: boolean;
  children: ReactNode;
}) {
  useEffect(() => {
    applyThemeClass(isDark);
  }, [isDark]);

  return (
    <div
      className={isDark ? 'eds-theme-dark' : undefined}
      data-eds-theme={isDark ? 'dark' : 'light'}
      style={{
        color: 'var(--eds-color-text)',
        background: 'var(--eds-color-bg)',
        minHeight: '100%',
        boxSizing: 'border-box',
        padding: '1rem',
        borderRadius: 'var(--eds-radius-md)',
      }}
    >
      {children}
    </div>
  );
}

/**
 * Syncs Storybook toolbar theme (addon-themes) to `eds-theme-dark` on html/body/root
 * and wraps each story so CSS variables resolve inside the canvas.
 */
export const withEdsTheme: Decorator = (Story, context) => {
  const selected = pluckThemeFromContext(context);
  const override = (context.parameters.themes as { themeOverride?: string } | undefined)
    ?.themeOverride;
  const themeName = override || selected || 'light';
  const isDark = themeName === 'dark';

  return (
    <EdsThemeFrame isDark={isDark}>
      <Story />
    </EdsThemeFrame>
  );
};
