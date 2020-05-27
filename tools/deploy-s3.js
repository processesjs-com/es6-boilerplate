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
  fs.readdir( pathToDist , ( err , localFiles ) => { if( !err ){ res( localFiles )}else{ rej( err ) }})})
  .then( localFiles => {
    return Promise.all( localFiles.map( localFile => { return new Promise ( ( res , rej ) => {
      const uploadParams = { Bucket , Body: fs.createReadStream( pathToDist + '/' + localFile ) , Key: localFile }
      s3.upload ( uploadParams , ( err , data ) => {
        if( !err ){ console.log('Uploaded ', data.Location ) ; res( localFile ) }else{ rej( err ) }
      })
    })}))
  })
  .then( uploadedFiles => { return new Promise( ( res , rej ) => {
    s3.listObjects( { Bucket } , ( err , bucketFiles ) => {
      if( !err ){ res( bucketFiles.Contents.filter( file => !uploadedFiles.includes( file.Key ) ) )}else{ rej( err ) }
    })
  })})
  .then( filesToDelete => console.log( filesToDelete) )
  .catch( err => console.log( err ) )

// }else{ console.log( 'Deployment must be done only from \'master\' branch.' ) }
/*
.then( items => {
  return Promise.all( items.map( item => { return new Promise( ( res , rej ) => {
    s3.deleteObject( { Bucket , Key: item.Key } , ( err , data ) => {
      if( !err ){ console.log( 'Deleted ', item.Key ) ; res() }else{ rej( err ) }
    })
  })}))
})*/