# See about file upload to the server directly
* thus no server
* all the code is there http://blogs.sitepointstatic.com/examples/tech/filedrag/1/index.html
* file upload ui
    - user drop a file from desktop
    - user click on 'upload' button and it can select file to upload
        + see texture ui for that, it has all the code

# Is a server needed ?
* can i just provide an auth server and let the browser do the rest ?
* to upload directly from the browser is a big plus
    - to upload thru the server is much slower
* isnt that dangerous to have that in client ?



# Process
* make a new server, with html pages to test feature
    - Those will be examples when porting to space3
* make the same functions as current server in a new server
    - /api/forkRepository(sourceRepo)
    - /api/createOrUpdateFile
    - /api/createOrUpdateData
* add some new functions for authentication
    - /auth/login?backUrl=blabla
    - /auth/logout?backUrl=blabla
    - /auth/user
* once it works, port that to the actual server
* port it clean
* make a clean github lib
* put that in its own repo private
* make it as clean as possible, the github is now the storage
* the local disk is dropped for simplicity sake, it may be reimplemented later

## New server
* it needs authentication. what is the process for that
    - Each operation require authentication
    - if a call is made without authentication, it replies with 'not allowed'
    - it is up to the caller to authenticate before
    - what is the process in the browser
* it needs to be able to fork project
* it needs to be able to uploadAsset
* it needs to be able to saveScript

## How to include authentication in space3
* support anonymous user
* when doing an action which require authentication
* check if the user is authenticated
* if not, propose him to be
* and 'to retry ?'... 
* couldnt i retry for him ?


## Difference between saveScript and uploadAsset
* uploadAsset and saveScript seem similar
* they change from a browser point of view tho
* uploadAsset may involve multiple file at the same time
* uploadAsset likely involve large files
* There is a clear efficiency matter


* identify the tech matters, code them
* createOrUpdateFile
* createOrUpdateData

# Use Case of space3

* create project
    - is that real. couldn't i do only fork ?
* fork a project
    - can i fork directly on github
* uploadAssets
    - like models/textures/sounds
* createOrUpdateFile for scripts


# How to merge it with the project
* split a new version of the server
    - v06
* add github authentication to space3 server
* can i support both ?
    - thus i dont have to switch it all at the same time
    - is that needed ?
    - is that a problem to always work on github ?
* new routes will be different from others
    - support them all at the same time in the new router
    - slowly pass the editor client to it


# Minimal server features
* http static
* 
* forkProject(srcRepository, dstRepository)
* createOrUpdateFile(repository, filePath, content)
* deleteFile(repository, filePath)

# ProjectId
* github-repoOwner-repoName
* 
