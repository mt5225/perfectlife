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

    sshconfig:
      "myhost": grunt.file.readJSON 'tc.host'

    sshexec:
      test:
        command: 'uptime',
        options: config: 'myhost'
    sftp:
      upload:
        files: ['./' : 'app/js/*.js']
        options:
          config: 'myhost'
          path: '/home/ubuntu/perfectlife/bin'

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'run-remote', [
    'sftp:upload'
    'sshexec:test'
  ]
  grunt.registerTask 'run-local', ['nodemon']