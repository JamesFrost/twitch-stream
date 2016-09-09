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
	channel : 'vainglory',
	data : function( msg )
	{
		console.log( msg );
	}
});
```

Passwords for Twitch chat can be generated <a href="http://twitchapps.com/tmi/">here</a>.
