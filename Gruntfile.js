const sass = require("node-sass");
module.exports = function (grunt) {
    require("time-grunt")(grunt);
    require("jit-grunt")(grunt,{
        useminPrepare: 'grunt-usemin',
    });
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

    imagemin: {
        dynamic: {
          files: [
            {
              expand: true,
              cwd: "./",
              src: "assets/img/*.{png,gif,jpg,jpeg}",
              dest: "dist/",
            },
          ],
        },
    },

    htmlmin: {                                     // Task
        dist: {                                      // Target
          options: {                                 // Target options
            removeComments: true,
            collapseWhitespace: true
          },
          files: {                                   // Dictionary of files
            'dist/index.html': 'dist/index.html',     // 'destination': 'source'
            'dist/contacto.html': 'dist/contacto.html',
            'dist/about.html': 'dist/about.html',
            'dist/precios.html': 'dist/precios.html',
          }
        },
    },

    copy: {
        html: {
          files: [
            {
              expand: true,
              dot: true,
              cwd: "./",
              src: ["*.html"],
              dest: "dist",
            },
          ],
        },
        fonts: {
            files: [
              {
                expand: true,
                dot: true,
                cwd: "node_modules/@fortawesome/fontawesome-free",
                src: ["webfonts/*.*"],
                dest: "dist/assets/",
              },
            ],
          },
      },

      clean: {
        build: {
          src: ["dist/"],
        },
      },

      cssmin: {
        dist: {},
      },

      uglify: {
        dist: {},
      },

      filerev: {
        options: {
          encoding: "utf8",
          algorithm: "md5",
          lenght: 20,
        },
        release: {
          files: [
            {
              src: ["dist/assets/js/*.js", "dist/assets/css/*.css"],
            },
          ],
        },
      },

      concat: {
        options: {
          separator: ";",
        },
        dist: {},
      },

      useminPrepare: {

        foo: {
          dest: "dist",
          src: ["index.html", "about.html", "precios.html", "contacto.html"],
        },

        options: {
          flow: {
            steps: {
              css: ["cssmin"],
              js: ["uglify"],
            },
            post: {
              css: [
                {
                  name: "cssmin",
                  createConfig: function (context, block) {
                    var generated = context.options.generated;
                    generated.options = {
                      keepSpecialComments: 0,
                      rebase: false,
                    };
                  },
                },
              ],
            },
          },
        },
    },

    usemin: {
      html: [
        "dist/index.html",
        "dist/about.html",
        "dist/precios.html",
        "dist/contacto.html",
      ],
      options: {
        assetsDir: ["dist", "dist/assets/css", "dist/assets/js"],
      },
    },

  });

  // Load the plugin that provides the "uglify" task.
  /* grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks("grunt-contrib-imagemin") */

  // Default task(s)
  grunt.registerTask("css", ["sass"]);
  grunt.registerTask("default", ["browserSync", "watch"]);
  grunt.registerTask("img:compress", ["imagemin"]);

  grunt.registerTask("build", [
    "clean",
    "sass",
    "copy",
    "imagemin",
    "useminPrepare",
    "concat",
    "cssmin",
    "uglify",
    "filerev",
    "usemin",
    "htmlmin"
  ]);

};
