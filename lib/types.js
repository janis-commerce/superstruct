
'use strict';

const parser = require('cron-parser');

const emailRegex = /^[A-z0-9+_-]+(?:\.[A-z0-9+_-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?$/i;
/**
 * @function email
 * @description check if a string is a valid email
 * @param {string} value - string to check
 * @returns {boolean}
 */
const email = value => emailRegex.test(value);


/**
 * @function URL
 * @description Check if a string is a valid URL
 * @param {string} value - string to check
 * @returns {boolean}
 */
const URL = value => (
    /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value) //eslint-disable-line
);


/**
 * @function empty
 * @description Check if value is empty
 * @param {string|array} value
 */
const empty = value => {
	if(Array.isArray(value))
		return !value.length;

	if(typeof value === 'string')
		return !value.trim();

	return !value;
};


/**
 * @function lowercase
 * @description Check if the string is lowercase
 * @param {string} value
 */
const lowercase = value => value === value.toLowerCase();


/**
 * @function uppercase
 * @description Check if the string is uppercase
 * @param {string} value
 */
const uppercase = value => value === value.toUpperCase();


/**
 * @function camelcase
 * @description Check if the string is camelcase
 * @param {string} value
 */
const camelcase = value => {
	if(typeof value !== 'string' || !/^[a-z]{1}[a-zA-Z0-9]*$/.test(value))
		return 'Must be camelcase.';
	return true;
};


/**
 * @function numeric
 * @description Check if value is numeric
 * @param {number|string} value
 */
const numeric = value => !Number.isNaN(parseFloat(value)) && Number.isFinite(Number(value));


/**
 * @function md5
 * @description Check if the string is md5 hash
 * @param {string} value
 */
const md5 = value => /^[a-f0-9]{32}$/.test(value);

/**
 * @function isJSON
 * @description Check if the string is md5 hash
 * @param {string} value
 */
const isJSON = value => {
	if(typeof value !== 'string')
		return 'Must be string';

	try {
		const obj = JSON.parse(value);
		return !!obj && typeof obj === 'object';
	} catch(e) {
		return false;
	}
};

const cron = value => {
	try {
		parser.parseExpression(value);
		return true;
	} catch(e) {
		return false;
	}
};


const types = {
	email,
	URL,
	empty,
	'!empty': v => !empty(v),
	uppercase,
	lowercase,
	camelcase,
	md5,
	numeric,
	JSON: isJSON,
	cron
};

module.exports = types;
