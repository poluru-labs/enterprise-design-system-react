import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import '../src/tokens/index.css';
import '../src/foundations/global.css';
import { withEdsTheme } from './withEdsTheme';

const preview: Preview = {
  decorators: [withEdsTheme],
  initialGlobals: {
    theme: 'light',
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    docs: {
      theme: themes.light,
      toc: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Introduction',
          ['Author'],
          'Foundations',
          ['Icons', 'Themes', 'Tokens', 'Typography'],
          'Components',
        ],
      },
    },
    layout: 'centered',
    backgrounds: {
      disable: true,
    },
    a11y: {
      test: 'todo',
    },
  },
  tags: ['autodocs'],
};

export default preview;
