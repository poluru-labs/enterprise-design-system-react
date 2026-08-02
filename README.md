# @poluru-labs/enterprise-design-system-react

Token-driven enterprise UI library built with **React**, **TypeScript**, **Jest**, and **Storybook**. Feature parity with [`@poluru-labs/enterprise-design-system-wc`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc), plus React APIs (`ThemeProvider`, `ToastProvider` / `useToast`).

[![npm version](https://img.shields.io/npm/v/@poluru-labs/enterprise-design-system-react.svg)](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react)
[![npm downloads](https://img.shields.io/npm/dm/@poluru-labs/enterprise-design-system-react.svg)](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react)
[![License: MIT](https://img.shields.io/npm/l/@poluru-labs/enterprise-design-system-react.svg)](https://github.com/poluru-labs/enterprise-design-system-react/blob/main/LICENSE)
[![CI](https://github.com/poluru-labs/enterprise-design-system-react/actions/workflows/ci.yml/badge.svg)](https://github.com/poluru-labs/enterprise-design-system-react/actions/workflows/ci.yml)
[![Demo](https://img.shields.io/badge/demo-Storybook-ff4785.svg)](https://polurus.com/enterprise-design-system-react/)

## Demo

Live Demo: [enterprise-design-system-react](https://polurus.com/enterprise-design-system-react/)

## Playground

Try it here: [enterprise-design-system-react](https://polurus.com/enterprise-design-system-react/)


## Install

```bash
npm install @poluru-labs/enterprise-design-system-react
```

**Peer dependencies:** React 18.3+ or 19.  
**Runtime:** Node.js 20+ for tooling.

```bash
yarn add @poluru-labs/enterprise-design-system-react
pnpm add @poluru-labs/enterprise-design-system-react
```

## Usage

```tsx
import {
  Button,
  ThemeProvider,
  ToastProvider,
  showToast,
} from '@poluru-labs/enterprise-design-system-react';
// Required — component styles + tokens (Vite does not inject CSS from the JS entry)
import '@poluru-labs/enterprise-design-system-react/styles.css';

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <Button
          onClick={() => showToast({ title: 'Saved', variant: 'success' })}
        >
          Save
        </Button>
      </ToastProvider>
    </ThemeProvider>
  );
}
```

### Package exports

| Import | What you get |
| --- | --- |
| `@poluru-labs/enterprise-design-system-react` | Components, theme, toast APIs, typed tokens |
| `@poluru-labs/enterprise-design-system-react/styles.css` | **Bundled tokens + component styles (import this in apps)** |
| `@poluru-labs/enterprise-design-system-react/tokens.css` | Tokens only (light + dark), if you need tokens without the full style bundle |

### Dark theme

```tsx
<ThemeProvider defaultTheme="dark">{/* … */}</ThemeProvider>
```

Or add class `eds-theme-dark` on `html` / `body`.

### Design tokens

```ts
import { tokens, color, spacing } from '@poluru-labs/enterprise-design-system-react';
```

## Features

- React 18+ / 19 components with TypeScript
- Shared design tokens with the WC package (color, typography, spacing, radius, elevation, motion)
- Light + dark themes via `ThemeProvider` / `useTheme`
- Toasts via `ToastProvider` / `useToast` / `showToast`
- Accessible defaults: labels, ARIA, keyboard support, focus-visible styles
- Storybook 8 with Controls, Docs, **a11y**, themes, and interactions
- Jest + Testing Library (coverage thresholds enforced)

## Accessibility

- Semantic controls and labelled form fields
- Icon-only buttons support `accessibleLabel` / `aria-label`
- Keyboard support for overlays, menus, tabs, tree view, calendars, and file upload
- `VisuallyHidden` helper for screen-reader-only content
- Storybook **Accessibility** addon (`@storybook/addon-a11y`) on every story
- ESLint `jsx-a11y` rules in the package toolchain

## Components

50+ components including Button, Input, Select, Checkbox, Switch, Tabs, Modal, Drawer, Toast, DataTable, DatePicker, Accordion, Alert, Avatar, Badge, Card, Combobox, DropdownMenu, Pagination, Slider, Tooltip, TreeView, and more.

`Eds*` aliases are exported alongside React names (e.g. `EdsButton = Button`).

See [RELEASE_NOTES.md](https://github.com/poluru-labs/enterprise-design-system-react/blob/main/RELEASE_NOTES.md) for the full list.

## Documentation

| Resource | Link |
| --- | --- |
| **Demo (Storybook)** | https://polurus.com/enterprise-design-system-react/ |
| GitHub | https://github.com/poluru-labs/enterprise-design-system-react |
| Changelog | https://github.com/poluru-labs/enterprise-design-system-react/blob/main/CHANGELOG.md |
| Contributing | https://github.com/poluru-labs/enterprise-design-system-react/blob/main/CONTRIBUTING.md |
| Support | https://github.com/poluru-labs/enterprise-design-system-react/blob/main/SUPPORT.md |
| Security | https://github.com/poluru-labs/enterprise-design-system-react/blob/main/SECURITY.md |
| Sibling (WC) | https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-wc |

### Local Storybook

```bash
git clone https://github.com/poluru-labs/enterprise-design-system-react.git
cd enterprise-design-system-react
npm install
npm run storybook
```

Open http://localhost:6007

## Author

**[Subrahmanyam Poluru](https://polurus.com)**  

Design systems architect and product engineer. Builds token-driven component libraries and documentation platforms for enterprise teams.

- Portfolio: [polurus.com](https://polurus.com)
- LinkedIn: [linkedin.com/in/polurus](https://www.linkedin.com/in/polurus/)
- GitHub: [github.com/poluru-labs](https://github.com/poluru-labs)
- npm: [@poluru-labs/enterprise-design-system-react](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react)

## License

[MIT](https://github.com/poluru-labs/enterprise-design-system-react/blob/main/LICENSE) © [Subrahmanyam Poluru](https://polurus.com) / 

See [NOTICE](https://github.com/poluru-labs/enterprise-design-system-react/blob/main/NOTICE) and [AUTHORS](https://github.com/poluru-labs/enterprise-design-system-react/blob/main/AUTHORS).

## Issues

Bugs and feature requests: [GitHub Issues](https://github.com/poluru-labs/enterprise-design-system-react/issues)  
Security reports: [SECURITY.md](https://github.com/poluru-labs/enterprise-design-system-react/blob/main/SECURITY.md) (private disclosure)
