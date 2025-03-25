'use strict';

const assert = require('assert');
const crypto = require('crypto');
const { struct } = require('../lib');

describe('Superstruct', () => {

	describe('email', () => {

		const Schema = struct({ email: 'email' });

		it('Should not throw for valid emails', () => {

			Schema({ email: 'pepe@example.com' });
			Schema({ email: 'pepe+1@example.com' });
			Schema({ email: 'mock.test@mock.com.foo' });
			Schema({ email: 'mock_yes@mock.com' });
			Schema({ email: 'mock-test@mock.com' });
			Schema({ email: 'mock09_9.2@mock.com' });
		});

		it('Should throw for invalid emails', () => {

			assert.throws(() => Schema({ email: '' }), Error);
			assert.throws(() => Schema({ email: '@yes.com' }), Error);
			assert.throws(() => Schema({ email: 'email.com' }), Error);
			assert.throws(() => Schema({ email: null }), Error);
			assert.throws(() => Schema({ email: false }), Error);
			assert.throws(() => Schema({ email: 0 }), Error);
			assert.throws(() => Schema({ email: {} }), Error);
			assert.throws(() => Schema({ email: [] }), Error);
		});
	});

	describe('URL', () => {

		const Schema = struct({ url: 'URL' });

		it('Should not throw for valid URL', () => {

			Schema({ url: 'http://example.com' });
			Schema({ url: 'https://example.com' });
			Schema({ url: 'http://www.example.com' });
			Schema({ url: 'http://www.example.com.ar' });
			Schema({ url: 'https://www.example.com.ar' });
			Schema({ url: 'https://www.example.com.ar/url with spaces' });
		});

		it('Should throw for non URL', () => {

			assert.throws(() => Schema({ url: 'exmaple' }), Error);
			assert.throws(() => Schema({ url: 'http://example' }), Error);
			assert.throws(() => Schema({ url: '.com' }), Error);
			assert.throws(() => Schema({ url: '.example.com' }), Error);
			assert.throws(() => Schema({ url: 'example.com' }), Error);
			assert.throws(() => Schema({ url: 'www.example.com' }), Error);
		});
	});

	describe('empty', () => {

		const Schema = struct({ yes: 'empty' });

		it('Should not throw for empty values', () => {
			const values = ['', ' ', null, undefined, false, 0];

			for(const val of values)
				Schema({ yes: val });
		});

		it('Should throw for non empty values', () => {
			assert.throws(() => Schema({ yes: ['yes'] }), Error);
			assert.throws(() => Schema({ yes: {} }), Error);
			assert.throws(() => Schema({ yes: true }), Error);
			assert.throws(() => Schema({ yes: 1 }), Error);
		});
	});

	describe('!empty', () => {

		const Schema = struct({ yes: '!empty' });

		it('Should not throw for non empty values', () => {

			const values = ['s', ['yes'], {}, true, 1];

			for(const val of values)
				Schema({ yes: val });
		});

		it('Should throw for empty values', () => {

			assert.throws(() => Schema({ yes: '' }), Error);
			assert.throws(() => Schema({ yes: ' ' }), Error);
			assert.throws(() => Schema({ yes: [] }), Error);
			assert.throws(() => Schema({ yes: undefined }), Error);
			assert.throws(() => Schema({ yes: null }), Error);
			assert.throws(() => Schema({ yes: false }), Error);
			assert.throws(() => Schema({ yes: 0 }), Error);
		});
	});

	describe('lowercase', () => {

		const Schema = struct({ string: 'lowercase' });

		it('Should not throw for lowercased strings', () => {

			const values = ['asda', 'asdá', 'ñato', 'a', 'z', '__a', '1', '--test', ''];

			for(const val of values)
				Schema({ string: val });
		});

		it('Should throw for non lowercased strings', () => {

			assert.throws(() => Schema({ string: 'A' }), Error);
			assert.throws(() => Schema({ string: 'Z' }), Error);
			assert.throws(() => Schema({ string: 'AeA' }), Error);
			assert.throws(() => Schema({ string: 'eAA' }), Error);
		});
	});

	describe('uppercase', () => {

		const Schema = struct({ string: 'uppercase' });

		it('Should not throw for uppercase strings', () => {

			const values = ['AA', 'ZZ', 'A', 'Á', 'Ñ', 'Z', '', '--TEST', '12'];

			for(const val of values)
				Schema({ string: val });
		});

		it('Should throw for non lowercased strings', () => {

			assert.throws(() => Schema({ string: 'a' }), Error);
			assert.throws(() => Schema({ string: 'z' }), Error);
			assert.throws(() => Schema({ string: 'AeA' }), Error);
			assert.throws(() => Schema({ string: 'eAA' }), Error);
		});
	});

	describe('camelCase', () => {

		const Schema = struct({ string: 'camelcase' });

		it('Should not throw for camelcase strings', () => {

			const values = ['c', 'caMel', 'caMelCase', 'aAAAs0', 'aAA', 'bAño', 'agustín'];

			for(const val of values)
				Schema({ string: val });
		});

		it('Should throw for non camelCase strings', () => {
			assert.throws(() => Schema({ string: 'AAA' }), Error);
			assert.throws(() => Schema({ string: '14AAA' }), Error);
			assert.throws(() => Schema({ string: 'Ñato' }), Error);
			assert.throws(() => Schema({ string: 'Ívan' }), Error);
			assert.throws(() => Schema({ string: 'zzzz asdasd' }), Error);
			assert.throws(() => Schema({ string: 'aaa-bbb' }), Error);
			assert.throws(() => Schema({ string: 'aaaa_bbb' }), Error);
		});
	});

	describe('md5', () => {

		const md5 = string => (
			crypto
				.createHash('md5')
				.update(string)
				.digest('hex')
		);

		const Schema = struct({ md5: 'md5' });

		it('Should not throw for md5 strings', () => {
			Schema({ md5: md5('yes') });
		});

		it('Should throw for non md5 values', () => {
			assert.throws(() => Schema({ md5: 'asd123asdas123123' }), Error);
			assert.throws(() => Schema({ md5: '3,5' }), Error);
			assert.throws(() => Schema({ md5: '' }), Error);
			assert.throws(() => Schema({ md5: '23a' }), Error);
			assert.throws(() => Schema({ md5: 'asds' }), Error);
			assert.throws(() => Schema({ md5: '123asds' }), Error);
			assert.throws(() => Schema({ md5: null }), Error);
			assert.throws(() => Schema({ md5: undefined }), Error);
		});
	});

	describe('numeric', () => {

		const Schema = struct({ numeric: 'numeric' });

		it('Should not throw for numeric values', () => {

			const values = ['1', 2, 2.5, '2.5', '0.5', 0.5, '-5', '0', -2];

			for(const val of values)
				Schema({ numeric: val });
		});

		it('Should throw for non numeric values', () => {
			assert.throws(() => Schema({ numeric: 'a' }), Error);
			assert.throws(() => Schema({ numeric: '013' }), Error);
			assert.throws(() => Schema({ numeric: '3,5' }), Error);
			assert.throws(() => Schema({ numeric: '' }), Error);
			assert.throws(() => Schema({ numeric: '23a' }), Error);
			assert.throws(() => Schema({ numeric: 'asds' }), Error);
			assert.throws(() => Schema({ numeric: '123asds' }), Error);
		});
	});

	describe('JSON', () => {

		const Schema = struct({ json: 'JSON' });

		it('Should not throw for valid JSON', () => {
			Schema({ json: JSON.stringify({ foo: 'bar' }) });
			Schema({ json: JSON.stringify({ foo: ['bar'], bar: 0 }) });
		});

		it('Should throw for non JSON', () => {
			assert.throws(() => Schema({ json: 'exmaple' }), Error);
			assert.throws(() => Schema({ json: '{invalid:"json"}' }), Error);
			assert.throws(() => Schema({ json: { invalid: 'json' } }), Error);
			assert.throws(() => Schema({ json: '{\'invalid\':0}' }), Error);
		});
	});

	describe('ISODate', () => {

		const Schema = struct({ ISODate: 'ISODate' });

		it('Should not throw for valid ISODate', () => {
			Schema({ ISODate: '2020-02-19T23:23:59Z' });
			Schema({ ISODate: '2020-02-19T23:23:59+03:00' });
			Schema({ ISODate: '2020-02-19T23:23:59-03:00' });
			Schema({ ISODate: '2020-02-19T18:11:00.000Z' });
			Schema({ ISODate: '2020-02-19T23:23:59.666Z' });
			Schema({ ISODate: '2020-02-29T23:23:59.6668883Z' });
		});

		it('Should throw for non ISODate', () => {
			assert.throws(() => Schema({ ISODate: '2020-02-29T23:23:59' }), Error);
			assert.throws(() => Schema({ ISODate: '2020-02-19T23:23:59.666' }), Error);
			assert.throws(() => Schema({ ISODate: '2020' }), Error);
			assert.throws(() => Schema({ ISODate: '2020-02' }), Error);
			assert.throws(() => Schema({ ISODate: '2020-02-19' }), Error);
			assert.throws(() => Schema({ ISODate: 'exmaple' }), Error);
			assert.throws(() => Schema({ ISODate: 'asda123' }), Error);
			assert.throws(() => Schema({ ISODate: '20201-02-14' }), Error);
			assert.throws(() => Schema({ ISODate: null }), Error);
			assert.throws(() => Schema({ ISODate: undefined }), Error);
			assert.throws(() => Schema({ ISODate: [] }), Error);
			assert.throws(() => Schema({ ISODate: 1 }), Error);
			assert.throws(() => Schema({ ISODate: {} }), Error);
		});
	});

	describe('integer', () => {

		const Schema = struct({ integer: 'integer' });

		it('Should not throw for valid integer', () => {
			Schema({ integer: -100 });
			Schema({ integer: 0 });
			Schema({ integer: 1 });
			Schema({ integer: 10 });
			Schema({ integer: 10 });
			Schema({ integer: 1000 });
			Schema({ integer: 9808798 });
			Schema({ integer: '0' });
			Schema({ integer: '50' });
		});

		it('Should throw for non integer', () => {
			assert.throws(() => Schema({ integer: -5.5 }), Error);
			assert.throws(() => Schema({ integer: 1.5 }), Error);
			assert.throws(() => Schema({ integer: '0.5' }), Error);
			assert.throws(() => Schema({ integer: 'string' }), Error);
			assert.throws(() => Schema({ integer: null }), Error);
			assert.throws(() => Schema({ integer: undefined }), Error);
			assert.throws(() => Schema({ integer: [] }), Error);
			assert.throws(() => Schema({ integer: {} }), Error);
		});
	});

	describe('positive', () => {

		const Schema = struct({ positive: 'positive' });

		it('Should not throw for valid positive', () => {
			Schema({ positive: 0.5 });
			Schema({ positive: 1 });
			Schema({ positive: 1.5 });
			Schema({ positive: 10 });
			Schema({ positive: 1000 });
			Schema({ positive: 9808798 });
			Schema({ positive: '0.5' });
			Schema({ positive: '10' });
		});

		it('Should throw for non positive', () => {
			assert.throws(() => Schema({ positive: 0 }), Error);
			assert.throws(() => Schema({ positive: -1 }), Error);
			assert.throws(() => Schema({ positive: 'string' }), Error);
			assert.throws(() => Schema({ positive: null }), Error);
			assert.throws(() => Schema({ positive: undefined }), Error);
			assert.throws(() => Schema({ positive: [] }), Error);
			assert.throws(() => Schema({ positive: {} }), Error);
		});
	});

	describe('positiveOrZero', () => {

		const Schema = struct({ positiveOrZero: 'positiveOrZero' });

		it('Should not throw for valid positive', () => {
			Schema({ positiveOrZero: 0 });
			Schema({ positiveOrZero: 0.5 });
			Schema({ positiveOrZero: 1 });
			Schema({ positiveOrZero: 1.5 });
			Schema({ positiveOrZero: 10 });
			Schema({ positiveOrZero: 1000 });
			Schema({ positiveOrZero: 9808798 });
			Schema({ positiveOrZero: '0' });
			Schema({ positiveOrZero: '0.5' });
			Schema({ positiveOrZero: '10' });
		});

		it('Should throw for non positiveOrZero', () => {
			assert.throws(() => Schema({ positiveOrZero: -1 }), Error);
			assert.throws(() => Schema({ positiveOrZero: -5.5 }), Error);
			assert.throws(() => Schema({ positiveOrZero: 'string' }), Error);
			assert.throws(() => Schema({ positiveOrZero: null }), Error);
			assert.throws(() => Schema({ positiveOrZero: undefined }), Error);
			assert.throws(() => Schema({ positiveOrZero: [] }), Error);
			assert.throws(() => Schema({ positiveOrZero: {} }), Error);
		});
	});

	describe('ObjectID', () => {
		const Schema = struct({ objectId: 'objectId' });

		it('Should not throw when it is a valid ObjectId', () => {
			Schema({ objectId: '5d4d8f743a3cd7a03d9e6428' });
		});

		it('Should throw when it is not a string', () => {
			assert.throws(() => Schema({ objectId: 123445665475764590823907 }), Error);
			assert.throws(() => Schema({ objectId: true }), Error);
			assert.throws(() => Schema({ objectId: {} }), Error);
			assert.throws(() => Schema({ objectId: ['5d4d8f743a3cd7a03d9e6428'] }), Error);
		});

		it('Should throw when it is not an hex ID', () => {
			// Uppercase object ids note allowed
			assert.throws(() => Schema({ objectId: '5D4D8F743A3CD7A03D9E6428' }), Error);
			assert.throws(() => Schema({ objectId: '1Bcd3F4bCDefA8cdE7aBcdeG' }), Error);
			assert.throws(() => Schema({ objectId: '5d4d8f743a3cd7a03d9e642' }), Error);
			assert.throws(() => Schema({ objectId: '5d4d8f743a3cd7a03d9e64288' }), Error);
		});
	});

	describe('UUID', () => {
		const Schema = struct({ UUID: 'UUID' });

		it('Should not throw when it is a valid v4 UUID', () => {
			// v4 examples
			Schema({ UUID: 'a42ad1cd-84d1-4229-bfd6-6e9837c00549' });
			Schema({ UUID: 'd9d110ce-8b55-4576-91e9-5eac187e8136' });
			Schema({ UUID: crypto.randomUUID() });
		});

		it('Should throw for non v4 UUID', () => {
			// v1 example
			assert.throws(() => Schema({ UUID: '1bbf4d30-6498-11ea-bbf5-2db771e23e81' }), Error);
			// v5 example
			assert.throws(() => Schema({ UUID: '3bbcee75-cecc-5b56-8031-b6641c1ed1f1' }), Error);
			// v3 example
			assert.throws(() => Schema({ UUID: 'c6235813-3ba4-3801-ae84-e0a6ebb7d138' }), Error);
			assert.throws(() => Schema({ UUID: 1 }), Error);
			assert.throws(() => Schema({ UUID: 'string' }), Error);
			assert.throws(() => Schema({ UUID: null }), Error);
			assert.throws(() => Schema({ UUID: undefined }), Error);
			assert.throws(() => Schema({ UUID: [] }), Error);
			assert.throws(() => Schema({ UUID: {} }), Error);
		});
	});

	describe('hexColor', () => {
		const Schema = struct({ hexColor: 'hexColor' });

		it('Should not throw when it is a valid Hexadecimal Color', () => {
			Schema({ hexColor: '#123456' });
			Schema({ hexColor: '#FFFFFF' });
		});

		it('Should throw for non Hexadecimal Color', () => {
			assert.throws(() => Schema({ hexColor: 'A nice color' }), Error);
			assert.throws(() => Schema({ hexColor: '#123' }), Error);
			assert.throws(() => Schema({ hexColor: '255, 0, 0' }), Error);
			assert.throws(() => Schema({ hexColor: 1 }), Error);
			assert.throws(() => Schema({ hexColor: null }), Error);
			assert.throws(() => Schema({ hexColor: undefined }), Error);
			assert.throws(() => Schema({ hexColor: [] }), Error);
			assert.throws(() => Schema({ hexColor: {} }), Error);
		});
	});

});
