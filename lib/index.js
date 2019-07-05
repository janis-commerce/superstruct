'use strict';

const {	superstruct } = require('superstruct');
const types = require('./types');

module.exports = {
	struct: superstruct({ types }),
	superstruct
};
