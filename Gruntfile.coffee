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
      'myhost': grunt.file.readJSON 'tc.host'

    sshexec:
      restart:
        command: "forever restart oICs"
        options: config: 'myhost'

    sftp:
      upload:
        files: 
          './': ['app/js/*.js', 'package.json']
        options:
          config: 'myhost'
          path: '/root/perfectlife/bin'

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'compile', ['coffee']
  grunt.registerTask 'run-remote', [
    'coffee'
    'sftp:upload'
    'sshexec:restart'
  ]
  grunt.registerTask 'run-local', ['nodemon']