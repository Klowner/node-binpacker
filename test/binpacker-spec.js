var BinPacker = require('../binpacker').BinPacker;

var rectangles = [
	{
		width: 32,
		height: 32,
		name: "32x32(1)"
	},
	{
		width: 64,
		height: 64,
		name: "64x64(1)"
	},
	{
		width: 16,
		height: 16,
		name: "16x16(1)"
	},
	{
		width: 16,
		height: 16,
		name: "16x16(2)"
	},
	{
		width: 16,
		height: 32,
		name: "16x32(1)"
	},
	{
		width: 8,
		height: 8,
		name: "8x8(1)"
	}
];

var tests = [
	{
		len: 1,
		max: [32, 32]
	},
	{
		len: 2,
		max: [96, 64]
	},
	{
		len: 3,
		max: [96, 64]
	},
	{
		len: 4,
		max: [96, 64]
	},
	{
		len: 5,
		max: [96, 64]
	},
	{
		len: 6,
		max: [96, 72]
	}
];

describe("pack", function () {
	tests.forEach(function (test) {
		var binpacker = new BinPacker();

		it(test.label || test.len  + ' rectangles within ' + test.max[0] + 'x' + test.max[1], function () {
			var result = binpacker.pack(rectangles.slice(0, test.len));
			expect(result.width).toBeCloseTo(test.max[0], 2);
			expect(result.height).toBeCloseTo(test.max[1], 2);
		});
	});
});
