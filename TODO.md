### TODO
* put ```/githubAPI``` in ```/src```
* put the whole express examples in ```examples/express``` and run it there

* how to publish it in npm
  - npm install githubAPI.js
- which name to give the library
  - you need a name in bower
  - you need a name about github and api
  - you need a name in npm
  - githubapi.js it is. it is free in npm/bower/github
  - and it is current name


--
### TODO
* there is a weird hardcoded protection for me
  - how to support it without clogging the library code
  - what about an event to check ?
  - SOLUTION: have a function which validate this name as possible or not
    - it default to accept all
    - github.userblacklist.js
    - github.checkUserBlacklist(username) return true/false insync
  - in studio3, this function will only accept supereditor
* rename ```routers/api``` in ```routers/githubApiRest.js```
* rename ```routers/auth.js``` into ```routers/githubAuth.js```

--
### Examples
* how to load the githubAPI.js from the browser
  * it requires servers for the authentication anyway
* the examples are unclear on how to organize it
