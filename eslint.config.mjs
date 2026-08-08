import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/generated/**",
  ]),
  {
    files: ["**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "warn",
    },
  },
  {
    files: [
      "src/app/app-domain/**/*.{ts,tsx}",
      "src/components/**/*.{ts,tsx}",
      "src/lib/**/*.{ts,tsx}",
      "prisma/**/*.ts",
      "scripts/**/*.{ts,mjs}",
      "createAdmin.ts",
    ],
    ignores: [
      "src/app/app-domain/financeiro/**",
      "src/lib/financeiro/**",
      "src/lib/poc/**",
      "prisma/seed-poc-*.ts",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "react/no-unescaped-entities": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
      "prefer-const": "warn",
      "@next/next/no-assign-module-variable": "warn",
    },
  },
]);

export default eslintConfig;
