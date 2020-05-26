/*
    This script shall be used on the Bulid Server to pull from GitHub.
    If there are changes in package.json, the script runs 'npm prune && npm install' to update the dependencies.
    To ignore the local (on the Build Server) changes in package.json, the script runs 'git stash && git stash clear'.

    Note: 'node_modules' and 'dist' folders; and package-lock.json are in .gitignore list
*/

import shell from 'shelljs'

shell.exec('git status' , ( code , stdout , stderr ) => {
  if( code == 0 ){
    if( stdout.includes('package.json') ){ if( shell.exec('git stash && git stash clear ').code != 0) { return 1 } }
    shell.exec('git pull' , ( code , stdout , stderr ) => {
      if( code == 0 ){
        if( stdout.includes('package.json') ){ return shell.exec('npm prune && npm install && git stash && git stash clear ').code }
        return 0
      }
      return 1
    })
  }
  return 1
})
