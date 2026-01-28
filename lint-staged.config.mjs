/** @type {import('lint-staged').Configuration} */
const lintStagedConfig = {
  "*.{css,md,json,yml}": ["prettier --write"],
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
};

export default lintStagedConfig;
