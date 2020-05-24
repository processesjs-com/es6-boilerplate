import path   from 'path'
import fs     from 'fs'
import rimraf from 'rimraf'
import gitBranch            from 'current-git-branch'
import HtmlWebpackPlugin    from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

// Set development parameters
let devtool = 'inline-source-map'
let mode    = 'development'
if( gitBranch() == 'master' ){
  devtool = 'source-map'
  mode    = 'production'
}

const distPath = path.resolve( __dirname,'../dist')
const main     = path.resolve( __dirname,'../src/main.js' )
const vendor   = path.resolve( __dirname,'../src/vendor.js' )

// Recreate the dist directory
rimraf.sync(  distPath )
fs.mkdirSync( distPath )

export default {
	devtool,
	mode,
	entry : { main , vendor },
	target : 'web',
	output : { path : distPath, filename : '[name].js' },
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
