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
	this.set().bind().render();
};

/*
 * GameView.set
 *
 * set main values
 * */
GameView.prototype.set = function () {
	this.$main = $('#game');
	this.$page = $(document);
	this.template = window.Helpers.template('#field-template');
	return this;
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
		line = value.line.map(function(field) {
			return this.template(field);
		}.bind(this)).join('');
		
		this.$main.append($('<tr>').html(line));

	}.bind(this));

	return this;
};

/*
 * GameView.item
 *
 * returns an element
 * */
GameView.prototype.item = function (data) {
	return this.template(data);
};

/*
 * GameView.bind
 *
 * bind elements
 * */
GameView.prototype.bind = function () {
	this.$page.on('click', '.field-link', $.proxy(this.explore, this));
	return this;
};

/*
 * GameView.explore
 *
 * explore field on click
 * */
GameView.prototype.explore = function (event) {
	var line = event.target.getAttribute('data-line'),
			position = event.target.getAttribute('data-position');

	console.log(line, position, this.minefield.game[line].line[position]);
};
