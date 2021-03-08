# Customizable PDF.js Viewer

[![](https://img.shields.io/twitter/follow/hediet_dev.svg?style=social)](https://twitter.com/intent/follow?screen_name=hediet_dev)

This package makes the PDF.js viewer usable in third party applications.
The viewer can be easily customized. Works best with webpack.

**Please don't report issues of the PDF.js viewer on the PDF.js repository!**

## Usage (Webpack)

I recommend to host the viewer in its own `iframe`, otherwise style and id conflicts might occur.

First, install the npm package:
```sh
yarn add @hediet/pdfjs-viewer
```

Then, setup the viewer entry (`viewer.ts`):
```ts
import "@hediet/pdfjs-viewer/dist/assets/viewer.css";
import { loadViewer } from "@hediet/pdfjs-viewer";
loadViewer({ pdfUrl: "/sample.pdf" });
```

This webpack config is recommended:
```ts
import * as webpack from "webpack";
import path = require("path");
import HtmlWebpackPlugin = require("html-webpack-plugin");
import CopyWebpackPlugin = require("copy-webpack-plugin");

const r = (file: string) => path.resolve(__dirname, file);

module.exports = {
    output: { path: r("dist"), },

    // Add your own entry point and the viewer entry point
	entry: { main: r("src/index.ts"), viewer: r("src/viewer.ts") },

    plugins: [
        new CopyWebpackPlugin({ patterns: [{ from: r('../dist/assets') },] }),
        // Setup an `index.html`
		new HtmlWebpackPlugin({ chunks: ["main"], }),
        // And a `viewer.html` that uses the viewer entry point.
		new HtmlWebpackPlugin({ chunks: ["viewer"], filename: "viewer.html", }),
	],
	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
	},
	devtool: "source-map",
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: "ts-loader", options: { transpileOnly: true }, },
			{ test: /\.css$/, use:["style-loader", "css-loader"] },
			{ test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
			{ test: /\.(jpe?g|png|gif|eot|ttf|svg|woff|woff2|md)$/i, loader: "file-loader", },
			{ test: /\.(png|gif|cur|jpg)$/, loader: 'url-loader', }
		],
	},
} as webpack.Configuration;
```

## Customization

You can inject your own CSS styles.
You can also patch the classes of the PDF viewer - they are exposed by this package.