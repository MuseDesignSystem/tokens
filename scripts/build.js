const paramCase = require(`param-case`).paramCase;

const StyleDictionary = require(`style-dictionary`);

const prefix = `muse`;

console.log(`Build started...`);
console.log(`\n==============================================`);

// REGISTER THE CUSTOM TRANFORMS

const getCssVariableName = (token) => {
  const { category, type } = token.attributes;

  if (token.type === 'color' && category !== 'color') {
    return `${prefix}-${token.type}-${category}-${type}`;
  } else if (category === 'type-styles') {
    return `${prefix}-typography-${type}-${token.name}`;
  } else {
    return `${prefix}-${category}-${type}`;
  }
};

StyleDictionary.registerTransform({
  name: 'shadows',
  type: 'value',
  matcher: function (token) {
    return token.attributes.category === 'elevation';
  },
  transformer: function (token) {
    // destructure shadow values from original token value
    const { x, y, blur, spread, color } = token.value;

    return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  },
});

StyleDictionary.registerTransform({
  name: `name/cti/customProperty`,
  type: `name`,
  transformer: (token) => {
    return `${getCssVariableName(token)}`;
  },
});

StyleDictionary.registerTransform({
  name: `attribute/readableCustomProperty`,
  type: `attribute`,
  transformer: (token) => {
    return {
      customPropertyName: getCssVariableName(token),
    };
  },
});

StyleDictionary.registerTransform({
  name: `name/cti/kebabCustom`,
  type: `name`,
  transformer: (token, options) => {
    return paramCase([options.prefix].concat(token.path).join(` `));
  },
});

StyleDictionary.registerTransform({
  name: `size/rem`,
  type: `value`,
  matcher: (token) => {
    return (
      token.type === `font-size` ||
      token.type === `line-height` ||
      token.type === `space`
    );
  },
  transformer: (token) => {
    return `${token.value}rem`;
  },
});

StyleDictionary.registerTransform({
  name: `size/em`,
  type: `value`,
  matcher: (token) => {
    return token.type === `letter-spacing`;
  },
  transformer: (token) => {
    return `${token.value}em`;
  },
});

// Grabbed from the Style Dictionary transforms, modified to also grab spacing and other rem values we use.
StyleDictionary.registerTransform({
  name: 'custom/pxToRem',
  type: 'value',
  matcher: (token) => {
    return token.attributes?.['unit'] === 'rem';
  },
  transformer: (token) => {
    const baseFont = 10;
    const floatVal = parseFloat(token.value);

    if (floatVal === 0) {
      return '0';
    }

    return `${floatVal / baseFont}rem`;
  },
});

// REGISTER THE CUSTOM TRANFORM GROUPS

// if you want to see what a pre-defined group contains, uncomment the next line:
// console.log(StyleDictionary.transformGroup['group_name']);

const cssTransforms = [
  `color/css`,
  `shadows`,
  'custom/pxToRem',
  // `attributeSizeTransform`,
];

StyleDictionary.registerTransformGroup({
  name: `custom/css`,
  transforms: [
    `attribute/cti`,
    `name/cti/customProperty`,
    `name/cti/kebab`,
    ...cssTransforms,
  ],
});

StyleDictionary.registerTransformGroup({
  name: `custom/es6`,
  transforms: [
    `attribute/cti`,
    `attribute/readableCustomProperty`,
    `name/cti/constant`,
    ...cssTransforms,
  ],
});

StyleDictionary.registerTransformGroup({
  name: `custom/jsModule`,
  transforms: ['custom/pxToRem'],
});

StyleDictionary.registerTransformGroup({
  name: `custom/json`,
  transforms: [`attribute/cti`, `name/cti/customProperty`, ...cssTransforms],
});

StyleDictionary.registerTransformGroup({
  name: `custom/scss`,
  transforms: [`attribute/cti`, `name/cti/customProperty`, ...cssTransforms],
});

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
const StyleDictionaryExtended = StyleDictionary.extend(
  __dirname + `/config.js`,
);

// FINALLY, BUILD ALL THE PLATFORMS
StyleDictionaryExtended.buildAllPlatforms();

console.log(`\n==============================================`);
console.log(`\nBuild completed!`);
