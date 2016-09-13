const _messageRateLimit = 20;
const _rateLimitPeriod = 30 * 1000;
const _RateLimiter = require( 'limiter' ).RateLimiter;

function streamWrapper( client )
{
	this.client = client;
	this.rateLimiter = new _RateLimiter( _messageRateLimit, _rateLimitPeriod );

	this._addToQueue = function( command, callback )
	{
		this.rateLimiter.removeTokens(1, function( err, remainingRequests ) 
		{
			if( err )
				throw err;

			command();

			if( typeof callback !== "undefined" && callback !== undefined )
				callback();
		});
	};

	this.pass = function( pass, callback )
	{
		this._addToQueue(function()
		{
			this.client.pass( pass );

		}.bind( this ), callback);
	};

	this.nick = function( nick, callback )
	{
		this._addToQueue(function()
		{
			this.client.nick( nick );

		}.bind( this ), callback);
	};

	this.user = function( username, realname, callback )
	{
		this._addToQueue(function()
		{
			this.client.user( username, realname );

		}.bind( this ), callback);
	};

	this.invite = function( name, channel, callback )
	{
		this._addToQueue(function()
		{
			this.client.invite( name, channel );

		}.bind( this ), callback);
	};

	this.send = function( target, msg, callback )
	{
		this._addToQueue(function()
		{
			this.client.send( target, msg );

		}.bind( this ), callback);
	};

	this.action = function( target, msg, callback )
	{
		this._addToQueue(function()
		{
			this.client.action( target, msg );

		}.bind( this ), callback);
	};

	this.notice = function( target, msg, callback )
	{
		this._addToQueue(function()
		{
			this.client.notice( target, msg );

		}.bind( this ), callback);
	};

	this.ctcp = function( target, msg, callback )
	{
		this._addToQueue(function()
		{
			this.client.ctcp( target, msg );

		}.bind( this ), callback);
	};

	this.join = function( channel, key, callback )
	{
		this._addToQueue(function()
		{
			this.client.join( channel, key );

		}.bind( this ), callback);
	};

	this.part = function( channel, msg, callback )
	{
		this._addToQueue(function()
		{
			this.client.part( channel, msg );

		}.bind( this ), callback);
	};

	this.names = function( channel, callback )
	{
		this._addToQueue(function()
		{
			this.client.names( channel, callback );

		}.bind( this ));
	};

	this.away = function( message, callback )
	{
		this._addToQueue(function()
		{
			this.client.away( message );

		}.bind( this ), callback);
	};

	this.topic = function( channel, topic, callback )
	{
		this._addToQueue(function()
		{
			this.client.topic( channel, topic );

		}.bind( this ), callback);
	};

	this.kick = function( channels, nicks, msg, callback )
	{
		this._addToQueue(function()
		{
			this.client.kick( channels, nicks, msg );

		}.bind( this ), callback);
	};

	this.oper = function( name, password, callback )
	{
		this._addToQueue(function()
		{
			this.client.oper( name, password );

		}.bind( this ), callback);
	};

	this.mode = function( target, flags, params, callback )
	{
		this._addToQueue(function()
		{
			this.client.mode( target, flags, params );

		}.bind( this ), callback);
	};

	this.quit = function( msg, callback )
	{
		this._addToQueue(function()
		{
			this.client.quit( msg );

		}.bind( this ), callback);
	};

	this.whois = function( target, mask, callback )
	{
		this._addToQueue(function()
		{
			this.client.whois( target, mask, callback );

		}.bind( this ));
	};

	this.use = function( plugin )
	{
		this.client.use( plugin );
	};
};

module.exports = streamWrapper;
