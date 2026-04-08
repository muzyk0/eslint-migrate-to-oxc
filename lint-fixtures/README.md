# Lint Fixtures

This file is intentionally broken.

It is ignored by the default `npx oxlint .` and `npx eslint .` runs so the repo stays green.

Use it only for targeted checks:

```bash
npx oxlint -c .oxlintrc-base.json --no-ignore lint-fixtures/split-config.tsx
npx eslint --no-ignore lint-fixtures/split-config.tsx
```
