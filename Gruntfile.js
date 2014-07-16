var path = require('path');

var stylesheetsDir = 'styles/';

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//lint my jS
		jshint: {
			all: ['js/app.js']
		},
		//compile Sass
		sass: { // Task                              
			dist: { // Target  
				options: { // Target options
					style: 'expanded'
				},
				files: {   // Dictionary of files
					'styles/main.css': stylesheetsDir + 'main.scss'       // 'destination': 'source'
				}
			}
		},
		//autoprefix CSS
		autoprefixer: {
			options: {
				cascade: true
			},
			single_file: {
				src: 'styles/main.css'
			}
		},
		//watch file changes and recompile if necessary
		watch: {
			css: {//task
			    files: 'styles/*.scss', //where to watch
			    tasks: ['sass','autoprefixer'], 
			    options: {
			      livereload: true
			    }
			},
			javascript: {
				files: ['js/app.js'],
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//default task grunt will run...
	grunt.registerTask('default', ['jshint','sass','autoprefixer','watch']);

};