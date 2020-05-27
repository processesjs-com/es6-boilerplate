import fs   from 'fs'
import path from 'path'
import AWS  from 'aws-sdk'
import gitBranch from 'current-git-branch'

const pathToDist = path.resolve( __dirname , '../dist' )
const Bucket = 'es6-boilerplate'

AWS.config.update({region: 'eu-central-1'})
const s3 = new AWS.S3()

// if( gitBranch()=='master' ){

  new Promise( ( res , rej ) => {
    fs.readdir( pathToDist , ( err , filesToUpload ) => { if( !err ){ res( filesToUpload )}else{ rej( err ) }})
  })
  .then( filesToUpload => {
    return Promise.all( filesToUpload.map( localFile => { return new Promise ( ( res , rej ) => {
      const uploadParams = { Bucket , Body: fs.createReadStream( pathToDist + '/' + localFile ) , Key: localFile }
      s3.upload ( uploadParams , ( err , uploadedFile ) => {
        if( !err ){ console.log('Uploaded ', uploadedFile.Location ) ; res( uploadedFile.Location ) }else{ rej( err ) }
      })
    })}))
  })
  .then( uploadedFiles => { return new Promise( ( res , rej ) => {
    s3.listObjects( { Bucket } , ( err , bucketFiles ) => {
      if( !err ){ res( bucketFiles.Contents.filter( bucketFile => !uploadedFiles.includes( bucketFile.Key ) ) )}else{ rej( err ) }
    })
  })})
  .then( filesToDelete => {
    return Promise.all( filesToDelete.map( fileToDelete => { return new Promise( ( res , rej ) => {
      s3.deleteObject( { Bucket , Key: fileToDelete.Key } , ( err , data ) => {
        if( !err ){ console.log( 'Deleted ', fileToDelete.Key ) ; res( data ) }else{ rej( err ) }
      })
    })}))
  })
  .then( data => console.log( data ) )
  .catch( err => console.log( err  ) )

// })