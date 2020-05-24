import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default {
	devtool : 'source-map',
	mode:     'production',
	entry : {
		main:   path.resolve( __dirname,'../src/main.js'),
		vendor: path.resolve( __dirname,'../src/vendor.js')
	},
	target : 'web',
	output : {
		path : path.resolve( __dirname,'../dist'),
		filename : '[name].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
      title : 'Front end boilerplate'
			template : './src/index.html',
			inject : true
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css'
		 })
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: { loader: 'babel-loader' }
			},
			{
				test: /\.css$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader' }
				]
			}
		]
	}
}
