const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		app: './index.js',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
	},
	devServer: {
		inline: true,
		port: 3333,
		contentBase: 'dist'
	},
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					'babel-loader'
				]
			},
			{
				test: /\.scss|\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{ loader: 'css-loader', query: { modules: false, sourceMaps: true } },
						{ loader: 'sass-loader', query: { sourceMaps: true } }
					]
				})
			},
			{
				test: /\.(eot|png|jpg|jpeg|gif|woff|woff2|svg|ttf)$/,
				exclude: /node_modules/,
				use: 'url-loader?limit=10000'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("style.css"),
		new Visualizer({
				filename: './statistics.html'
			})
	],
};
