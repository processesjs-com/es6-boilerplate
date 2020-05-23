import path from 'path'
import WriteFilePlugin from 'write-file-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
	devtool : 'inline-source-map',
	entry : [ path.resolve(__dirname,'src/main') ],
	target : 'web',
	output : {
		path : path.resolve(__dirname,'dist'),
		filename : 'main.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template : 'src/index.html',
			inject : true
		}),
		new WriteFilePlugin()
	],
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
			{ test: /\.css/, use: 'css-loader' }
		]
	}
}
