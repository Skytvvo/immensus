module.exports = {
  'apps/{client,server}/**/*.{ts,tsx}': [
    'nx affected --target lint --uncommitted --fix true',
    'nx affected --target test --uncommitted',
    'nx affected --target build --uncommitted',
    'nx format:write  --uncommitted',
  ],
};
