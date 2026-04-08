# Repository Guidelines

## Project Structure & Module Organization

This repository is a root-level configuration workspace for migrating from ESLint to Oxc tooling. The checked-in files are mostly config artifacts:

- `package.json` declares the workspace and shared dev dependencies.
- `eslint.config.mjs` is the main flat ESLint config.
- `.oxlintrc.json` defines Oxlint rules and shared ignores.
- `.prettierrc`, `.prettierignore`, and `.oxfmtrc.json` control formatting.

`package.json` declares `frontend` and `backend` workspaces, but those directories are not present in this snapshot. If they are added later, keep package-specific overrides inside each workspace and preserve shared rules at the repo root.

## Build, Test, and Development Commands

There are no npm scripts here, so run tools directly from the root:

- `npm install` installs the shared linting and formatting toolchain.
- `npx eslint .` runs the flat ESLint config in `eslint.config.mjs`.
- `npx oxlint .` validates the mirrored Oxlint configuration.
- `npx prettier --check .` checks formatting against `.prettierrc`.
- `npx prettier --write .` rewrites formatting when needed.

Use both ESLint and Oxlint after rule changes; this repo exists to keep those configs aligned.

## Coding Style & Naming Conventions

Use 2-space indentation, `singleQuote: true`, `printWidth: 90`, and `trailingComma: es5`. Keep config files ASCII unless an existing file already uses another character set. Follow the current naming patterns: ESM config in `eslint.config.mjs`, dotfile JSON configs in lowercase, and camelCase named exports such as `projectRoot`.

When editing rules, prefer small targeted changes. Do not relax ESLint and Oxlint behavior independently unless the difference is intentional and documented in the PR.

## Testing Guidelines

No standalone test suite is checked in. Treat lint and format runs as the required validation baseline. For config changes, run `npx eslint .`, `npx oxlint .`, and `npx prettier --check .` before opening a PR.

## Commit & Pull Request Guidelines

Git history is not available in this workspace snapshot, so follow a simple imperative style: `eslint: align import sorting` or `oxlint: sync ignore patterns`. Keep commits scoped to one logical config change.

PRs should explain why the rule or ignore list changed, list the commands you ran, and note any intentional ESLint/Oxlint differences. Include linked issues when relevant.
