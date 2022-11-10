/* eslint-disable sort-keys */

const figmaFilter = (token) => token.attributes.category !== 'figma';

module.exports = {
  source: [`src/style-dictionary-ready.json`],
  platforms: {
    css: {
      transformGroup: `custom/css`,
      buildPath: `dist/`,
      prefix: 'muse',
      files: [
        {
          destination: `tokens.css`,
          format: `css/variables`,
          filter: figmaFilter,
          options: {
            outputReferences: true,
            basePxFontSize: 10,
          },
        },
      ],
    },
    es6: {
      transformGroup: `custom/es6`,
      buildPath: `dist/`,
      files: [
        {
          destination: `tokens-es6.js`,
          filter: figmaFilter,
          format: `javascript/es6`,
        },
      ],
    },
    jsModule: {
      transformGroup: `custom/jsModule`,
      buildPath: `dist/`,
      files: [
        {
          destination: `tokens.js`,
          filter: figmaFilter,
          format: `javascript/module`,
        },
      ],
    },
    json: {
      transformGroup: `custom/json`,
      buildPath: `dist/`,
      files: [
        {
          destination: `tokens.json`,
          filter: figmaFilter,
          format: `json`,
        },
      ],
    },
    scss: {
      transformGroup: `custom/scss`,
      buildPath: `dist/`,
      files: [
        {
          destination: `tokens.scss`,
          format: `scss/variables`,
          filter: figmaFilter,
          options: {
            outputReferences: true,
            basePxFontSize: 10,
          },
        },
      ],
    },
  },
};
