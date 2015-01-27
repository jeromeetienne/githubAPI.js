githubApi.js
------------

[githubapi.js](https://github.com/jeromeetienne/githubAPI.js) allow to
access [github api](https://developer.github.com/v3/) in javascript.
It can be used from node.js or browser.
The library code is available at [/build/githubAPI.js](https://raw.githubusercontent.com/jeromeetienne/githubAPI.js/master/build/githubAPI.js)
There is a [fully documented API](https://github.com/jeromeetienne/githubAPI.js/blob/master/docs/api.md)
also available at the end of this README.md.

## Install it

To install for node.js, just do

```
npm install githubapi.js
```

To install for browser, just do

```
bower install githubapi.js
```

or just include ```build/githubAPI.js``` in your projects the way you see fit :)


## Show, Don't Tell

Let's see how to use githubapi.js. There are examples for you to look at and see how to use it.
The examples shows usage from the browser and from node.js. You can 
find them in [/examples/express/public](https://github.com/jeromeetienne/githubAPI.js/blob/master/examples/express/public).

- [using github authentication](https://github.com/jeromeetienne/githubAPI.js/blob/master/examples/express/public/example-upload-from-browser.html)
It shows how to login/logout with the github authentication.
A logged in user will give profile information and access_token.
The access_token is given to github to authenticate  the user.
It can be used from the browser or from node.js.
- [use github api thru a rest](https://github.com/jeromeetienne/githubAPI.js/blob/master/examples/express/public/example-githubapi-rest.html)
There is example express routes called
[githubapi-rest-examples](https://github.com/jeromeetienne/githubAPI.js/blob/master/examples/express/public/example-upload-from-browser.html). it provides a example of REST API on top of githubapi.js.
This is a good place to see how to use githubapi.js from node.js.
- [upload from browser](https://github.com/jeromeetienne/githubAPI.js/blob/master/examples/express/public/example-github-auth-standalone.html)
It upload files from the browser directly to gihub.
It is possible to upload from node.ns too, but uploading from the user's browser, save
bandwidth on servers.
It is a good place to see how to use githubapi.js from browser.
- [index.html](https://github.com/jeromeetienne/githubAPI.js/blob/master/examples/public/index.html)
It is just the examples homepage.
once you launch the server, goto
[http://127.0.0.1:8000/](http://127.0.0.1:8000/)
to see it.
- [app.js](https://github.com/jeromeetienne/githubAPI.js/blob/master/examples/express/app.js) is the usual
application for express server. It is a good place to see how to initialize the github authentication 
in your own server.

Now, let's run the server. A server is required because github api requires authentications for many calls.
An authentication server is provided as examples in ```/examples/express```, 
coded with [express](http://expressjs.com/) as you may have guessed. 
It run the authentication server and serve ```/examples/express/public``` as static.

First you need to authenticate yourself on github.
It will give permissions to example application.

### Getting application's keys from github

You need to create register your application on github.
At the moment, it is in user -> setting -> applications -> register new application.
[link](https://github.com/settings/applications)

![screen shot 2015-01-27 at 12 41 55](https://cloud.githubusercontent.com/assets/252962/5917837/f5c35e08-a621-11e4-9ee8-d590fa0d7d5f.png)

Get the clientID and clientSecret you see on top.

Then setup those value into your examples server. First, copy ```examples/expess/app_github_keys.sample.js``` into ```examples/expess/app_github_keys.js```
Then replace the values by your own clientID/clientSecret.
And you are done.

## How to run the example

Once you got the keys setup, launch the server this way and go to 
[http://127.0.0.1:8000/](http://127.0.0.1:8000/) with your browser

```
cd examples/express
make server
```

## Makefile

- ```make build``` - build the library
- ```make minify``` - build the library and minify it
- ```make server``` - launch dev server
- ```make jsdoc``` - generate docs/api.md from [jsdoc](http://usejsdoc.org) in ```/src```

# Motivation
This library is working well in my experience,
They are other wrapper for github api, i dont claim mine is better :)
The other libraries seemed good when i looked. be sure to check them out.

I had to implement my own github api wrapper.
It was a core part of a project. 
So i had to really understand it, i could not rely
on a 3rd party library. This is why i reimplemented it.

# TODO - Possible Improvements
* Use conditional requests for github api calls and thus reduce rate limits
  * see [doc on conditional requests](https://developer.github.com/guides/getting-started/#conditional-requests)
  * see [doc on rate limits](https://developer.github.com/v3/rate_limit/)
* githubapi.js doesn't implement all [github api v3 calls](https://developer.github.com/v3), far from it.
  - But it does implement the call i need now.
  - Maybe implement the whole API later.

## Folders
- ```/build``` - the built source, the one you need as a user of the library
- ```/src``` - the source of the library itself, where you go to develop this api
- ```/examples``` - the examples you can run to learn how to use this library
  - ```/examples/express``` - the express server needed to run the examples
 
# API 

Here is the api documentation. 
It is complete and automatically generated from jsdoc to be sure to stay in sync.
It has been pasted from the [original](https://github.com/jeromeetienne/githubAPI.js/blob/master/docs/api.md).

<!-- Copy/pasted from autogenerated version - dont modify below -->
 
<a name="Github"></a>
#class: Github
**Members**

* [class: Github](#Github)
  * [new Github(accessToken, profile)](#new_Github)
  * [Github.userBlackList](#Github.userBlackList)
  * [Github.Flow()](#Github.Flow)
  * [github.getRepos(onLoad)](#Github#getRepos)
  * [github.createRepo()](#Github#createRepo)
  * [github.deleteRepo()](#Github#deleteRepo)
  * [github.createOrUpdateFile()](#Github#createOrUpdateFile)
  * [github.filesList(repoName, rootPath, onLoad)](#Github#filesList)
  * [github.get(path, onLoad)](#Github#get)
  * [github.post(path, onLoad)](#Github#post)
  * [github.put(path, onLoad)](#Github#put)
  * [github.delete(path, onLoad)](#Github#delete)
  * [github._requestRead(method, path, onLoad)](#Github#_requestRead)
  * [github._requestWrite(method, path, dataToPost, onLoad)](#Github#_requestWrite)
  * [github.getContent(repoName, path, onLoad)](#Github#getContent)
  * [github.getContent(repoName, path, onLoad)](#Github#getContent)
  * [github.getReadme(repoName, onLoad)](#Github#getReadme)
  * [github.createFile(repoName, path, message, content, onLoad)](#Github#createFile)
  * [github.updateFile()](#Github#updateFile)
  * [github.deleteFile()](#Github#deleteFile)
  * [github.createFork()](#Github#createFork)
  * [github.checkUserBlacklist(userName)](#Github#checkUserBlacklist)

<a name="new_Github"></a>
##new Github(accessToken, profile)
Build the tool itself

**Params**

- accessToken `String` - the access token you got from authentication  
- profile `Object` - the profile of your user from github  

<a name="Github.userBlackList"></a>
##Github.userBlackList
user blacklist

**Type**: `Array.<String>`  
<a name="Github.Flow"></a>
##Github.Flow()
Build a flow to handle asynchronous data flow
gowiththeflow.js - https://github.com/jeromeetienne/gowiththeflow.js

<a name="Github#getRepos"></a>
##github.getRepos(onLoad)
get all repositories

**Params**

- onLoad `function` - callback called on load  

<a name="Github#createRepo"></a>
##github.createRepo()
https://developer.github.com/v3/repos/#create

<a name="Github#deleteRepo"></a>
##github.deleteRepo()
https://developer.github.com/v3/repos/#delete-a-repository

- require scope 'delete_repo'

<a name="Github#createOrUpdateFile"></a>
##github.createOrUpdateFile()
https://developer.github.com/v3/repos/contents/#update-a-file

<a name="Github#filesList"></a>
##github.filesList(repoName, rootPath, onLoad)
get a list of all the file at rootPath

**Params**

- repoName `String` - the name of the repository  
- rootPath `String` - the root path where to start, likely '' for the whole thing  
- onLoad `function` - callback called once data are loaded  

<a name="Github#get"></a>
##github.get(path, onLoad)
get data

**Params**

- path `String` - the api path  
- onLoad `function` - callback called when the result is loaded  

<a name="Github#post"></a>
##github.post(path, onLoad)
post data

**Params**

- path `String` - the api path  
- onLoad `function` - callback called when the result is loaded  

<a name="Github#put"></a>
##github.put(path, onLoad)
put data

**Params**

- path `String` - the api path  
- onLoad `function` - callback called when the result is loaded  

<a name="Github#delete"></a>
##github.delete(path, onLoad)
delete data

**Params**

- path `String` - the api path  
- onLoad `function` - callback called when the result is loaded  

<a name="Github#_requestRead"></a>
##github._requestRead(method, path, onLoad)
Perform a READ on github API

**Params**

- method `String` - "POST" "PUT" "DELETE" this kindof thing  
- path `String` - the api path  
- onLoad `function` - callback called when the result is loaded  

<a name="Github#_requestWrite"></a>
##github._requestWrite(method, path, dataToPost, onLoad)
Perform a WRITE on github API

**Params**

- method `String` - "POST" "PUT" "DELETE" this kindof thing  
- path `String` - the api path  
- dataToPost `Object` | `String` - the data to send along  
- onLoad `function` - callback notified when the result is loaded  

<a name="Github#getContent"></a>
##github.getContent(repoName, path, onLoad)
get contents - https://developer.github.com/v3/repos/contents/#get-contents

**Params**

- repoName `String` - the repository name  
- path `String` - the path to the content  
- onLoad `function` - callback called on load  

<a name="Github#getContent"></a>
##github.getContent(repoName, path, onLoad)
get contents - https://developer.github.com/v3/repos/contents/#get-contents

**Params**

- repoName `String` - the repository name  
- path `String` - the path to the content  
- onLoad `function` - callback called on load  

<a name="Github#getReadme"></a>
##github.getReadme(repoName, onLoad)
get README - https://developer.github.com/v3/repos/contents/#get-the-readme

**Params**

- repoName `String` - the repository name  
- onLoad `function` - callback called on load  

<a name="Github#createFile"></a>
##github.createFile(repoName, path, message, content, onLoad)
https://developer.github.com/v3/repos/contents/#create-a-file

**Params**

- repoName `type` - [description]  
- path `type` - [description]  
- message `type` - [description]  
- content `type` - [description]  
- onLoad `type` - [description]  

**Returns**: `type` - [description]  
<a name="Github#updateFile"></a>
##github.updateFile()
https://developer.github.com/v3/repos/contents/#update-a-file

<a name="Github#deleteFile"></a>
##github.deleteFile()
https://developer.github.com/v3/repos/contents/#delete-a-file

<a name="Github#createFork"></a>
##github.createFork()
https://developer.github.com/v3/repos/forks/#create-a-fork

<a name="Github#checkUserBlacklist"></a>
##github.checkUserBlacklist(userName)
test if the username is in the user blacklist

**Params**

- userName `String` - the username  
