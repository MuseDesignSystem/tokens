# Muse Design System Tokens

@musedesignsystem/tokens

# First important steps!

You'll need to create a `.npmrc` file to point to the registry where our package is contained.

That file should contain:

```
@musedesignsystem:registry=https://npm.pkg.github.com
```

This file can live in your user root, or the root of the project.

## Install

```sh
npm install @musedesignsystem/tokens
```

```sh
yarn add @musedesignsystem/tokens
```

## Usage

### CSS

```css
@import '@musedesignsystem/tokens/dist/tokens.css';
```

### SCSS

```css
@import '@musedesignsystem/tokens/dist/tokens.scss';
```

### JS

```css
@import '@musedesignsystem/tokens';
```
