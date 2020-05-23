const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool : 'inline-source-map',
	entry : [ path.resolve(__dirname,'src/index') ],
	target : 'web',
	output : {
		path : path.resolve(__dirname,'dist'),
		filename : 'main.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template : 'src/index.html',
			inject : true
		})
	],
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
			{ test: /\.css/, use: 'css-loader' }
		]
	}
};
