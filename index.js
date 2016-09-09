const _ircServer = "irc.chat.twitch.tv";
const _ircPort = 6667;
const _irc = require('slate-irc');
const _net = require('net');

// key:type
const _requiredOptions = 
{
	user : 'string',
	pass : 'string',
	channel : 'string',
	data : 'function'
};

const _verifyOptions = function( options )
{
	for( var index in _requiredOptions )
	{
		if( typeof options[ index ] === "undefined" )
			throw "Missing '" + index + "' from options";

		if( typeof options[ index ] !== _requiredOptions[ index ] )
			throw "'" + index + "' must be of type '" + _requiredOptions[ index ] + "'";
	}
};

const _processDataPacket = function( packet )
{
	return {
		message : packet.trailing,
		user : packet.prefix.split( '!' )[ 0 ]
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

	var stream = _net.connect({
		port: _ircPort,
		host: _ircServer
	});

	var client = _irc( stream );

	client.pass( options.pass );
	client.nick( options.user );
	client.user( options.user, options.user );

	client.join( '#' + options.channel );

	client.use( _logger( options ) );
	client.use( _pong() );
};
