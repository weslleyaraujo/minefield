/*
 * @Timer
 *
 * main class for time
 * */

var Timer = function (args) {
	this.initialize(args);
};

Timer.prototype.initialize = function (args) {
	this.params = args || {};
	this.set();
};

Timer.prototype.set = function () {
	console.log(args);
};

Timer.prototype.start = function (args) {
	console.log('start ai');
};
