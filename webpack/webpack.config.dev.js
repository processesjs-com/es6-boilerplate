import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

console.log( 'Path resolve:' + path.resolve( __dirname,'../src/main' ) )

export default {
	devtool : 'source-map',
	entry : { 
		main:   path.resolve( __dirname,'../src/main'),
		vendor: path.resolve( __dirname,'../src/vendor')
	},
	target : 'web',
	output : {
		path : path.resolve( __dirname,'../dist'),
		filename : '[name].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template : '../src/index.html',
			inject : true
		})
	],
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
			{ test: /\.css/, use: [ 'css-loader' , 'style-loader' ] }
		]
	}
}
