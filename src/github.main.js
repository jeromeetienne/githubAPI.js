/**
 * Build the tool itself
 *
 * @class
 * 
 * @param {String} accessToken - the access token you got from authentication
 * @param {Object} profile     - the profile of your user from github
 */
var Github	= function(accessToken, profile){
	this.accessToken	= accessToken
	this.profile		= profile

	console.assert(this.profile.username === 'supereditor', 'username'+this.profile.username)
}

/**
 * Export it in node.js
 * 
 * @type {Github}
 */
if( typeof(window) === 'undefined' )	module.exports	= Github;

//////////////////////////////////////////////////////////////////////////////////
//		gowiththeflow.js
//////////////////////////////////////////////////////////////////////////////////

/**
 * Build a flow to handle asynchronous data flow
 * gowiththeflow.js - https://github.com/jeromeetienne/gowiththeflow.js
 */
Github.Flow	= function(){
	var self, stack = [], timerId = setTimeout(function(){ timerId = null; self._next(); }, 0);
	return self = {
		destroy : function(){ timerId && clearTimeout(timerId); },
		par	: function(callback, isSeq){
			if(isSeq || !(stack[stack.length-1] instanceof Array)) stack.push([]);
			stack[stack.length-1].push(callback);
			return self;
		},seq	: function(callback){ return self.par(callback, true);	},
		_next	: function(err, result){
			var errors = [], results = [], callbacks = stack.shift() || [], nbReturn = callbacks.length, isSeq = nbReturn == 1;
			for(var i = 0; i < callbacks.length; i++){
				(function(fct, index){
					fct(function(error, result){
						errors[index]	= error;
						results[index]	= result;		
						if(--nbReturn == 0)	self._next(isSeq?errors[0]:errors, isSeq?results[0]:results)
					}, err, result)
				})(callbacks[i], i);
			}
		}
	}
};
