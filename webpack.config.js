const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

/**
 * Webpack configuration
 * Exporting as a function instead of an object allows us to pass in opts. See webpack.prod.js for example passing in the --env.analyze flag.
 */
module.exports = () => {

	const config = {

		entry: ['./js/app.js', './sass/styles.scss'],

		/**
		 * Compile for usage in a browser-like environment
		 */
		target: 'web',

		resolve: {
			/**
			 * Automatically resolve certain extensions
			 */
			extensions: ['.js', '.jsx'],
		},

		/**
		 * Loaders
		 * Reference: https://webpack.js.org/loaders/
		 * This handles most of the magic responsible for converting modules
		 */
		module: {
			rules: [
				{
					/**
					 * Loads ES2015+ code and transpiles to ES5 using Babel
					 * Uses babel configuration options from .babelrc
					 */
					test: /\.jsx?$/,
					exclude: [/node_modules/, /vendor/],
					use: {
						loader: 'babel-loader'
					}
				},
				{
					/**
					 * Loads sass files and compile to css. Extracts into css bundles.
					 */
					test: /\.scss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader',
						},
						{
							loader: 'sass-loader'
						}
					]
				},
				{
					/**
					 * Loads css files. Extracts into css bundles.
					 */
					test: /\.css/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader',
						}
					]
				},
				{
					/**
					 * Loads image files.
					 * The url-loader will transform images into base64 URIs.
					 * If images are very small, it may be more performant to include them straight into the code, causing the browser to make fewer requests.
					 * If the images are big, include them as separate files so that the browser can fetch them in parallel.
					 */
					test: /\.(png|jpg|jpeg|gif)$/i,
					use: [
						{
							loader: 'url-loader',
							options: {

								/**
								 * A Number specifying the maximum size of a file in bytes.
								 * If the file is greater than the limit, file-loader is used by default and all query parameters are passed to it.
								 */
								limit: 8192,

								/**
								 * These options get passed to the fallback loader (file-loader) when the file is too large.
								 */
								name: '[name].[ext]',
								outputPath: 'img/',
							}
						}
					]
				},
				{
					/**
					 * Handles all other files webpack may encounter.
					 * Currently targeting font files (very prominent on admin).
					 * Copies the file into the outputPath specified with same name and extension.
					 */
					test: /\.(woff(2)?|ttf|eot|svg)$/i,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'fonts/'
							}
						}
					]
				},
			]
		},

		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
				}),
				new OptimizeCSSAssetsPlugin({})
			]
		},

		/**
		 * Plugins
		 * Reference: https://webpack.js.org/plugins/
		 */
		plugins: [

			/**
			 * ProvidePlugin
			 * Automatically load modules instead of having to import or require them everywhere.
			 * Useful for when webpack-processed third-party dependencies rely on peer dependencies.
			 */
			new webpack.ProvidePlugin({
				/**
				 * jQuery can be, and is, referenced differently in different packages. This should cover all.
				 * Note that this does not actually bind jquery to the window object (expose-loader does that).
				 */
				jQuery: 'jquery',
				jquery: 'jquery',
				$: 'jquery',
				'window.jquery': 'jquery',
				'window.jQuery': 'jquery',
				'window.$': 'jquery',
			}),

			/**
			 * Extracts CSS into separate files
			 * filename used for sync chunks. chunkFilename used for async chunks.
			 */
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
		],
	};

	return config;
};
