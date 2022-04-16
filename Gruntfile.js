const sass = require("node-sass");
module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    sass: {
      options: {
        implementation: sass,
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: "assets/css",
            src: ["*.scss"],
            dest: "assets/css",
            ext: ".css",
          },
        ],
      },
    },

    watch: {
        files: ['assets/css/*.scss'],
        tasks: ['css'],
    },

    browserSync: {
        dev: {
          bsFiles: { //Browser FIles
            src: [
                "/assets/css/*.css", 
                "*.html", 
                "/assets/js/*.js"
            ],
          },
          options: {
            watchTask: true,
            server: {
              baseDir: "./", //Directorio base para nuestro servidor.
            },
          },
        },
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s)
  grunt.registerTask("css", ["sass"]);
  grunt.registerTask("default", ["browserSync", "watch"]);
};
