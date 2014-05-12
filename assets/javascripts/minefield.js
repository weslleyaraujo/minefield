/*
 * @MineField
 *
 * main class for minefield definition
 * */

var MineField = function (args) {
	this.initialize(args);
};

/*
 * MineField.intialize
 *
 * constructor method
 * */
MineField.prototype.initialize = function (args) {
	args = args || {};
	this.X = args.x || 10;
	this.Y = args.y || 5;
	this.total = (this.Y * this.X);
	this.mines = args.mines || 80;

	if (this.validate()) this.create();
};

/*
 * MineField.validate
 *
 * validate args values
 * */
MineField.prototype.validate = function (args) {
	if (this.mines >= this.total) {
		this.error('The number of mines cant be greater or equal of the total number of fields');
		return false;
	}

	return true;
};

/*
 * MineField.error
 *
 * throw errors
 * */
MineField.prototype.error = function (message) {
	throw new Error(message || 'Some unknow error happend :(');
};

/*
 * MineField.create
 *
 * creates the "field" with empty blocks
 * */
MineField.prototype.create = function (args) {
	this.game = Array.apply(null, { length: this.Y } ).map(function () {
		var line = arguments[1];
		line = {
			line: this.createLine(arguments[1]),
			bombs: 0
		};

		return line;

	}.bind(this));

	this.setBombs();
};

/*
 * MineField.line
 *
 * creates the  line
 * */
MineField.prototype.createLine = function (index) {
	return Array.apply(null, { length: this.X } ).map(function () {
		var field =  arguments[1];
		field = {
			explored: false,
			bomb: false,
			near: 0,
			line: index
		};

		return field;

	}.bind(this));

};


/*
 * MineField.setBombs
 *
 * set bombs by line
 * */
MineField.prototype.setBombs = function () {
	var input = this.mines,
			index;

	while (input > 0) {
		index = Math.range(this.game.length, 0);

		if (this.game[index].bombs < this.Y) {
			this.game[index].bombs++;
			input = input -1;
			this.game[index].line[this.game[index].bombs - 1].bomb = true;
		}
	}

	this.game.forEach(function (value, index) {
		this.game[index].line.shuffle();

		// set 'real' position
		this.game[index].line.map(function (field, position) {
			field.position = position;
			return field;
		});

	}.bind(this));

	// set how many bombs are near to the fields
	this.setNear();
};

/*
 * MineField.count
 *
 * count bombs next to the field
 * */
MineField.prototype.count = function (field) {
	var next = (field.position + 1),
	prev = field.position - 1,
	bombs = 0,

	/*
	 * create the lines to check
	 * (upperline, lowerline, line)
	 *
	 * */
	lines = [
		(field.line - 1),
		(field.line + 1),
		field.line
	];

	if (!field.bomb) {
		bombs = lines.reduce(function (total, value) {
			total = this.hasBomb(value, prev, total);
			total = this.hasBomb(value, next, total);
			total = this.hasBomb(value, field.position, total);

			return total;

		}.bind(this), bombs);
	}

	field.near = bombs;
	return field;
};

/*
 * MineField.hasBomb
 *
 * has bombs near to the field
 * */
MineField.prototype.hasBomb = function (line, position, total) {
	if (this.game[line] && this.game[line].line[position] && this.game[line].line[position].bomb) {
		total++;
		return total;
	}

	return total;
};

/*
 * MineField.setNear
 *
 * set bombs near to the field
 * */
MineField.prototype.setNear = function () {

	this.game.forEach(function (value, index) {

		this.game[index].line.map(function (field, position) {
			return this.count(field);
		}.bind(this));

	}.bind(this));

	// Create final view
	new GameView({
		minefield: this
	});
};
