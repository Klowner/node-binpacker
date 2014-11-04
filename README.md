
# binpacker [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![NPM Version][npm-image]][npm-url]

## About

This is a very small library designed to aid in taking an array of
rectangle-like things (any object with `width` and `height` attributes,
and optionally `name`) and efficiently packs them into a larger rectangle
that expands as required. This library has no dependencies and works fine
on node.js as well as in the browser via browserify.

## Example

Begin with an array of objects that is "rectangle-like". The `name` attribute
can be anything, it's important to include a `name` attribute so you can
identify the resulting transformed rectangles after the packing operation.

```js
var rectangles = [
	{
		name: 'tall',
		width: 10,
		height: 40
	},
	{
		name: 'wide_1',
		width: 30,
		height: 5
	},
	{
		name: 'wide_2',
		width: 30,
		height: 10
	}
];
```

With the above array of rectangles, we can feed them into the `BinPacker`.
Passing rectangles into `.pack()` with no additional arguments will *not*
alter your rectangles objects in any way.

```js
var binPacker = require('binpacker')(),
	result = binPacker.pack(rectangles);
/*
result ==
{
	rects: [
		{ x: 0,  y: 0, width: 10, height: 40, name: 'tall' },
		{ x: 10, y: 0, width: 30, height: 5,  name: 'wide_1' },
		{ x: 10, y: 5, width: 30, height: 10, name: 'wide_2' }
	],
	width: 40,
	height: 40
}
*/
```

If you'd like the `x` and `y` attributes to be added directly to your
rectangle objects, you can provide a `prefix` argument.

```js
var binPacker = require('binpacker')();
binPacker.pack(rectangles, 'pack_');
// each item in `rectangles` will have `pack_x` and `pack_y` attributes
// assigned to them. Passing an empty string works too!
```

## Api

### `binpacker()`
Takes no arguments, constructs an instance of `binpacker.BinPacker`.

### `new binpacker.BinPacker()`
Takes no arguments, constructs an instance of `binpacker.BinPacker`.

### `binpacker.pack(rectangles#Array, [prefix#String])`
Pass an array of "rectangle-like" items to pack into a larger rectangle.

If `prefix` is provided, then `x` and `y` attributes will be assigned
directly to the items within the `rectangles` parameter, prefixed by `prefix`.
You can use an empty string as a prefix to assign directly to `x` and `y`.

Returns:
```js
{
	rects: [
		{
			x: integer,
			y: integer,
			width: integer,
			height: integer,
			name: string
		},
		...
	],
	width: integer, // width of container rectangle
	height: integer // height of container rectangle
}
```

### `binpacker.size()`

Get the calculated minimum target rectangle size.

Returns:
```js
{
	width: integer,
	height: integer
}
```

### `binpacker.index()`

Get the array of calculated rectangles. This is identical to the data previously
returned during the `.pack()` operation as the `rects` attribute.


## Install

With [npm](http://npmjs.org) do:

```
npm install binpacker
```

## License
Copyright (c) 2014 Mark Riedesel
Licensed under the MIT license.


[travis-url]: https://travis-ci.org/Klowner/node-binpacker
[travis-image]: http://img.shields.io/travis/Klowner/node-binpacker.svg?style=flat
[coveralls-url]: https://coveralls.io/r/Klowner/node-binpacker
[coveralls-image]: https://img.shields.io/coveralls/Klowner/node-binpacker.svg?style=flat
[npm-url]: https://www.npmjs.org/package/binpacker 
[npm-image]: http://img.shields.io/npm/v/node-binpacker.svg?style=flat
