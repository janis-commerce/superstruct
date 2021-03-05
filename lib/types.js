'use strict';

const UUIDv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const emailRegex = /^[A-z0-9+_-]+(?:\.[A-z0-9+_-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?$/i;

const isoYearRegex = '(-?(?:[1-9][0-9]*)?[0-9]{4})';
const isoMonthRegex = '(1[0-2]|0[1-9])';
const isDayRegex = '(3[01]|0[1-9]|[12][0-9])';
const isoHourRegex = '(2[0-3]|[01][0-9])';
const isoMinutesRegex = '([0-5][0-9])';
const isoSecondsRegex = '([0-5][0-9])(\\.[0-9]+)';
const isoTimeZoneRegex = '(Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])';

const isoDateRegex = new RegExp(`^${isoYearRegex}-${isoMonthRegex}-${isDayRegex}T\
${isoHourRegex}:${isoMinutesRegex}:${isoSecondsRegex}?${isoTimeZoneRegex}$`);

const urlRegex = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i; //eslint-disable-line

const camelCaseRegex = /^([a-z\u00f1áéíóúü]+)([0-9A-Z\u00d1ÁÉÍÓÚÜ]*?)([0-9]+|[A-Z\u00d1ÁÉÍÓÚÜ][a-z\u00f1áéíóúü]*)*$/;

const isString = value => typeof value === 'string';

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
const URL = value => urlRegex.test(value);

/**
 * @function empty
 * @description Check if value is empty
 * @param {string|array} value
 */
const empty = value => {
	if(Array.isArray(value))
		return !value.length;

	if(isString(value))
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
	if(typeof value !== 'string' || !camelCaseRegex.test(value))
		return 'Must be camelcase.';

	return true;
};

/**
 * @function numeric
 * @description Check if value is numeric
 * @param {number|string} value
 */
const numeric = value => !Number.isNaN(parseFloat(value)) && Number.isFinite(Number(value)) && !/^0+[1-9]/.test(value);

/**
 * @function md5
 * @description Check if the string is md5 hash
 * @param {string} value
 */
const md5 = value => /^[a-f0-9]{32}$/.test(value);

/**
 * @function isJSON
 * @description Check if the string is a json
 * @param {string} value
 */
const isJSON = value => {

	if(!isString(value))
		return 'Must be string';

	try {
		const obj = JSON.parse(value);
		return !!obj && typeof obj === 'object';
	} catch(e) {
		return false;
	}
};

const ISODate = value => {

	if(!isoDateRegex.test(value))
		return 'Invalid date format';

	return true;
};

/**
 * @function integer
 * @description Validate if a number or string is a integer number
 * @param {string|number} value
 */
const integer = value => {
	const val = parseFloat(value);

	if(Number.isNaN(val))
		return 'Must be a number';

	return Number.isInteger(val);
};

/**
 * @function positive
 * @description Validate if a number or string is a positive number
 * @param {string|number} value
 * @param {boolean} orZero [orZero=false] - If zero is a positive value
 */
const positive = (value, orZero = false) => {
	const val = parseFloat(value);

	if(Number.isNaN(val))
		return 'Must be a number';

	if(orZero)
		return val >= 0;

	return val > 0;
};

/**
 * @function objectId24
 * @description Validate if a string is a ObjectId with 24 characters
 * @param {string} value
 */
const objectId = value => (isString(value) && /^[0-9a-fA-F]{24}$/.test(value));

/**
 * @function UUID
 * @description Validate if a string is a UUID V4
 * @param {string} value
 */
const UUID = value => (isString(value) && UUIDv4Regex.test(value));

/**
 * @function hexColor
 * @description Validate if a string is a Hexadecimal Color
 * @param {string} value
 */
const hexColor = value => isString(value) && /^#[0-9A-F]{6}$/i.test(value);

module.exports = {
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
	ISODate,
	integer,
	positive,
	positiveOrZero: v => positive(v, true),
	objectId,
	UUID,
	hexColor
};
