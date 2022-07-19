/* eslint-disable sort-keys */
const { transform } = require('@divriots/style-dictionary-to-figma');

module.exports = {
  source: [`src/**/*.json`],
  format: {
    figmaTokensPlugin: ({ dictionary }) => {
      const transformedTokens = transform(dictionary.tokens);
      return JSON.stringify(transformedTokens, null, 2);
    },
  },
  platforms: {
    css: {
      transformGroup: `custom/css`,
      buildPath: `dist/web/`,
      files: [
        {
          destination: `tokens.css`,
          format: `css/variables`,
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    es6: {
      transformGroup: `custom/es6`,
      buildPath: `dist/web/`,
      files: [
        {
          destination: `tokens.js`,
          format: `javascript/es6`,
        },
      ],
    },
    json: {
      transformGroup: `custom/json`,
      buildPath: `dist/web/`,
      files: [
        {
          destination: `tokens.json`,
          format: `json`,
        },
      ],
    },
    figma: {
      transformGroup: 'js',
      buildPath: 'dist/web/',
      files: [
        {
          destination: 'figma-tokens.json',
          format: 'figmaTokensPlugin',
        },
      ],
    },
    scss: {
      transformGroup: `custom/scss`,
      buildPath: `dist/web/`,
      files: [
        {
          destination: `tokens.scss`,
          format: `scss/variables`,
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
};
