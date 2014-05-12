/*
 * @GameView
 *
 * main class for game view definition
 * */

var GameView = function (args) {
	args = args || {};
	this.initialize(args);
};

/*
 * GameView.intialize
 *
 * constructor method
 * */
GameView.prototype.initialize = function (args) {
	this.minefield = args.minefield;
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
	this.$main.html('');
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

	this.expand(line, position).render();
};

/*
 * GameView.expand
 *
 * expand fields by position
 * */
GameView.prototype.expand = function (line, position) {
	var field = this.minefield.get(line, position);
	field = this.minefield.set(field, 'explored', true);

	console.log(field);

	if (field.bomb) {
		this.lose();
	}

	console.log(this.minefield.game[line].line[position]);

	return this;
};

/*
 * GameView.lose
 *
 * execute after lose game
 * */
GameView.prototype.lose = function () {
	alert('perdeu');
};
