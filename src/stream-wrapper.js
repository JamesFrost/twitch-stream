const _messageRateLimit = 20;
const _rateLimitPeriod = 30 * 1000;
const _RateLimiter = require('limiter').RateLimiter;

function streamWrapper( client )
{
	this.client = client;
	this.rateLimiter = new _RateLimiter( _messageRateLimit, _rateLimitPeriod );

	this._addToQueue = function( command )
	{
		this.rateLimiter.removeTokens(1, function(err, remainingRequests) 
		{
			if( err )
				throw err;

			command();
		});
	};

	this.pass = function(pass)
	{
		this._addToQueue(function()
		{
			this.client.pass(pass);

		}.bind( this ));
	};

	this.nick = function(nick)
	{
		this._addToQueue(function()
		{
			this.client.nick(nick);

		}.bind( this ));
	};

	this.user = function(username, realname)
	{
		this._addToQueue(function()
		{
			this.client.user(username, realname);

		}.bind( this ));
	};

	this.invite = function(name, channel)
	{
		this._addToQueue(function()
		{
			this.client.invite(name, channel);

		}.bind( this ));
	};

	this.send = function(target, msg)
	{
		this._addToQueue(function()
		{
			this.client.send(target, msg);

		}.bind( this ));
	};

	this.action = function(target, msg)
	{
		this._addToQueue(function()
		{
			this.client.action(target, msg);

		}.bind( this ));
	};

	this.notice = function(target, msg)
	{
		this._addToQueue(function()
		{
			this.client.notice(target, msg);

		}.bind( this ));
	};

	this.ctcp = function(target, msg)
	{
		this._addToQueue(function()
		{
			this.client.ctcp(target, msg);

		}.bind( this ));
	};

	this.join = function(channel, key)
	{
		this._addToQueue(function()
		{
			this.client.join(channel, key);

		}.bind( this ));
	};

	this.part = function(channel, msg)
	{
		this._addToQueue(function()
		{
			this.client.part(channel, msg);

		}.bind( this ));
	};

	this.names = function(channel, callback)
	{
		this._addToQueue(function()
		{
			this.client.names(channel, callback);

		}.bind( this ));
	};

	this.away = function(message)
	{
		this._addToQueue(function()
		{
			this.client.away(message);

		}.bind( this ));
	};

	this.topic = function(channel, topic)
	{
		this._addToQueue(function()
		{
			this.client.topic(channel, topic);

		}.bind( this ));
	};

	this.kick = function(channels, nicks, msg)
	{
		this._addToQueue(function()
		{
			this.client.kick(channels, nicks, msg);

		}.bind( this ));
	};

	this.oper = function(name, password)
	{
		this._addToQueue(function()
		{
			this.client.oper(name, password);

		}.bind( this ));
	};

	this.mode = function(target, flags, params)
	{
		this._addToQueue(function()
		{
			this.client.mode(target, flags, params);

		}.bind( this ));
	};

	this.quit = function(msg)
	{
		this._addToQueue(function()
		{
			this.client.quit(msg);

		}.bind( this ));
	};

	this.whois = function(target, mask, callback)
	{
		this._addToQueue(function()
		{
			this.client.whois(target, mask, callback);

		}.bind( this ));
	};
};

module.exports = streamWrapper;
