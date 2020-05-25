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
