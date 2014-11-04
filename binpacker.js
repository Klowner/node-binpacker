// Mark Riedesel 2014
// ------------------
// If only this thing could pack my luggage

function Rect (x, y, w, h) {
	this.x = x || 0;
	this.y = y || 0;
	this.width = w || 0;
	this.height = h || 0;
}

Rect.prototype = {
	used: false,
	right: null,
	down: null,
	name: undefined
};

function BinPacker () {}

BinPacker.prototype = {
	pack: function (rects, prefix) {
		// Rects are expected to have attributes 'width', 'height', and optionally 'name'
		var self = this,
			rect, node, fit, i, fits;

		// Sort from smallest to largest
		rects = rects.sort(function (a, b) {
			a = Math.max(a.height, a.width);
			b = Math.max(b.height, b.width);
			return a == b ? 0 : a > b ? -1 : 1;
		});

		this.fits = fits = [];

		this.root = new Rect(
			0,
			0,
			rects[0] && rects[0].width,
			rects[0] && rects[0].height
		);

		// Pack into bins
		for (i in rects) {
			rect = rects[i];

			node = self.findNode(self.root, rect.width, rect.height);
			if (node) {
				fit = self.splitNode(node, rect.width, rect.height);
			} else {
				fit = self.growNode(rect.width, rect.height);
			}

			if (typeof(prefix) !== 'undefined') {
				rect[prefix + 'x'] = fit.x;
				rect[prefix + 'y'] = fit.y;
			}

			fits.push({
				x: fit.x,
				y: fit.y,
				width: rect.width,
				height: rect.height,
				name: rect.name
			});
		}

		return {
			rects: fits,
			width: this.root.width,
			height: this.root.height
		};
	},

	findNode: function (node, width, height) {
		if (node.used) {
			return this.findNode(node.right, width, height) || this.findNode(node.down, width, height);
		} else if ((width <= node.width) && (height <= node.height)) {
			return node;
		}
		return null;
	},

	splitNode: function (node, width, height) {
		node.used = true;

		node.down = new Rect(
			node.x,
			node.y + height,
			node.width,
			node.height - height
		);

		node.right = new Rect(
			node.x + width,
			node.y,
			node.width - width,
			height
		);

		return node;
	},

	growNode: function (width, height) {
		var root = this.root,
			canGrowDown = width <= root.width,
			canGrowRight = height <= root.height,
			shouldGrowDown = canGrowDown && (root.width >= (root.height + height)),
			shouldGrowRight = canGrowRight && (root.height >= (root.width + width));

		if (shouldGrowRight) {
			return this.growRight(width, height);
		} else if (shouldGrowDown) {
			return this.growDown(width, height);
		} else if (canGrowRight) {
			return this.growRight(width, height);
		} else if (canGrowDown) {
			return this.growDown(width, height);
		}

		return null;
	},

	growRight: function (width, height) {
		var prevRoot = this.root,
			newRoot,
			node;

		this.root = newRoot = new Rect(
			0,
			0,
			prevRoot.width + width,
			prevRoot.height
		);

		newRoot.used = true;
		newRoot.down = prevRoot;
		newRoot.right = new Rect(
			prevRoot.width,
			0,
			width,
			prevRoot.height
		);

		node = this.findNode(this.root, width, height);
		if (node) {
			return this.splitNode(node, width, height);
		}
		return null;
	},

	growDown: function (width, height) {
		var prevRoot = this.root,
			newRoot,
			node;

		this.root = newRoot = new Rect(
			0,
			0,
			prevRoot.width,
			prevRoot.height + height
		);

		newRoot.used = true;
		newRoot.down = new Rect(
			0,
			prevRoot.height,
			prevRoot.width,
			height);
		newRoot.right = prevRoot;

		node = this.findNode(this.root, width, height);
		if (node) {
			return this.splitNode(node, width, height);
		}
		return null;
	},

	index: function () {
		return this.fits.slice();
	},

	size: function () {
		return {
			width: this.root.width,
			height: this.root.height
		};
	}
};

module.exports = function () {
	return new BinPacker();
};

module.exports.BinPacker = BinPacker;
module.exports.Rect = Rect;
