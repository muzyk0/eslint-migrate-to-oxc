# Lint Fixtures

This file is intentionally broken.

It is ignored by the default `npx oxlint .` and `npx eslint .` runs so the repo stays green.

Use it only for targeted checks:

```bash
tmp=$(mktemp ./.oxlint-fixture-XXXXXX.json)
node -e "const fs=require('node:fs'); const c=JSON.parse(fs.readFileSync('.oxlintrc.json','utf8')); c.ignorePatterns=(c.ignorePatterns||[]).filter((p)=>p!=='lint-fixtures/**/*'); fs.writeFileSync(process.argv[1], JSON.stringify(c, null, 2));" "$tmp"
npx oxlint -c "$tmp" lint-fixtures/split-config.tsx
rm -f "$tmp"
npx eslint --no-ignore lint-fixtures/split-config.tsx
```
