"use strict";
const DEBUG_MODE = 3;

const 
	LOG_LEVEL_VERBOSE = 5, 
	LOG_LEVEL_DEBUG   = 4,
	LOG_LEVEL_INFO    = 3,
	LOG_LEVEL_WARNING = 2,
	LOG_LEVEL_ERROR   = 1,
	LOG_LEVEL_FATAL   = 0,
	LOG_LEVEL_NONE    = -1,
	LOG_LEVEL_DEFAULT = 0,
	LOG_LEVEL_MAX     = 0,
	LOG_LEVEL_MIN     = 10;

const colors = {
    Black : '\x1B[30m', 
    Red : '\x1B[31m', 
    Green : '\x1B[32m', 
    Yellow : '\x1B[33m', 
    Blue : '\x1B[34m', 
    Magenta : '\x1B[35m', 
    Cyan : '\x1B[36m', 
    White : '\x1B[37m', 
    bBlack : '\x1B[30;1m', 
    bRed : '\x1B[31;1m', 
    bGreen : '\x1B[32;1m', 
    bYellow : '\x1B[33;1m', 
    bBlue : '\x1B[34;1m', 
    bMagenta : '\x1B[35;1m', 
    bCyan : '\x1B[36;1m', 
    bWhite : '\x1B[37;1m', 
    reset : '\x1B[0m'
};

// unicode: \u001b
// Reset: \u001b[0m
// hex: \x1B
// Reset: \x1B[0m

// if(!process.env.NODE_LOGGER_DEBUG_MODE && level <= process.env.NODE_LOGGER_DEBUG_THRESHOLD) return;

/**
 * 
 * @param {Integer} level - 1 || 2 || 3 - log level
 * @param {...String} content  - log text content.
 * @returns 
 */
function debugLog(level, ...messages) {

    let color = level == 1 ? colors.bBlue : level == 2 ? colors.bYellow : level == 3 ? colors.bRed : colors.bMagenta;

    if (level > DEBUG_MODE) return;

    process.stdout.write( color + new Date().toISOString() + ' : ' );

    if ( messages == null ) {
        process.stdout.write( '\n\n' + colors.reset );
        return;
    }

    for(let i = 0; i <= messages.length; ++i) {

        switch (typeof arguments[i]) {
            case 'undefined' : {
                process.stdout.write( 'undefined' );
                break;
            }
            case 'object' : {
                process.stdout.write( 'Object >> \n\t' + JSON.stringify( arguments[i] ) );
                break;
            }
            case 'function' : {
                process.stdout.write( arguments[i].name );
                break;
            }
            case 'number' || 'bigint' || 'symbol' || 'boolean' : {
                process.stdout.write( String( arguments[i] ) );
                break;
            }
            case 'string' : {
                process.stdout.write( arguments[i] );
                break;
            }
            default : {
                process.stdout.write('\nDebugLog Failed to Print: ');
            }
        }

        // if(i + 1 === arguments.length) {
            
        // }
    }
    process.stdout.write( '\n\n' + colors.reset );
}

if( DEBUG_MODE === -1 ) debugLog = () => {};

export { debugLog as logg };