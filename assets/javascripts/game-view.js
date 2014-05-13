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
	this.set().render();
	this.hideMessage();
};

/*
 * GameView.set
 *
 * set main values
 * */
GameView.prototype.set = function () {
	this.$main = $('#game');
	this.$message = $('.message');
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

	this.bind();

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
	this.$page.find('.field-link').on('click', $.proxy(this.explore, this));
	this.$page.find('.field-link').on('contextmenu', $.proxy(this.suspect, this));
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

	this.minefield.game.started = true;
	this.expand(line, position);
};

/*
 * GameView.expand
 *
 * expand fields by position
 * */
GameView.prototype.expand = function (line, position) {
	var field = this.minefield.hasField(line, position),
	closests = [];

	// is suspect or done?
	if (field.suspect || this.minefield.game.done) {
		return;
	}

	// set explored
	closests.push(this.minefield.set(field, 'explored', true));

	// is bomb?
	if (closests[0].bomb) {
		this.lose(closests[0]).render();
	}

	this.minefield.findExpand(closests);
	this.render();
	this.isWinner();
};

/*
 * GameView.lose
 *
 * execute after lose game
 * */
GameView.prototype.lose = function (field) {
	this.minefield.game.done = true;
	this.minefield.exploredAll();
	field = this.minefield.set(field, 'death', true);
	this.showMessage('You lost! try again :D', 'error');
	return this;
};

/*
 * GameView.suspect
 *
 * toggle suspect on click
 * */
GameView.prototype.suspect = function (event) {
	event.preventDefault();
	var line = event.target.getAttribute('data-line'),
			position = event.target.getAttribute('data-position');

	this.minefield.toggleSuspect(line, position);
	this.render();
};

/*
 * GameView.isWinner
 *
 * is user winner
 * */
GameView.prototype.isWinner = function () {
	if (this.minefield.subtract() === 0) {
		this.minefield.game.done = true;
		this.showMessage('You won! Congrats!', 'success');
	}
};

/*
 * GameView.showMessage
 *
 * show message
 * */
GameView.prototype.showMessage = function (message, state) {
	this.$message.html(message).addClass('is-active is-' + state);
};

/*
 * GameView.hideMessage
 *
 * hide message
 * */
GameView.prototype.hideMessage = function (message, state) {
	this.$message.removeClass('is-active is-error is-succes');
};
