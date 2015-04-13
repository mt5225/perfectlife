module.exports = (grunt) ->
  grunt.initConfig
    watch:
      coffee:
        files: ['{,*/}*.coffee' ]
        tasks: ['newer:coffee']
    coffee:
      glob_to_multiple:
        expand: true
        flatten: false
        cwd: './'
        src: ['**/*.coffee']
        dest: './'
        ext: '.js'

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-newer'
  grunt.registerTask 'default', [
    'watch'
  ]