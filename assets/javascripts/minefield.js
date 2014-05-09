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
		this.validationMessage = 'The number of mines cant be greater or equal of the total of fields';
		this.error();
		return false;
	}

	return true;
};

/*
 * MineField.error
 *
 * throw errors
 * */
MineField.prototype.error = function () {
	throw new Error(this.validationMessage);
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
			total = 0,

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
	
	lines.forEach(function (value) {
		if (!field.bomb) {
			// total = this.hasBomb(value, prev, total);
			// total = this.hasBomb(value, next, total);
			// total = this.hasBomb(value, field.position, total);

			if (this.game[value] && this.game[value].line[prev] && this.game[value].line[prev].bomb) {
				total++;
			}

			if (this.game[value] && this.game[value].line[next] && this.game[value].line[next].bomb) {
				total++;
			}

			if (this.game[value] && this.game[value].line[field.position] && this.game[value].line[field.position].bomb) {
				total++;
			}
		}


	}.bind(this));

	field.near = total;
	return field;
};

/*
 * MineField.hasBomb
 *
 * has bombs near to the field
 * */
MineField.prototype.hasBomb = function (line, position, total) {
	if (this.game[line] && this.game[line].line[position] && this.game[line].line[position].bomb) {
		return total++;
	}

	return total;
}

/*
 * MineField.setNext
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
	new GameView(this);
};
