githubApi.js
------------

Access github api in javascript from node.js or browser.


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


# Motivation
this library is working well in my experience,
They are other wrapper for github api, i dont claim mine is better :)
The other libraries seemed good when i looked. be sure to check them out.

I had to implement my own github api wrapper.
It was a core part of a project. 
So i had to really understand it, i could not rely
on a 3rd party library. This is why i reimplemented it.

# TODO
* make use of the conditional requests, to handle rate limits

# API 

Here is the api documentation. 
It is complete and automatically generated from jsdoc to be sure to stay in sync.
It has been pasted from the [original](https://github.com/jeromeetienne/githubAPI.js/blob/master/docs/api.md).
 
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
