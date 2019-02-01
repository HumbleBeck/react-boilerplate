const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: '[hash].js',
		publicPath: '/'
	},
	resolve: {
		modules: ['./src', './node_modules']
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)$/,
				loaders: ['file-loader']
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loaders: ['file-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	]
};