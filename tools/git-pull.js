import shell from 'shelljs'

shell.exec( 'git pull' , ( code , stdout , stderr ) => {
  if( code == 0 ){
    if( stdout.includes('package.json') ){
      return shell.exec(' npm prune && npm install && git stash && git stash clear ')
    }else{ return 0 }
  }
  return 1
})
