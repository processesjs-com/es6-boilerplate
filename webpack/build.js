import webpack   from 'webpack'
import devConfig from './webpack.config.dev'

webpack( devConfig , (err,stats) => {
	if(err){
		console.error( err )
		return 1
	}

	const info = stats.toJson()

	if( stats.hasErrors()   ) console.error( info.errors )
	if( stats.hasWarnings() ) console.warn ( info.warnings )
	console.log( info )
})
