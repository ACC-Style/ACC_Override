module.exports = function(grunt){
	require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks
	//Project Config
	grunt.initConfig({
		 connect:{
			server:{
				options:{
						livereload:true,
					  	port: 8000,
					  	base: 'docs',
					  	open:{
					    target: 'http://localhost:8000', // target url to open
					  }
					}
				}
			},
        'dart-sass': {
            target: {
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['*.scss'],
                    dest: 'docs/css/',
                    ext: '.css'
                }]
            }
        },
		postcss: {
		    options: {
		      map: true, // inline sourcemaps
		      // or
		      map: {
		          inline: false, // save all sourcemaps as separate files...
		          annotation: 'docs/css/maps/' // ...to the specified directory
		      },
		      processors: [
				require('pixrem')(), // add fallbacks for rem units
				require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
				require('cssnano')() // minify the result
		      ]
		    },
		    dist: {
		      src: 'docs/css/*.css'
		    }
		},
	    watch: {
	    	options: {
			      livereload: true,
			    },
			scss: {
			files: ['scss/**/*.scss'],
			tasks: [ 'dart-sass','postcss']
			}
	    }
	});
	// These plugins provide necessary tasks.



	// Default task.
	
	grunt.registerTask('default', [
		'connect', 'dart-sass', 'postcss','watch'
		]);
}
