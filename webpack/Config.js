import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
	devtool : 'inline-source-map',
	entry : {
		vendor : path.resolve(__dirname,'src/vendor'),
		main   : path.resolve(__dirname,'src/main') 
	},
	target : 'web',
	output : {
		path : path.resolve(__dirname,'dist'),
		filename : '[name].js'
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
}
