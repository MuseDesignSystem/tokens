const paramCase = require(`param-case`).paramCase;

const StyleDictionary = require(`style-dictionary`);

const prefix = `muse`;

console.log(`Build started...`);
console.log(`\n==============================================`);

// REGISTER THE CUSTOM TRANFORMS

const getCssVariableName = (prop) => {
  const { category, type, item } = prop.attributes;

  if (category === `color` || category === `shadow-size`) {
    return `${prefix}-${category}-${type}-${item}`;
  } else {
    return `${prefix}-${category}-${type}`;
  }
};

StyleDictionary.registerTransform({
  name: `name/cti/customProperty`,
  type: `name`,
  transformer: (prop) => {
    return `${getCssVariableName(prop)}`;
  },
});

StyleDictionary.registerTransform({
  name: `attribute/readableCustomProperty`,
  type: `attribute`,
  transformer: (prop) => {
    return {
      customPropertyName: getCssVariableName(prop),
    };
  },
});

StyleDictionary.registerTransform({
  name: `name/cti/kebabCustom`,
  type: `name`,
  transformer: (prop, options) => {
    return paramCase([options.prefix].concat(prop.path).join(` `));
  },
});

StyleDictionary.registerTransform({
  name: `size/rem`,
  type: `value`,
  matcher: (prop) => {
    return (
      prop.attributes.category === `border-radius` ||
      prop.attributes.category === `font-size` ||
      prop.attributes.category === `shadow-size` ||
      prop.attributes.category === `space`
    );
  },
  transformer: (prop) => {
    return `${prop.value}rem`;
  },
});

StyleDictionary.registerTransform({
  name: `size/em`,
  type: `value`,
  matcher: (prop) => {
    return prop.attributes.category === `letter-spacing`;
  },
  transformer: (prop) => {
    return `${prop.value}em`;
  },
});

StyleDictionary.registerTransform({
  name: `time/seconds`,
  type: `value`,
  matcher: (prop) => {
    return (
      prop.attributes.category === `animation-delay` ||
      prop.attributes.category === `animation-duration` ||
      prop.attributes.category === `transition-duration`
    );
  },
  transformer: (prop) => {
    return (parseInt(prop.original.value) / 1000).toString() + `s`;
  },
});

// REGISTER THE CUSTOM TRANFORM GROUPS

// if you want to see what a pre-defined group contains, uncomment the next line:
// console.log(StyleDictionary.transformGroup['group_name']);

const cssTransforms = [`time/seconds`, `size/rem`, `size/em`, `color/css`];

StyleDictionary.registerTransformGroup({
  name: `custom/css`,
  transforms: [`attribute/cti`, `name/cti/customProperty`, ...cssTransforms],
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
