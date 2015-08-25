var sh = require('shelljs');

/*global module:false*/
module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %><%= "\\n" %>' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '* JBoss, Home of Professional Open Source<%= "\\n" %>' +
                '* Copyright <%= pkg.author.name %>, and individual contributors<%= "\\n" %>' +
                '*<%= "\\n" %>' +
                '* Licensed under the Apache License, Version 2.0 (the "License");<%= "\\n" %>' +
                '* you may not use this file except in compliance with the License.<%= "\\n" %>' +
                '* You may obtain a copy of the License at<%= "\\n" %>' +
                '* <%= pkg.licenses[0].url + "\\n" %>' +
                '* Unless required by applicable law or agreed to in writing, software<%= "\\n" %>' +
                '* distributed under the License is distributed on an "AS IS" BASIS,<%= "\\n" %>' +
                '* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.<%= "\\n" %>' +
                '* See the License for the specific language governing permissions and<%= "\\n" %>' +
                '* limitations under the License.<%= "\\n" %>' +
                '*/<%= "\\n" %>'
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: ['src/aerogear-push.js'],
                description: 'UnifiedPush Client build',
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        qunit: {
            unifiedpush: 'tests/unit/**/*.html'
        },
        jshint: {
            all: {
                src: [ 'Gruntfile.js', 'src/**/*.js' ],
                options: {
                    jshintrc: '.jshintrc'
                }
            },
            tests: {
                src: [ 'tests/unit/**/*.js' ],
                options: {
                    jshintrc: 'tests/.jshintrc'
                }
            }
        },
        uglify: {
            all: {
                files: {
                    'dist/<%= pkg.name %>.min.js': [ 'dist/<%= pkg.name %>.js' ]
                },
                options: {
                    preserveComments: 'some',
                    sourceMap: 'dist/<%= pkg.name %>.js.map',
                    sourceMappingURL: '<%= pkg.name %>.js.map',
                    sourceMapPrefix: 1,
                    beautify: {
                        ascii_only: true
                    }
                }
            }
        }
    });

    // grunt-contrib tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task
    grunt.registerTask('default', ['jshint', 'qunit', 'concat:dist', 'uglify:all']);
    grunt.registerTask('travis', ['jshint', 'qunit']);

    grunt.registerTask('docs', function() {
        sh.exec('jsdoc-aerogear src/ -r -d docs README.md');
    });
};
