import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const versionFilePath = path.join(__dirname, "../src/lib/version.ts");
const packageJsonPath = path.join(__dirname, "../package.json");

try {
  let version = "v1.2150";
  if (fs.existsSync(versionFilePath)) {
    const content = fs.readFileSync(versionFilePath, "utf8");
    const match = content.match(/APP_VERSION\s*=\s*["']v?1\.(\d+)["']/);
    if (match && match[1]) {
      const currentBuildNum = parseInt(match[1], 10);
      const nextBuildNum = currentBuildNum + 1;
      version = `v1.${nextBuildNum}`;
    }
  }

  // Write new version to src/lib/version.ts
  const newVersionContent = `export const APP_VERSION = "${version}";\n`;
  fs.writeFileSync(versionFilePath, newVersionContent, "utf8");

  // Also sync with package.json
  if (fs.existsSync(packageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    const semver = version.replace(/^v/, "") + ".0";
    pkg.version = semver;
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
  }

  console.log(`🚀 Automated build version bumped to: ${version}`);
} catch (error) {
  console.error("❌ Failed to bump version:", error);
}
