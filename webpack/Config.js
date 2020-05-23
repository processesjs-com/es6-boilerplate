import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
	debug : true,
	noInfo : false,
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
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
			{test: /\.css/, loaders: ['style','css']}
		]
	}
}
