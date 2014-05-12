/*
 * @Helpers
 *
 * a lot of helpers (or not)
 * */
window.Helpers = {};

/*
 * @Shuffle
 *
 * add shuffle to Array prototype
 * */
Array.prototype.shuffle = function () {
   for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
   return this;
};

/*
 * @Range
 *
 * add range method for math
 * */
Math.range = function (a, b) {
	return this.floor(this.random() * a) + b;
};

/*
 * @template
 *
 * template helper for underscore
 * */
window.Helpers.template = function (selector) {
	var content = $(selector).html();
	return _.template(content ? content : '');
};
