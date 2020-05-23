import path from 'path'
import gitBranch from 'current-git-branch'
import HtmlWebpackPlugin from 'html-webpack-plugin'

console.log( gitBranch() )

export default {
	devtool : gitBranch() == 'master' ? 'source-map' : 'inline-source-map',
	mode:     gitBranch() == 'master' ? 'production' : 'development',
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
			template : './src/index.html',
			inject : true
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
				test: /\.css/, 
				use: { loader: 'css-loader' } 
			}
		]
	}
}
