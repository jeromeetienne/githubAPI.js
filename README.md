githubApi.js
------------

Access github api in javascript from node.js or browser.

Checkout the [githubapi.js api documentation](https://github.com/jeromeetienne/githubAPI.js/blob/master/docs/api.md)
It is automatically generated from jsdoc.

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

But i had to implement my own github api wrapper, because it was a core
part of a project. So i had to really understand it, i could not rely
on a 3rd party library. This is why i reimplemented it.

The other libraries seemed good when i looked. be sure to check them out.

# TODO
* make use of the conditional requests, to handle rate limits
