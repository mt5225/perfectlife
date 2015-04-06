module.exports = (grunt) ->
  grunt.initConfig
    connect:
      server:
        port: 80
        base: '.'
        options:
          keepalive: true

  grunt.loadNpmTasks 'grunt-connect'
  grunt.registerTask 'default', ['connect:server']


