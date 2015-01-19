
# server which watch the proper directories - supervisor from https://github.com/isaacs/node-supervisor
server:
	supervisor -w app.js,routes/,view/ ./bin/www

serverProduction:
	./bin/www

.PHONY: build
build:
	cat githubAPI/github.main.js		>  build/githubAPI.js
	cat githubAPI/github.repos.js		>> build/githubAPI.js
	cat githubAPI/github.extras.js		>> build/githubAPI.js
	cat githubAPI/github.request.js		>> build/githubAPI.js
	cat githubAPI/github.contents.js	>> build/githubAPI.js
	cat githubAPI/github.fork.js		>> build/githubAPI.js

