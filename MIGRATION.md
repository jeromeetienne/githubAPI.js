# how to include that in threex.gameeditor server
* should i put this project in its own repo
    - call that jeromeetienne/github-api
    - this allows access to github api from browser and node.js
    - later maybe a passportjs-nodatabase from it too
    - it is very reusable
* there is the authentication in the server
    - make the server load the route
    - handle that directly in the app.js
    - link directly to the temp directory
* in the editor, do a sidebar.user
    - it will contains all the new operation for now
    - thus i dont destroy the rest
    - it provides login/logout
    - username + avatar when logged in
    - link to the github repository
    - provide 'save project'
    - provide 'fork project'
    - provide 'upload' zone with dropzone
    - provide a fake 'online file edit'
