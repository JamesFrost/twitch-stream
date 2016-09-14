# twitch-stream :boom:
Stream Twitch chat in node js.

```bash
npm install --save twitch-stream
```

```js
const twitchStream = require( 'twitch-stream' );

twitchStream.connect({
	user : 'username',
	pass : 'oauth:abc123',
	channel : 
	[
		'#user1',
		'#user2'
	],
	data : function( msg )
	{
		console.log( msg );
	},
	done : function( client )
   	{
	        client.part( '#user1' );
	        client.join( '#user3' );
    }
});
```

## Parameters
####```user ``` (required)
Username of Twitch account to use.
#### ```pass``` (required)
Password for the account. Passwords for Twitch chat can be generated <a href="http://twitchapps.com/tmi/">here</a>.
#### ```channel``` (optional)
Array of channels to initialise the stream with. Note that channels have to be prepended with '#'.
#### ```data``` (optional)
Called every time a message is posted in one of the connected channels.

Is passed an object with attributes 'user', 'message' and 'channel'.
#### ```done``` (optional)
Called when a connection has been made. Is passed a <a href="https://github.com/slate/slate-irc">slate-irc</a> client object. The stream can be manipulated through this object e.g. joining channels, leaving channels etc.

The interface this object presents is the same as the <a href="https://github.com/slate/slate-irc/blob/master/docs.md#client">slate-irc client</a>, however all slate-irc client functions that do not have a callback now have an optional callback as the last parameter.

This is because the client object enforces <a href="https://github.com/justintv/Twitch-API/blob/master/IRC.md#command--message-limit">the rate limit</a>; commands sent through the client that are over the rate limit are queued (first in, first out) and executed at a later point in time. When the command is executed, the callback is fired.

## License
MIT
