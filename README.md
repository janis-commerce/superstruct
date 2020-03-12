# superstruct

[![Build Status](https://travis-ci.org/janis-commerce/superstruct.svg?branch=master)](https://travis-ci.org/janis-commerce/superstruct)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/superstruct/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/superstruct?branch=master)

The following package complements the [superstruct](https://github.com/ianstormtaylor/superstruct) package, the same adds some methods to easily validate different types of data

## Installation
```sh
npm install @janiscommerce/superstruct
```
## Available custom structs types
The custom types that you can use in addition to the superstruct are:
- **`email`** This type checks if is a valid email
- **`URL`** This type checks if is a valid URL
- **`empty`** This type checks if the string is empty
- **`!empty`** This type checks if the string is not empty
- **`lowercase`** This type checks if is a valid lowercase string
- **`uppercase`** This type checks if is a valid uppercase string
- **`camelcase`** This type checks if is a valid camelcase string
- **`numeric`** This type checks if is a valid numeric value
- **`md5`** This type checks if is a valid md5 hash
- **`JSON`** This type checks if is a valid JSON
- **`ISODate`** This type checks if is a valid ISO Date
- **`integer`** This type checks if is a integer number
- **`positive`** This type checks if is a positive number
- **`positiveOrZero`** This type checks if is a positive number or Zero
- **`objectId12`** This type checks if is a ObjectId with 12 characters
- **`objectId24`** This type checks if is a ObjectId with 24 characters
- **`UUID`** This type checks if is a V4 UUID

## Usage
```js
const { struct } = require('@janiscommerce/superstruct');

const userStruct = struct({
	name: 'string',
	email: 'email',
	age: 'number',
	password: 'md5',
	image: 'URL'
});

const userData = {
	name: 'John Doe',
	email: 'emai@asd.com',
	age: 28,
	password: 'be5b0158b79c90c8358990f34ec18d43',
	image: 'https://gravatar.com/avatar/23463b99b62a72f26ed677cc556c44e8?s=200'
};

userStruct(userData);
```
