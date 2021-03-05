# superstruct

![Build Status](https://github.com/janis-commerce/superstruct/workflows/Build%20Status/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/superstruct/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/superstruct?branch=master)
[![npm version](https://badge.fury.io/js/%40janiscommerce%2Fsuperstruct.svg)](https://www.npmjs.com/package/@janiscommerce/superstruct)


The following package complements the [superstruct](https://github.com/ianstormtaylor/superstruct) package, the same adds some methods to easily validate different types of data

## Installation
```sh
npm install @janiscommerce/superstruct
```
## Available custom structs types
The custom types that you can use in addition to the superstruct are:
- **`email`** This type checks if is a valid email
- **`URL`** This type checks if is a valid URL
- **`empty`** This type checks if it's an empty string, array or a falsy value
- **`!empty`** This type checks if it's not an empty string, array or a falsy value
- **`lowercase`** This type checks if is a valid lowercase string
- **`uppercase`** This type checks if is a valid uppercase string
- **`camelcase`** This type checks if is a valid camelcase string
- **`numeric`** This type checks if is a valid numeric value
- **`md5`** This type checks if is a valid md5 hash
- **`JSON`** This type checks if is a valid JSON
- **`ISODate`** This type checks if is a valid ISO Date
- **`integer`** This type checks if is a integer number
- **`positive`** This type checks if is a positive number
- **`positiveOrZero`** This type checks if is a positive number or zero
- **`objectId`** This type checks if is a ObjectId with 24 characters
- **`UUID`** This type checks if is a V4 UUID
- **`hexColor`** This type checks if is a Hexadecimal Color

## Usage
```js
const { struct } = require('@janiscommerce/superstruct');

const userStruct = struct({
	name: 'string',
	email: 'email',
	age: 'number',
	password: 'md5',
	image: 'URL',
	mainColor: 'hexColor
});

const userData = {
	name: 'John Doe',
	email: 'emai@asd.com',
	age: 28,
	password: 'be5b0158b79c90c8358990f34ec18d43',
	image: 'https://gravatar.com/avatar/23463b99b62a72f26ed677cc556c44e8?s=200',
	hexColor: '#123456'
};

userStruct(userData);
```
