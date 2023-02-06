module.exports = {
  'apps/{client,server}/**/*.{js,ts,jsx,tsx}': [
    'nx affected --target lint --uncommitted --fix true',
    'nx affected --target test --uncommitted',
    'nx affected --target storybook-build --uncommitted',
    'nx affected --target build --uncommitted',
    'nx format:write  --uncommitted',
  ],
};
