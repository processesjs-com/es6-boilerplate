import webpack   from 'webpack'
import devConfig from './webpack.config.dev'

webpack( devConfig ).run( (err,stats) => {
	if(err){
		console.error( err )
		return 1
	}else{ return 0 }
})
