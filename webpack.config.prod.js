const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
	context: path.resolve(__dirname, './src'),
	devtool: false,
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
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ExtractTextPlugin("style.css"),
		new Visualizer({
				filename: './statistics.html'
			}),
		new webpack.optimize.UglifyJsPlugin({
		      mangle: true,
		      compress: {
			warnings: false, // Suppress uglification warnings
			pure_getters: true,
			unsafe: true,
			unsafe_comps: true,
			screw_ie8: true,
			conditionals: true,
			unused: true,
			comparisons: true,
			sequences: true,
			dead_code: true,
			evaluate: true,
			if_return: true,
			join_vars: true
		      },
		      output: {
			comments: false,
		      },
		      exclude: [/\.min\.js$/gi] // skip pre-minified libs
		    }),
		new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]), 
	],
};
