module.exports = function (grunt) {
	'use strict';

	var tasks = [
		'grunt-contrib-jshint'
	];

	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'assets/javascripts/functionals.js',
				'assets/javascripts/game-view.js',
				'assets/javascripts/minefield.js'
			]
		}
	});

	tasks.forEach(grunt.loadNpmTasks);
	grunt.registerTask('default', ['jshint']);
};
