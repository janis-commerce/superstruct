'use strict';

const assert = require('assert');
const crypto = require('crypto');
const { struct } = require('../lib');

describe('Superstruct', () => {
	describe('email', () => {
		const Schema = struct({ email: 'email' });

		it('Should not throw for valid emails', () => {

			Schema({ email: 'pepe@fizzmod.com' });
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

			const values = ['asda', 'a', 'z', '__a', '1', '--test', ''];

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

			const values = ['AA', 'ZZ', 'A', 'Z', '', '--TEST', '12'];

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

			const values = ['c', 'caMel', 'caMelCase', 'aAAAs0', 'aAA'];

			for(const val of values)
				Schema({ string: val });

		});

		// it('Should throw for non lowercased strings', () => {
		// 	assert.throws(() => Schema({ string: 'a' }), 'Must be camelcase');
		// 	assert.throws(() => Schema({ string: 'z' }), 'Must be camelcase');
		// 	assert.throws(() => Schema({ string: 'AeA' }), 'Must be camelcase');
		// 	assert.throws(() => Schema({ string: 'eAA' }), 'Must be camelcase');
		// });
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

			const values = ['1', 2, 2.5, '2.5', '-5', '0', -2, '013'];

			for(const val of values)
				Schema({ numeric: val });

		});

		it('Should throw for non numeric values', () => {
			assert.throws(() => Schema({ numeric: 'a' }), Error);
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

});
