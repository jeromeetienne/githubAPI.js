### TODO
- TODO try the upload of asset 
- then cleanup pass on code
- then write a README.md
  - what are the examples
    - why do you need to look at tehm
  - how to run the exmaple
  - how to get your own keys
  - describe what is in this package
  
- reread the NOTES.md and TODO.md and clean it up
  - remove the file when it is empty

- there is a weird hardcoded protection for me
  - how to support it without clogging the library code
  - what about an event to check ?
  - SOLUTION: have a function which validate this name as possible or not
    - it default to accept all
    - github.userblacklist.js
    - github.checkUserBlacklist(username) return true/false insync
  - in studio3, this function will only accept supereditor
  - it is mainly for me as a protection against me being silly
  
  - the api isnt nice
  - currently i need to 
  - github.checkUserIsValid()
  - current personal need
    - 'supereditor' as whitelist
    - none other is allowed
    - how to make a real thing out of it
    

### Migration back
- it should be rather simple, as it is the same as the examples
  - copy only the github-auth
  - it is in the app.js, just copy from the githubapi.js examples
  - test with a symlink first
- then port it back to studio3 server
  - how to do that.
  - publish githubapi.js as npm package
  - npm install in the server/node_modules
  - include it in apps.js from there

### DONE Examples
* how to load the githubAPI.js from the browser
  * it requires servers for the authentication anyway
* the examples are unclear on how to organize it


### DONE Define needs
* need a demo for auth
* need a demo for node.js usage
  - it is in the 
* need a demo for browser usage

--

### TODO
- DONE then remove the key from the distro
- DONE example-upload-from-browser.html
* DONE put ```/githubAPI``` in ```/src```
* DONE put the whole express examples in ```examples/express``` and run it there
* DONE remove the github authentication key from the express plugin
  * put that in a nother file and add this file in the .gitignore
  * add a .json.sample with only the nice comment
  * add the .json with real key in the .gitignore
* DONE rename ```routers/api``` in ```routers/githubApiRest.js```
* DONE rename ```routers/auth.js``` into ```routers/githubAuth.js```

--



--
### DONE Publication
* how to publish it in npm
  - npm install githubAPI.js
- which name to give the library
  - you need a name in bower
  - you need a name about github and api
  - you need a name in npm
  - githubapi.js it is. it is free in npm/bower/github
  - and it is current name
