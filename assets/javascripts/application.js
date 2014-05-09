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
 * @app
 *
 * global application
 * */

window.App = {
	main: {
	
	}
};
