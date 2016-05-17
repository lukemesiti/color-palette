# colorPalette.js
A simple JS library to produce various color palettes


## Getting Started

Production ready code can be found in `dist/colorPalette.js`

### 1. Include color palette on your site.

```html
<script src="./dist/colorPalette.js"></script>
```

### 2. Call color palette methods with hex values.

```html
<script>
  colorPalette.getGradientColors('#ffe400');
  colorPalette.getTriadicColors('#ffe400');
  colorPalette.getComplimentaryColors('#ffe400');
  colorPalette.getAnalogousColors('#ffe400');
</script>  
```

## Running the tests

1. Make sure you have npm installed. It's installed with node, which can be found at [node.org](https://nodejs.org/en/).

2. Once you have npm installed navigate to the color palette root directory where the package.json file is located. From the terminal, run the command `npm install` to install the required packages. The Karma config file is included in the root directory.

3. Run the tests by running `gulp test` from the terminal. Alternatively you can run `gulp watch` from the terminal any changes to the `.js` files in `test/spec` or `src/js` will initiate the tests to run.
