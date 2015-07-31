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
        src: ['{,*/}*.coffee']
        dest: './app/js'
        ext: '.js'

    nodemon:
      dev:
        script: './app/js/main.js'

    sshconfig:
      'myhost': grunt.file.readJSON 'tc.host'
      'myhost_prod': grunt.file.readJSON 'tc_prod.host'

    sshexec:
      restart_qa:
        command: "export NODE_ENV=qa;cd /root/perfectlife/bin;forever stop app/js/main.js;forever start ./app/js/main.js"
        options: config: 'myhost'
      restart_prod:
        command: "export NODE_ENV=prod;cd /root/perfectlife/bin;forever stop app/js/main.js;forever start ./app/js/main.js"
        options: config: 'myhost_prod'

    sftp:
      upload:
        files: './': ['app/js/**', 'package.json']
        options:
          config: 'myhost'
          path: '/root/perfectlife/bin/app'
          srcBasePath: 'app'
          createDirectories: true
      upload_prod:
        files: './': ['app/js/**', 'package.json']
        options:
          config: 'myhost_prod'
          path: '/root/perfectlife/bin/app'
          srcBasePath: 'app'
          createDirectories: true

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'compile', ['coffee']
  grunt.registerTask 'run-remote-qa', [
    'coffee'
    'sftp:upload'
    'sshexec:restart_qa'
  ]
  grunt.registerTask 'run-remote-prod', [
    'coffee'
    'sftp:upload_prod'
    'sshexec:restart_prod'
  ]
  grunt.registerTask 'run-local', ['nodemon']
  