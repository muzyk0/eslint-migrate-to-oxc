import { includeIgnoreFile } from '@eslint/compat';
import tsParser from '@typescript-eslint/parser';
import effector from 'eslint-plugin-effector';
import oxlint from 'eslint-plugin-oxlint';
import { existsSync } from 'node:fs';
import path from 'node:path';
import tseslint from 'typescript-eslint';

export const projectRoot = path.resolve('.');
export const gitignorePath = path.resolve(projectRoot, '.gitignore');
export const oxlintConfigPath = path.resolve(projectRoot, '.oxlintrc.json');

const typescriptFiles = ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts', '**/*.d.ts'];

const typescriptConfig = [
  {
    name: 'typescript/parser',
    files: typescriptFiles,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
      },
    },
  },
  // Airbnb Base TypeScript Config
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    name: config.name ? `typescript/${config.name}` : undefined,
    files: typescriptFiles,
  })),

  {
    name: 'typescript/custom-rules',
    files: typescriptFiles,
    rules: {
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/array-type': 'warn',
      '@typescript-eslint/dot-notation': 'warn',
      '@typescript-eslint/consistent-indexed-object-style': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-template-expression': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-unsafe-enum-comparison': 'warn',
      '@typescript-eslint/only-throw-error': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-base-to-string': 'warn',
      '@typescript-eslint/prefer-promise-reject-errors': 'warn',
      '@typescript-eslint/no-redundant-type-constituents': 'warn',
      '@typescript-eslint/restrict-template-expressions': 'warn',
      '@typescript-eslint/no-duplicate-type-constituents': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/no-wrapper-object-types': 'warn',

      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/naming-convention': 'off', // todo: Написать правило
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-unnecessary-type-arguments': 'off',
      '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      '@typescript-eslint/prefer-destructuring': 'off',
      '@typescript-eslint/default-param-last': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-for-in-array': 'off',
      '@typescript-eslint/prefer-function-type': 'off',
      '@typescript-eslint/return-await': 'off',
    },
  },
];

const effectorConfig = [
  // Prettier Plugin
  {
    name: 'effector',
    files: typescriptFiles,
    plugins: {
      effector: effector,
    },
  },
  // Prettier Config
  {
    name: 'effector',
    files: typescriptFiles,
    rules: {
      'effector/enforce-effect-naming-convention': 'off',
      'effector/enforce-store-naming-convention': 'off',
      'effector/keep-options-order': 'warn',
      'effector/no-ambiguity-target': 'warn',
      'effector/no-duplicate-on': 'error',
      'effector/no-forward': 'error',
      'effector/no-getState': 'warn',
      'effector/no-guard': 'error',
      'effector/no-unnecessary-combination': 'warn',
      'effector/no-unnecessary-duplication': 'warn',
      'effector/no-useless-methods': 'error',
      'effector/no-watch': 'warn',
    },
  },
];

const ignores = [
  'dist/*',
  'node_modules/**/*',
  'bin/*',
  'config/*',
  'data/*',
  'docker/*',
  'docs/*',
  'generators/*',
  'lib/*',
  'mapp/*',
  'mtls-proxy/*',
  'resources/*',
  'backend/main/__tests__/*',
  'frontend/public/',
  'frontend/src/assets/',
  'lint-fixtures/**/*',
  'webpack.*.js',
];

// Ignore .gitignore files/folder in eslint when the snapshot includes it.
const flatConf = existsSync(gitignorePath) ? includeIgnoreFile(gitignorePath) : {};
const flatConfIgnores = Array.isArray(flatConf.ignores) ? flatConf.ignores : [];

/** @type {import('eslint').Linter.Config[]} */
const esLintConfig = [
  {
    ...flatConf,
    ignores: [...ignores, ...flatConfIgnores],
  },
  // TypeScript Config
  ...typescriptConfig,
  ...effectorConfig,
  // high-performance linter
  ...oxlint.buildFromOxlintConfigFile(oxlintConfigPath),
];

export default esLintConfig;
