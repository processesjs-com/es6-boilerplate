import path   from 'path'
import fs     from 'fs'
import rimraf from 'rimraf'
import gitBranchName        from 'git-branch-name'
import HtmlWebpackPlugin    from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

let devtool = 'source-map'
let mode    = 'production'
if( gitBranchName != 'master' ){
  devtool = 'inline-source-map'
  mode    = 'development'
}

const distPath = path.resolve( __dirname,'../dist')
console.log( 'Dist path:' + distPath )
rimraf.sync(  distPath )
fs.mkdirSync( distPath )

export default {
	devtool,
	mode,
	entry : {
		main:   path.resolve( __dirname,'../src/main.js'),
		vendor: path.resolve( __dirname,'../src/vendor.js')
	},
	target : 'web',
	output : {
		path : distPath,
		filename : '[name].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
      title : 'Front end boilerplate',
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
