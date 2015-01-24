/**
 * @fileOverview contains the mechanism to have a hardcoded blacklist
 * 
 * - thus when you develop you make sure the library only use the account made for testing
 * - and thus this avoid catastroph to happen :)
 */

//////////////////////////////////////////////////////////////////////////////////
//		Header for plugins
//////////////////////////////////////////////////////////////////////////////////
var Github	= Github	|| require('./github.main.js')

//////////////////////////////////////////////////////////////////////////////////
//                Comments
//////////////////////////////////////////////////////////////////////////////////        

/**
 * user blacklist
 * 
 * @type {String[]}
 */
Github.userBlackList   = []

/**
 * test if the username is in the user blacklist
 * @param {String} userName - the username
 */
Github.prototype.userBlackListContains = function(userName){
        return  Github.userBlackList.indexOf(userName) !== -1 ? true : false
}
