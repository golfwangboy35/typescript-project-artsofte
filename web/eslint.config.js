const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/prefer-standalone": "error",
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/*", "@/app/*"],
              message: "Use layer aliases or local relative imports inside src/app.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/app/app/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/*", "@/app/*"],
              message: "Use layer aliases or local relative imports inside src/app.",
            },
            {
              group: ["@pages/*", "**/pages/*"],
              message: "App layer should reference pages only from routing configuration.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/app/pages/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/*", "@/app/*"],
              message: "Use layer aliases or local relative imports inside src/app.",
            },
            {
              group: ["@app/*", "**/app/*"],
              message: "Pages must not depend on app-level implementation details.",
            },
            {
              group: ["@pages/*", "**/pages/*"],
              message: "Pages must not depend on other pages.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/app/features/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/*", "@/app/*"],
              message: "Use layer aliases or local relative imports inside src/app.",
            },
            {
              group: ["@app/*", "**/app/*"],
              message: "Features must not depend on app-level implementation details.",
            },
            {
              group: ["@pages/*", "**/pages/*"],
              message: "Features must not depend on pages.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/app/entities/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/*", "@/app/*"],
              message: "Use layer aliases or local relative imports inside src/app.",
            },
            {
              group: ["@app/*", "**/app/*"],
              message: "Entities must not depend on app layer.",
            },
            {
              group: ["@pages/*", "**/pages/*"],
              message: "Entities must not depend on pages.",
            },
            {
              group: ["@features/*", "**/features/*"],
              message: "Entities must not depend on features.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/app/shared/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/*", "@/app/*"],
              message: "Use layer aliases or local relative imports inside src/app.",
            },
            {
              group: ["@app/*", "**/app/*"],
              message: "Shared must not depend on app layer.",
            },
            {
              group: ["@pages/*", "**/pages/*"],
              message: "Shared must not depend on pages.",
            },
            {
              group: ["@features/*", "**/features/*"],
              message: "Shared must not depend on features.",
            },
            {
              group: ["@entities/*", "**/entities/*"],
              message: "Shared must not depend on entities.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
