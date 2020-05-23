import webpack from 'webpack'
import Config from './Config'

webpack( Config ).run( (err,stats) => {
	if(err){
		console.error( err )
		return 1
	}else{ 
		console.log( 'Webpack build complete!' )	
		return 0 
	}
})
