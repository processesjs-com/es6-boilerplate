import webpack from 'webpack'
import Config from './webpack/Config'

webpack( Config ).run( (err,stats) => {
	if(err){
		console.error( err )
		return 1
	}else{ return 0 }
})
