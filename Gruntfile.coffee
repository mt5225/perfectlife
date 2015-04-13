module.exports = (grunt) ->
  require('load-grunt-tasks') grunt
  require('time-grunt') grunt
  grunt.initConfig
    watch:
      coffee:
        files: ['{,*/}*.coffee' ]
        tasks: ['newer:coffee']
    coffee:
      glob_to_multiple:
        expand: true
        flatten: false
        cwd: './app'
        src: ['*.coffee']
        dest: './app/js'
        ext: '.js'

    nodemon:
      dev:
        script: './app/js/main.js'

    scp:
      options:
        host: '119.29.114.143'
        username: 'ubuntu'
        password: '$Sh7evxc'
      js:
        files: [
          cwd: './'
          src: ['./app/js/*.js']
          filter: 'isFile'
          dest: '/home/ubuntu/perfectlife/bin'
        ]
  grunt.registerTask 'default', [
    'watch'
  ]
  grunt.registerTask 'upload', [
    'scp'
  ]
  grunt.registerTask 'run', [
    'nodemon'
  ]