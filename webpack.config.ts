import * as webpack from "webpack";
import path = require("path");
import CopyWebpackPlugin = require("copy-webpack-plugin");
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const r = (file: string) => path.resolve(__dirname, file);

module.exports = {
    entry: r("./src/index.ts"),
    output: {
        path: r("dist"),
        filename: "index.js",
        chunkFilename: "[name]-[fullhash].js",
        libraryTarget: "commonjs2",
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
    externals: {
        "pdfjs-lib": "commonjs2 pdfjs-dist",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
				test: /\.ts|\.js$/,
                exclude: /(node_modules)/,
				loader: "ts-loader",
			},
            {
				test: /\.html$/i,
				loader: "raw-loader",
			},
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: r('src/pdfjs/web/images'), to: 'assets/images' },
				{ from: r('src/pdfjs/web/locale'), to: 'assets/locale' },
				{ from: '*.css', context: "src/pdfjs/web", to: "assets" },
				{ from: require.resolve("pdfjs-dist/build/pdf.worker.js"), to: "assets" },
			]
		})
	],
} as webpack.Configuration;
