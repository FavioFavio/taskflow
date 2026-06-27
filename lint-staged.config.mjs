import path from "node:path";

const frontendRoot = path.join(process.cwd(), "frontend");

const quote = (file) => `"${file.replaceAll('"', '\\"')}"`;

const toFrontendFiles = (files) =>
  files
    .map((file) => path.relative(frontendRoot, file))
    .filter((file) => !file.startsWith("..") && !path.isAbsolute(file));

export default {
  "frontend/**/*.{js,jsx,ts,tsx}": (files) => {
    const frontendFiles = toFrontendFiles(files);

    if (frontendFiles.length === 0) {
      return [];
    }

    return `npm --workspace frontend exec eslint -- --fix ${frontendFiles
      .map(quote)
      .join(" ")}`;
  },
  "*.{js,jsx,ts,tsx,mjs,cjs,json,css,md,mdx,yml,yaml}": "prettier --write",
};
