/*
 * @Shuffle
 *
 * add shuffle to Array prototype
 * */
Array.prototype.shuffle = function () {
   for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
   return this;
}

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
	this.total = (this.X * this.Y);
	this.mines = args.mines || 80;

	if (this.validate()) this.create();
};

/*
 * MineField.validate
 *
 * validate args values
 * */
MineField.prototype.validate = function (args) {
	if (this.mines >= (this.X * this.Y)) {
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
	this.game = Array.apply(null, { length: this.X } ).map(function () {
		return arguments[1] = {
			line: this.lineY(),
			bombs: 0
		};

	}.bind(this));

	this.setBombs();
};

/*
 * MineField.lineY
 *
 * creates the Y line
 * */
MineField.prototype.lineY = function () {
	return Array.apply(null, { length: this.Y } ).map(function () {
		return arguments[1] = {
			explored: false,
			bomb: false
		};

	}.bind(this));

	this.setBombs();
};

/*
 * MineField.range
 * */
MineField.prototype.range = function (a, b) {
	return Math.floor(Math.random() * a) + b;
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
		index = this.range(this.game.length, 0);
		this.game[index].bombs++;

		if (this.game[index].bombs <= this.X) {
			input = input -1;
			this.game[index].line[this.game[index].bombs - 1].bomb = true;
		}
	}

	this.game.forEach(function (value, index) {
		this.game[index].line.shuffle();
	}.bind(this));

};
