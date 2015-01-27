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
 * @type {RegExp[]}
 */
Github.userBlackListRegExps     = []

/**
 * user blacklist
 * 
 * @type {RegExp[]}
 */
Github.userWhiteListRegExps     = [];


/**
 * test if the user is blacklisted
 * @param {String} userName - the username to test
 */
Github.userIsBlackListed = function(userName){
        // honor white list
        for(var i = 0; i < Github.userWhiteListRegExps.length; i++){
                var regExp      = Github.userWhiteListRegExps[i]
                if( userName.match(regExp) !== null )   return false
        }
        // honor black list
        for(var i = 0; i < Github.userBlackListRegExps.length; i++){
                var regExp      = Github.userBlackListRegExps[i]
                if( userName.match(regExp) !== null )   return true
        }
        // return false
        return false
}
