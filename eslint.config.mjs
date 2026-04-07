import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import { rules as prettierConfigRules } from 'eslint-config-prettier';
import oxlint from 'eslint-plugin-oxlint';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import path from 'node:path';
import tseslint from 'typescript-eslint';
import effector from 'eslint-plugin-effector';
import tsParser from '@typescript-eslint/parser';

export const projectRoot = path.resolve('.');
export const gitignorePath = path.resolve(projectRoot, '.gitignore');

const jsConfig = [
  // ESLint Recommended Rules
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  // Stylistic Plugin
  plugins.stylistic,
  // Import X Plugin
  plugins.importX,
  // Airbnb Base Recommended Config
  ...configs.base.recommended,

  // Simple Import Sort
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^(@|components)(/.*|$)'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.?(css)$'],
          ],
        },
      ],
    },
  },

  {
    rules: {
      // import-x
      'import-x/no-cycle': 'warn', // TODO: Включить в будущем

      'import-x/no-duplicates': 'warn',
      'import-x/newline-after-import': 'warn',
      'import-x/no-useless-path-segments': 'warn',
      'import-x/no-named-as-default': 'warn',
      'import-x/first': 'warn',

      'import-x/no-relative-packages': 'off',
      'import-x/no-extraneous-dependencies': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/prefer-default-export': 'off',
      'import-x/extensions': 'off',
      'import-x/order': 'off', // todo: Сортировка импортов

      // @stylistic
      '@stylistic/lines-between-class-members': 'warn',

      '@stylistic/spaced-comment': 'off',

      // js
      'default-case': 'warn',
      'no-nested-ternary': 'warn',
      'prefer-template': 'warn',
      'no-unsafe-optional-chaining': 'warn',
      'default-param-last': 'warn',
      'no-shadow': 'warn',
      eqeqeq: 'warn',
      'no-useless-return': 'warn',
      'no-redeclare': 'warn',
      camelcase: ['warn', { allow: ['^\\$'] }], // todo: For effector $_store
      'dot-notation': 'warn',
      radix: 'warn',
      'no-restricted-globals': 'warn',
      'guard-for-in': 'warn',
      'no-param-reassign': 'warn',
      'no-return-assign': 'warn',
      'no-extra-boolean-cast': 'warn',
      'no-cond-assign': 'warn',
      'no-plusplus': 'warn',
      'no-loop-func': 'warn',
      'no-constructor-return': 'warn',
      'no-use-before-define': 'warn',
      'prefer-const': 'warn',
      'no-self-compare': 'warn',
      'one-var': 'warn',

      'one-var': 'off',
      'consistent-return': 'off',
      'max-classes-per-file': 'off',
      'class-methods-use-this': 'off',
      'new-cap': 'off',
      'no-await-in-loop': 'off',
      'no-restricted-syntax': 'off',
      'no-undef': 'off',
      'no-undef-init': 'off',
      'arrow-body-style': 'off',
      'array-callback-return': 'off',
      'no-promise-executor-return': 'off',
      'prefer-destructuring': 'off',
      'no-useless-computed-key': 'off',
      'object-shorthand': 'off',
      'no-underscore-dangle': 'off',
      'no-multi-assign': 'off',
      'prefer-regex-literals': 'off',
      'no-unneeded-ternary': 'off',
      'no-continue': 'off',
      'no-else-return': 'off',
      'no-void': 'off',
      'no-lonely-if': 'off',
      'no-labels': 'off',
    },
  },
];

const reactConfig = [
  // React Plugin
  plugins.react,
  // React Hooks Plugin
  plugins.reactHooks,
  // React JSX A11y Plugin
  plugins.reactA11y,
  // Airbnb React Recommended Config
  ...configs.react.recommended,

  {
    rules: {
      'react/destructuring-assignment': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react/no-unused-prop-types': 'warn',
      'react/no-unstable-nested-components': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-boolean-value': 'warn',
      'react/no-array-index-key': 'warn',
      'react/no-unused-class-component-methods': 'warn',
      'react/self-closing-comp': 'warn',
      'react/jsx-no-constructed-context-values': 'warn',
      'react/no-children-prop': 'warn',
      'react/no-unknown-property': 'warn',
      'react/jsx-fragments': 'warn',

      'react/button-has-type': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-filename-extension': 'off',

      'react-hooks/rules-of-hooks': 'warn',

      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/label-has-associated-control': 'warn',
      'jsx-a11y/tabindex-no-positive': 'warn',
      'jsx-a11y/no-noninteractive-tabindex': 'warn',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/no-interactive-element-to-noninteractive-role': 'warn',
      'jsx-a11y/no-autofocus': 'warn',

      'jsx-a11y/control-has-associated-label': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interaction': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
    },
  },
];

// console.log('plugins.typescriptEslint', plugins.typescriptEslint);

const typescriptConfig = [
  // TypeScript ESLint Plugin
  // {
  //   ...plugins.typescriptEslint,
  // },
  {
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
      },
    },
  },
  // Airbnb Base TypeScript Config
  // ...configs.base.typescript,
  ...tseslint.configs.recommendedTypeChecked,
  // Airbnb React TypeScript Config
  ...configs.react.typescript,

  {
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
      '@typescript-eslint/no-unsafe-assignment': 'off', // TODO: warn
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

const prettierConfig = [
  // Prettier Plugin
  {
    name: 'prettier/plugin/config',
    plugins: {
      prettier: prettierPlugin,
    },
  },
  // Prettier Config
  {
    name: 'prettier/config',
    rules: {
      ...prettierConfigRules,
      'prettier/prettier': [
        'warn', // todo: return to error
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
];

const effectorConfig = [
  // Prettier Plugin
  {
    name: 'effector',
    plugins: {
      effector: effector,
    },
  },
  // Prettier Config
  {
    name: 'effector',
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
  'webpack.*.js',
];

// Ignore .gitignore files/folder in eslint
const flatConf = includeIgnoreFile(gitignorePath);

/** @type {import('eslint').Linter.Config[]} */
const esLintConfig = [
  {
    ...flatConf,
    ignores: [...ignores, ...(flatConf?.ignores || {})],
  },
  // React Config
  ...reactConfig,
  // TypeScript Config
  ...typescriptConfig,
  // Javascript Config
  ...jsConfig,
  // Prettier Config
  ...prettierConfig,
  ...effectorConfig,
  // high-performance linter
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  ...oxlint.configs['flat/recommended'],
];

export default esLintConfig;
