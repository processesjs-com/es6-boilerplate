import fs   from 'fs'
import path from 'path'
import AWS  from 'aws-sdk'

const Bucket = 'es6-boilerplate'

AWS.config.update({region: 'eu-central-1'})
const s3 = new AWS.S3()

// Clear bucket
s3.listObjects( { Bucket } , ( err , data ) => {
  if (err) { console.log( "Error listing bucket objects: ", err ) ; return 1 }
  for( const item of data.Contents ){
    s3.deleteObject( { Bucket , Key: item.Key } , ( err , data ) => {
      if ( err ) { console.log( "Delete err: ", err ) ; return 1 }
      else { console.log("Deleted: ", item ) }
    })
  }
})

// Copy dist folder to the bucket
fs.readdir( path.resolve( __dirname , '../dist' ) , ( err , files ) => {
    if( err ){ console.log('Unable to scan directory: ' + err) ; return 1 }
    for( const file of files )
    {
      const uploadParams = { Bucket , Body:fs.createReadStream( file ) , Key:path.basename( file ) }
      s3.upload ( uploadParams , ( err , data ) => {
        if ( err )  { console.log( "Upload error: " , err ) ; return 1 }
        if ( data ) { console.log( "Upload Success: " , data.Location) }
      })
    }
})
