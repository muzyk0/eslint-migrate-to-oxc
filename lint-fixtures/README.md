# Lint Fixtures

These files are intentionally broken.

They are ignored by the default `npx oxlint .` and `npx eslint .` runs so the repo stays green.

Use them only for targeted checks:

```bash
npx oxlint -c .oxlintrc-base.json --no-ignore lint-fixtures/oxlint-supported.ts
npx eslint --no-ignore lint-fixtures/eslint-effector.ts
npx eslint --no-ignore lint-fixtures/eslint-unsupported.js
npx eslint --no-ignore lint-fixtures/eslint-prettier.ts
```
