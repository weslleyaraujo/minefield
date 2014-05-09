module.exports = function (grunt) {
	'use strict';

	var tasks = [
		'grunt-contrib-jshint'
	];

	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'assets/javascripts/main.js'
			]
		}
	});


	tasks.forEach(grunt.loadNpmTasks);
	grunt.registerTask('default', ['jshint']);
};
