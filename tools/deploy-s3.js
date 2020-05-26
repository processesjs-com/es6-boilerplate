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
  return Promise.all( items.map( item => { return new Promise( ( res , rej ) => {
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
  return Promise.all( files.map( file => { return new Promise ( ( res , rej ) => {
    const uploadParams = { Bucket , Body: fs.createReadStream( pathToDist + '/' + file ) , Key: file }
    s3.upload ( uploadParams , ( err , data ) => {
      if( !err ){ console.log('Uploaded ', data.Location ) ; res() }else{ rej( err ) }
    })
  })}))
})
.catch( err => console.log( err ) )
