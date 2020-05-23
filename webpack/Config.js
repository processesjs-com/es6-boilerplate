import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
	debug : true,
	devtool : 'inline-source-map',
	entry : {
		vendor : './src/vendor',
		main :   './src/main' 
	},
	target : 'web',
	output : {
		path : './dist',
		filename : '[name].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template : './src/index.html',
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
