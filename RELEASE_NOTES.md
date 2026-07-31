# Release Notes

All notable changes to `@poluru-labs/enterprise-design-system-react` are documented in this file.

Format inspired by [Keep a Changelog](https://keepachangelog.com/).  
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [1.0.0] — 2026-07-22

Initial public release of the **Enterprise Design System (React)** — feature parity with the Lit web-components package, adapted for React idioms.

**Author:** [Subrahmanyam Poluru](https://polurus.com) · Poluru Labs  
**LinkedIn:** [linkedin.com/in/polurus](https://www.linkedin.com/in/polurus/) · **Portfolio:** [polurus.com](https://polurus.com)

### Highlights

- React 18+ + TypeScript component library
- Shared token-driven theming (light + dark) with the WC package
- Storybook 8 living style guide
- Jest + Testing Library coverage
- React extras: `ThemeProvider`, `ToastProvider` / `useToast` / `showToast`

### Added

#### Foundations

- Design tokens: color, typography, spacing, radius, elevation, motion
- Dark theme via `eds-theme-dark` + `ThemeProvider`
- Built-in icon set (`Icon` / `EdsIcon`)
- Shared field styles and `cx` helper
- Date utilities for calendar pickers

#### Components (alphabetical React names)

Accordion, Alert, Autocomplete, Avatar, Badge, Breadcrumb, Button, ButtonGroup, Card, Checkbox, CircularProgress, CodeSnippet, Combobox, DataTable, DatePicker, DateRangePicker, DescriptionList, Divider, Drawer, DropdownMenu, EmptyState, FileUpload, Icon, Input, Kbd, Link, List, Meter, Modal, NumberInput, Pagination, PinInput, Popover, ProgressBar, Radio / RadioGroup, Rating, Search, SegmentedControl, Select, SideNav, Skeleton, Slider, Spinner, SplitButton, Stat, Status, Stepper, Switch, Tabs, Tag, Textarea, TimePicker, Timeline, Toast, Toolbar, Tooltip, TreeView, VisuallyHidden

`Eds*` aliases are exported alongside React names (e.g. `EdsButton = Button`).

#### React-specific additions (vs WC)

- `ThemeProvider` + `useTheme`
- `ToastProvider` + `useToast` + imperative `showToast`
- Controlled overlay APIs (`open` / `onOpenChange`)
- Standard React event props (`onClick`, `onChange`, …)

### Scripts

| Command | Description |
| --- | --- |
| `npm run storybook` | Develop in Storybook |
| `npm run build` | Build library |
| `npm run test` | Run Jest |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

### Upgrade notes

This is the first stable release. No migration path from prior versions.

---

## Unreleased

Changes that land after `1.0.0` will be listed here until the next tagged release.
