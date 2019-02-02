const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve('src/index.js'),
	output: {
		filename: '[hash].js',
		publicPath: '/'
	},
	resolve: {
		modules: ['./src', path.resolve('node_modules')],
		symlinks: true
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [require.resolve('babel-loader')]
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