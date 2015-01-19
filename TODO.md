### TODO
* put ```/githubAPI``` in ```/src```
* put the whole express examples in ```examples/express``` and run it there
* how to publish it in npm - which name is still available

* there is a weird hardcoded protection for me
  - how to support it without clogging the library code
  - what about an event to check ?
  - SOLUTION: have a function which validate this name as possible or not
    - it default to accept all
    - github.userblacklist.js
    - github.checkUserBlacklist(username) return true/false insync
  - in studio3, this function will only accept supereditor

--

* how to load the githubAPI.js from the browser
* 
