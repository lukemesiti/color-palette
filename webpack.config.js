module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: __dirname,
        filename: "./dist/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js/,
              loader: "babel-loader",
              exclude: /(node_modules|test)/,
              query: { presets: ["es2015"]}
            }
        ]
    }
};
