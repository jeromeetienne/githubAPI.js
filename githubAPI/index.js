/**
 * @fileOverview Github is a easy way to talk to github api in node.js.
 * It assumes the authentication is done on your side.
 * It works well with passport.js.
 *
 * 
 * This file almost deserves its own library
 * - it is verymuch like node-github
 * - but i need it for something really important
 * - i needed to be sure i understood how it works for real
 * - so i had to reimplement it, and could not rely on 3rd party
 */

var Github	= require('./github.main.js')
module.exports	= Github;

//////////////////////////////////////////////////////////////////////////////////
//		Load all plugins
//////////////////////////////////////////////////////////////////////////////////

require('./github.repos.js')
require('./github.extras.js')
require('./github.request.js')
require('./github.contents.js')
require('./github.fork.js')

