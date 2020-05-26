import fs   from 'fs'
import path from 'path'
import AWS  from 'aws-sdk'
import gitBranch from 'current-git-branch'

const pathToDist = path.resolve( __dirname , '../dist' )
const Bucket = 'es6-boilerplate'

AWS.config.update({region: 'eu-central-1'})
const s3 = new AWS.S3()

new Promise( ( res , rej ) => {
  s3.listObjects( { Bucket } , ( err , data ) => {
    if( !err ){ res( data.Contents )}else{ rej( err ) }
  })
})
.then( items => {
  Promise.all( items.map( item => { new Promise( ( res , rej ) => {
    s3.deleteObject( { Bucket , Key: item.Key } , ( err , data ) => {
      if( !err ){ console.log( 'Deleted ', item.Key ) ; res() }else{ rej( err ) }
    })
  })}))
})
.then( () => { return new Promise( ( res , rej ) => {
  fs.readdir( pathToDist , ( err , files ) => {
    if( !err ){ res( files )}else{ rej( err ) }
  })})
})
.then( files => {
  Promise.all( files.map( file => { new Promise ( ( res , rej ) => {
    const uploadParams = { Bucket , Body: fs.createReadStream( pathToDist + '/' + file ) , Key: file }
    s3.upload ( uploadParams , ( err , data ) => {
      if( !err ){ console.log('Uploaded ', data.Location ) ; res() }else{ rej( err ) }
    })
  })}))
})
.catch( err => console.log( err ) )


/*

s3.listObjects( { Bucket } , ( err , data ) => {
  if (err) { console.log( "Error listing bucket objects: ", err ) ; return }
  for( const item of data.Contents ){
    s3.deleteObject( { Bucket , Key: item.Key } , ( err , data ) => {
      if ( err ) { console.log( "Delete err: ", err ) ; return }
      else { console.log("Deleted: ", item.Key ) }
    })
  }
})

fs.readdir( pathToDist , ( err , files ) => {
    if( err ){ console.log('Unable to scan directory: ' + err) ; return }
    for( const file of files )
    {
      const uploadParams = { Bucket , Body: fs.createReadStream( pathToDist + '/' + file ) , Key: file }
      s3.upload ( uploadParams , ( err , data ) => {
        if ( err )  { console.log( "Upload error: " , err ) ; return }
        if ( data ) { console.log( "Uploaded : " , data.Location) }
      })
    }
})

*/