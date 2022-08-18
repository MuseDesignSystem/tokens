/* eslint-disable sort-keys */

module.exports = {
  source: [`src/style-dictionary-ready.json`],
  platforms: {
    css: {
      transformGroup: `custom/css`,
      buildPath: `dist/`,
      files: [
        {
          destination: `tokens.css`,
          format: `css/variables`,
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
          options: {
            outputReferences: true,
            basePxFontSize: 10,
          },
        },
      ],
    },
  },
};
