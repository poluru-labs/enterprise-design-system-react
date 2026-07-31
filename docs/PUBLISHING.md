# Publishing guide

How to release `@poluru-labs/enterprise-design-system-react` to npm and GitHub.

## Prerequisites

1. npm account with publish access to the `@poluru-labs` scope
2. GitHub repo: `https://github.com/poluru-labs/enterprise-design-system-react`
3. Local Node.js 20+
4. Clean git working tree on `main`

```bash
npm login
npm whoami
```

## Pre-flight checklist

```bash
npm run release:check
```

This runs typecheck → lint → tests → production build → `npm pack --dry-run`.

Confirm the packed tarball includes:

- `dist/index.js` + `dist/index.d.ts` + `dist/styles.css`
- `src/tokens/**` (CSS tokens)
- `README.md`, `LICENSE`, `CHANGELOG.md`, `AUTHORS`, `NOTICE`

## Version bump

1. Update `CHANGELOG.md` — move Unreleased notes into a new version section
2. Update `RELEASE_NOTES.md` if you keep narrative release notes
3. Bump `package.json` `version` (SemVer)

```bash
npm version patch   # or minor / major
```

## Publish to npm

```bash
npm publish --access public
```

`prepublishOnly` runs `release:check` automatically.

Verify:

```bash
npm view @poluru-labs/enterprise-design-system-react version
```

## Push to GitHub

```bash
git push origin main --tags
```

## Storybook static site (not `dist/`)

`npm run build` produces the **npm library** in `dist/` (`index.js`, `index.d.ts`, `styles.css`).

To host interactive docs, build Storybook separately:

```bash
npm run build-storybook
```

Output: `storybook-static/`. Serve that folder (Cloudflare Pages, GitHub Pages, Live Server, etc.):

```bash
npx serve storybook-static
# or: python3 -m http.server 6007 --directory storybook-static
```

Do **not** deploy `dist/` as Storybook — it is the published package entry, not the docs UI.

## Author

**[Subrahmanyam Poluru](https://polurus.com)** · [LinkedIn](https://www.linkedin.com/in/polurus/)
