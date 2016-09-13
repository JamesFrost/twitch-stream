const _ircServer = "irc.chat.twitch.tv";
const _ircPort = 6667;
const _irc = require( 'slate-irc' );
const _net = require( 'net' );
const _streamWrapper = require( './src/stream-wrapper.js' );

// key:type
const _requiredParams = 
{
	user : 'string',
	pass : 'string',
};

const _optionalParams =
{
	channel : 'object',
	data : 'function',
	done : 'function'
};

const _verifyOptions = function( options )
{
	for( var index in _requiredParams )
	{
		if( typeof options[ index ] === "undefined" )
			throw "Missing '" + index + "' from options";

		if( typeof options[ index ] !== _requiredParams[ index ] )
			throw "'" + index + "' must be of type '" + _requiredParams[ index ] + "'";
	}

	for( var index in _optionalParams )
	{
		if( typeof options[ index ] !== "undefined" && typeof options[ index ] !== _optionalParams[ index ] )
			throw "'" + index + "' must be of type '" + _optionalParams[ index ] + "'";
	}
};

const _processDataPacket = function( packet )
{
	return {
		user 	: packet.prefix.split( '!' )[ 0 ],
		message : packet.trailing,
		channel : packet.params.slice( 1 )
	};
};

const _logger = function( options ) 
{
	return function( irc )
	{
		irc.on( 'data', function( data )
		{
			if( data.prefix === 'tmi.twitch.tv' || data.prefix === options.user + '.tmi.twitch.tv' || data.trailing.length === 0 )
				return;

			options.data( _processDataPacket( data ) );
		});
	};
};

const _pong = function()
{
	return function( irc )
	{
		irc.on('data', function( msg )
		{
			if ( 'PING' != msg.command ) 
				return;

			irc.write( 'PONG :tmi.twitch.tv' );
		});
	};
};

exports.connect = function( options )
{
	_verifyOptions( options );

	const stream = _net.connect({
		port: _ircPort,
		host: _ircServer
	});

	const client = new _streamWrapper( _irc( stream ) );

	client.pass( options.pass );
	client.nick( options.user );
	client.user( options.user, options.user );

	client.join( options.channel );
	
	client.use( _pong() );

	if( typeof options.data !== "undefined" )
		client.use( _logger( options ) );

	if( typeof options.done !== "undefined" )
		options.done( client );
};
