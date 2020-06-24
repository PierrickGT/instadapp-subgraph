import { ethereum } from '@graphprotocol/graph-ts';

/**
 * Should be called to create a unique ID
 * @method createEventID
 * @param {ethereum.Event} event Event from log function in mapping file
 * @returns {String} Unique ID
 */
export function createEventID(event: ethereum.Event): string {
    return event.block.number
        .toString()
        .concat('-')
        .concat(event.logIndex.toString());
}

/**
 * Should be called to pad string to expected length
 * @method leftPad
 * @param {String} string to be padded
 * @param {Number} chars that result string should have
 * @returns {String} right aligned string
 */
export function leftPad(string: string, chars: number): string {
    string = string.slice(2);

    let padding = chars - string.length >= 0 ? chars - string.length : 0;

    return '0x' + '0'.repeat(<i32>padding) + string;
}
