/*
 * @GameView
 *
 * main class for game view definition
 * */

var GameView = function (minefield) {
	this.initialize(minefield);
};

/*
 * GameView.intialize
 *
 * constructor method
 * */
GameView.prototype.initialize = function (minefield) {
	this.minefield = minefield;
	this.set();
	this.render();
};

/*
 * GameView.set
 *
 * set main values
 * */
GameView.prototype.set = function () {
	this.$main = $('#game');
	this.template = window.Helpers.template('#field-template');
};

/*
 * GameView.render
 *
 * render the elements inside table
 * */
GameView.prototype.render = function () {
	this.$main.html();
	var line;

	this.minefield.game.forEach(function (value, index) {

		line = value.line.map(function(field){
			return this.template(field);
		}.bind(this)).join('');
		
		this.$main.append($('<tr>').html(line));

	}.bind(this));
};

/*
 * GameView.item
 *
 * returns an element
 * */
GameView.prototype.item = function () {
	return this.template();
};
