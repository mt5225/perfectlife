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
      test:
        command: 'uptime'
        options: config: 'myhost'
      changeport:
        command: "sed -i 's/8080/80/g' /root/perfectlife/bin/app/js/main.js"
        options: config: 'myhost'
#      node:    todo:fix sudo issue
#        command: ['echo <%=host.password%> | sudo -S whoami'].join ' && '
#        options: config: 'myhost'

    sftp:
      upload:
        files: ['./' : 'app/js/*.js']
        options:
          config: 'myhost'
          path: '/root/perfectlife/bin'

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'compile', ['coffee']
  grunt.registerTask 'run-remote', [
    'coffee'
    'sftp:upload'
    'sshexec:changeport'
  ]
  grunt.registerTask 'run-local', ['nodemon']