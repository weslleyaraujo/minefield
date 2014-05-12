module.exports = function (grunt) {
	'use strict';

	var tasks = [
		'grunt-contrib-jshint',
		'grunt-contrib-compass',
		'grunt-contrib-watch'
	];

	grunt.initConfig({
		watch: {
			css: {
				files: [
					'assets/sass/*.sass'
				],
				tasks: [
					'compass:dev'
				]
			}
		},
		jshint: {
			all: [
				'Gruntfile.js',
				'assets/javascripts/functionals.js',
				'assets/javascripts/game-view.js',
				'assets/javascripts/minefield.js'
			]
		},
		compass: {
			dev: {
				options: {
					sassDir: 'assets/sass',
					cssDir: 'assets/css'
				}
			}
		}
	});

	tasks.forEach(grunt.loadNpmTasks);
	grunt.registerTask('default', ['jshint']);
};
