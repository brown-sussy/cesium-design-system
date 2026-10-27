# Contributing

Thanks for taking the time to improve the Cesium Design System. This is a small, deliberately
opinionated codebase — the rules below exist so it stays that way.

## Setup

```bash
npm install
npm run dev      # http://localhost:5178
```

Node 18+ and npm. `npm run dev` regenerates the docs navigation index before starting Vite, so the
first run takes a second longer than the rest.

## How the repository is put together

Five artefacts, all generated from the same sources:

| What | Source | Output |
| --- | --- | --- |
| Tokens | `tokens/tokens.json` | `src/styles/tokens.css`, `dist/tokens.json`, `skill/reference/tokens.md` |
| Library | `src/` | `dist/` (ESM + CJS + `.d.ts` + `cesium-ds.css`) |
| Docs nav | `docs/content/*.tsx` registry | `docs/content/nav.generated.ts` |
| Site | `docs/` | `site/` |
| Skill | `skill/` | — (plain markdown, shipped as-is) |

**Never edit generated files.** `src/styles/tokens.css`, `docs/content/nav.generated.ts` and
everything in `dist/` are outputs; edit the source and re-run the script.

## Changing a token

Edit `tokens/tokens.json`, then:

```bash
npm run tokens
```

Every colour is a `{ "dark": …, "light": … }` pair. If you add one, run `npm run tokens` and commit
the regenerated `tokens.css` alongside the JSON — CI checks that they agree.

## Adding or changing a component

- One file per component in `src/components/`, exported from `src/index.ts`.
- **No runtime dependencies.** React is a peer dependency; nothing else is allowed.
- Style through `--cs-*` variables in `src/styles/components/*.css`. A hardcoded hex value or a
  raw `px` radius in component CSS is a bug — it will not respond to theming or the `plus` shape
  preset.
- Both themes must be legible. Text needs 4.5:1 against its surface, focus rings need 3:1
  (WCAG 2.2 SC 1.4.11). If you touch a palette value, check it rather than eyeballing it.
- Prefer native semantics where they cost nothing (`<button>`, `<input type="checkbox">`), and
  `role` + keyboard handling where the native widget cannot be styled.

Then document it: add an entry to the matching `docs/content/*.tsx` file with a `slug`, a summary,
at least one example, and a prop table. The sidebar, command palette and component index all derive
from that entry — there is no second place to register a component.

## Pull requests

Before opening one:

```bash
npm run typecheck    # library + docs, no emit
npm run build        # tokens → library → site
npm run audit        # crawls all 57 routes for console errors and empty pages
```

`npm run audit` needs a server. It defaults to `http://127.0.0.1:5178` (the dev server); point it
elsewhere with `DOCS_URL=http://127.0.0.1:4173 npm run audit` against `npm run preview`.

Keep commits scoped to one idea. If a change is visual, say what it looked like before and what it
looks like now — a screenshot in the PR description saves a round trip.

## Releasing to npm

The package publishes as `@cesium-ds/core`. `publishConfig.access` is `public` in `package.json` —
a scoped package defaults to private, and without that field the publish fails on a free account.
`prepublishOnly` rebuilds `dist/` before the tarball is packed, so a stale build cannot ship.

```bash
npm login                     # once per machine
npm whoami                    # must print your npm username

npm run typecheck             # never publish a red build
npm publish --dry-run         # 106 files, ~106 kB — read the list before shipping
npm publish                   # prepublishOnly rebuilds dist/ first
```

If the account has 2FA enabled, `npm publish` prompts for a one-time password.

Verify what actually landed, from a clean directory:

```bash
npm view @cesium-ds/core version dist.tarball
npm i @cesium-ds/core && node -e "console.log(Object.keys(require('@cesium-ds/core')).length)"
```

**A published version is permanent.** Unpublishing is only allowed within 72 hours, and the version
number can never be reused — so bump with `npm version patch|minor|major` rather than editing
`version` by hand, and never publish `1.0.0` twice.

After publishing, the four places that name the install command must say `npm i @cesium-ds/core`:
the Install section of `docs/pages/Resources.tsx`, the Home snippet in `docs/pages/Home.tsx`,
`skill/SKILL.md` and `README.md`.

## Reporting a bug

Include the component or route, the theme (`dark` / `light`) and shape preset (`classic` / `plus`)
in use, and what you expected instead. If it is a rendering problem, a screenshot is worth more
than a paragraph.

## License

By contributing you agree that your work is licensed under the [MIT License](LICENSE).
