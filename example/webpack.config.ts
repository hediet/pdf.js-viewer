import * as webpack from "webpack";
import path = require("path");
import HtmlWebpackPlugin = require("html-webpack-plugin");
import CopyWebpackPlugin = require("copy-webpack-plugin");

const r = (file: string) => path.resolve(__dirname, file);

module.exports = {
	entry: { main: r("src/index.ts"), viewer: r("src/viewer.ts") },
	output: { path: r("dist"), },
	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
	},
	devtool: "source-map",
	module: {
		rules: [
			{ test: /\.css$/, use:["style-loader", "css-loader"] },
			{ test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
			{ test: /\.(jpe?g|png|gif|eot|ttf|svg|woff|woff2|md)$/i, loader: "file-loader", },
			{ test: /\.tsx?$/, loader: "ts-loader", options: { transpileOnly: true }, },
			{ test: /\.(png|gif|cur|jpg)$/, loader: 'url-loader', }
		],
	},
	plugins: [
		new CopyWebpackPlugin({ patterns: [{ from: r('../dist/assets') },] }),
		new HtmlWebpackPlugin({ chunks: ["main"], }),
		new HtmlWebpackPlugin({ chunks: ["viewer"], filename: "viewer.html", }),
	],
} as webpack.Configuration;
