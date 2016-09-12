# twitch-stream
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
Array of channels to initialise the stream with. 
#### ```data``` (optional)
Called every time a message is posted in one of the connected channels.

Is passed an object with attributes 'user', 'message' and 'channel'.
#### ```done``` (optional)
Called when a connection has been made. Is passed a <a href="https://github.com/slate/slate-irc">slate-irc</a> client object. The stream can be manipulated through this object e.g. joining channels, leaving channels etc.

## License
MIT
