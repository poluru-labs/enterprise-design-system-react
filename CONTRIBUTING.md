# Contributing to Enterprise Design System (React)

Thanks for your interest in contributing to `@poluru-labs/enterprise-design-system-react`.

## Development setup

```bash
git clone https://github.com/poluru-labs/enterprise-design-system-react.git
cd enterprise-design-system-react
npm install
npm run storybook   # http://localhost:6007
```

Node.js **20+** is required.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run storybook` | Component playground + docs |
| `npm run test` | Jest unit tests |
| `npm run test:coverage` | Coverage report under `coverage/` |
| `npm run lint` | ESLint (TypeScript + React + jsx-a11y) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Library bundle |
| `npm run verify` | typecheck + lint + test + build |
| `npm run release:check` | Full pre-publish verification |

## Project conventions

- **One folder per component** under `src/components/<Name>/`
- Implementation: `Name.tsx` + `Name.module.css`
- Colocated tests: `Name.test.tsx`
- Stories: `Name.stories.tsx`
- Prefer design tokens (`--eds-*`) over hard-coded values
- Accessible names, roles, and keyboard behavior for interactive controls

## Pull requests

1. Create a focused branch from `main`
2. Keep changes scoped (one component / one concern when possible)
3. Add or update unit tests for behavior changes
4. Run `npm run verify` before opening the PR
5. Update `CHANGELOG.md` under **Unreleased** when user-facing behavior changes
6. Describe *why* in the PR body; link related issues

## Coding standards

- TypeScript strict mode
- React 18+ patterns and hooks
- Accessible names, roles, and keyboard behavior for interactive controls
- No secrets or credentials in the repo

## Reporting issues

Use GitHub Issues with:

- Package version
- React / browser / Node version
- Minimal reproduction (JSX or Storybook steps)
- Expected vs actual behavior

## Code of conduct

See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## Author

Maintained by **[Subrahmanyam Poluru](https://polurus.com)** (Poluru Labs).

- Portfolio: [polurus.com](https://polurus.com)
- LinkedIn: [linkedin.com/in/polurus](https://www.linkedin.com/in/polurus/)
- Support: [SUPPORT.md](./SUPPORT.md)
