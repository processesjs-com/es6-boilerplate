import fs   from 'fs'
import path from 'path'
import AWS  from 'aws-sdk'
import gitBranch from 'current-git-branch'

const pathToDist = path.resolve( __dirname , '../dist' )
const Bucket = 'es6-boilerplate'

if( gitBranch()=='master' ){

  AWS.config.update({region: 'eu-central-1'})
  const s3 = new AWS.S3()

  // Clear bucket
  s3.listObjects( { Bucket } , ( err , data ) => {
    if (err) { console.log( "Error listing bucket objects: ", err ) ; return }
    for( const item of data.Contents ){
      s3.deleteObject( { Bucket , Key: item.Key } , ( err , data ) => {
        if ( err ) { console.log( "Delete err: ", err ) ; return }
        else { console.log("Deleted: ", item ) }
      })
    }
  })

  // Copy dist folder to the bucket
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
}else{ console.log( 'Please deploy from master branch only.' ) }
