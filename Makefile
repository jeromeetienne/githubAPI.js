
# server which watch the proper directories - supervisor from https://github.com/isaacs/node-supervisor
server:
	supervisor -w ./examples/express/app.js,./examples/express/routes/,./examples/express/view/ ./examples/express/bin/www

serverProduction:
	./examples/express/bin/www
	
watch: build
	# fswatch is available at https://github.com/emcrisostomo/fswatch
	fswatch -o src/ | xargs -n1 -I{} make build

.PHONY: build
build:
	cat src/github.main.js		>  build/githubAPI.js
	cat src/github.repos.js		>> build/githubAPI.js
	cat src/github.extras.js	>> build/githubAPI.js
	cat src/github.request.js	>> build/githubAPI.js
	cat src/github.contents.js	>> build/githubAPI.js
	cat src/github.fork.js		>> build/githubAPI.js
	cat src/github.userblacklist.js	>> build/githubAPI.js

minify: build
	uglifyjs build/githubAPI.js -o build/githubAPI.min.js
	@echo size minified + gzip is `gzip -c build/githubAPI.min.js | wc -c` byte

jsdoc:	build
	# jsdoc2md automatically generate markdown documentation from jsdoc2md
	# see https://github.com/75lb/jsdoc-to-markdown
	jsdoc2md build/githubAPI.js > docs/api.md
