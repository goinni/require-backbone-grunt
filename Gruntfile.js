/**
 * @since 2016-08-10 21:43
 * @author Jerry.hou
 */
module.exports = function(grunt){

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        /**
         * 基础配制信息
         */
        config: {
          folder: 'release',
          ip: 'http://127.0.0.1',
          port: 8888,
          livereload: 35740
        },
        /**
         * 版权信息
         */
        banner: '/** \n * <%= pkg.name %> - v<%= pkg.version %> \n' +
                ' * Create Date -<%= grunt.template.today("yyyy-mm-dd HH:MM:dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> \n */',
        /**
         * less文件编译
         */
        less: {
            dev: {
                files: {
                    "<%= config.folder %>/assets/css/app.min.css": "app/assets/**/*.less"
                }
            }
        },
        cssmin: {
            dev: {
                options: {
                    banner: '<%= banner %>'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.folder %>/assets/css/',
                    src: '*.css',
                    dest: '<%= config.folder %>/assets/css/'
                }]
            }
        },
        /**
         * 处理浏览器兼容
         */
        autoprefixer: {
            dev: {
                options: {
                    browsers: [
                        'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
                    ]
                },
                src: '<%= config.folder %>/assets/css/*.css',
                dest: '<%= config.folder %>/assets/css/app.min.css'
            }
        },
        //此处的requirejs的配置和requeirjs.config要区分开，那个是requeirjs项目加载配置
        //这个是 grunt-contrib-requirejs打包配置
        requirejs: {
            build: {
                options: {
                    //此处是文件Gruntfile的相对位置
                    appDir: './app',
                    //设置默认路径 ./app/js
                    baseUrl : 'script',
                    //设置压缩后的路径 ./build
                    dir: './release',

                    //这里paths 是被打包文件所需要的依赖文件以及被打包的文件
                    //那么 其他的呢？ 其他的模块会按照依赖关系也被打包进去
                    //比如 app需要 ./app/js/controller/myCon.js grunt就自动把他打包进去了
                    //我们只管 被打包的文件和此文件 requirejs()函数加载的依赖 
                    paths: {
                        jquery: 'libs/jquery/jquery.min',
                        underscore: 'libs/underscore/underscore-min',
                        backbone: 'libs/backbone/backbone-min',
                        text: 'libs/text/text' 
                    },

                    //requiejs.config里面配置了依赖关系和全局变量那为什么这还需要配置
                    //因为 打包后代码的变量将被替换只有a b c d类似简单的变量了
                    //此处配置了，打包后就不报错了，grunt-contrib-requirejs给在中间转了一下
                    shim: {
                        'underscore': {
                            exports: '_'
                        },
                        'jquery': {
                            exports: '$'
                        },
                        'backbone': {
                            deps: ['underscore', 'jquery'],
                            exports: 'Backbone'
                        }
                    },
                    //此处的modules就是要打包的文件(模块)
                    //我们例子项目因为通过app.js就把整个项目模块 关联了起来
                    //所以我只打包main.js grunt就自动把其他依赖文件按依赖关系(顺序)打包进去
                    modules: [{
                        name: 'app'
                    }]
                }
            }
        },
        /**
         * 静态文件服务器
         */
        connect: {
            server: {
                options: {
                    // 经过测试 connect插件会依照base的定义顺序检索文件
                    // 这意味着如果存在相同文件，定义在前面的会优先返回
                    base: ['<%= config.folder %>', '.'],
                    port: '<%= config.port %>',
                    open: '<%= config.ip+ ":" +config.port %>/',
                    livereload: '<%= config.livereload%>',
                    hostname: '*',
                    middleware: function(connect, options, middlewares) {
                        // inject a custom middleware into the array of default middlewares 
                        middlewares.unshift(function(req, res, next) {
                        // if (req.url !== '/hello/world') return next();
                        // res.end('Hello, world from port #' + options.port + '!');
                            return next();
                        });
                      return middlewares;
                    }
                }
            }
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'app/script',
                    src: '**/*',
                    dest: '<%= config.folder %>/script/'
                },{
                    expand: true,
                    cwd: 'app/assets/images',
                    flatten: true,
                    src: '**/*',
                    dest: '<%= config.folder %>/assets/images/'
                },{
                    expand: true,
                    cwd: 'app/mockdata',
                    flatten: true,
                    src: '**/*',
                    dest: '<%= config.folder %>/mockdata/'
                },{
                    expand: true,
                    cwd: 'app',
                    src: ['*.html'],
                    dest: '<%= config.folder %>'
                }]
            },
            //watch 时单独处理的任务
            component: {
                expand: true,
                cwd: 'app/script/component',
                src: '**/*',
                dest: '<%= config.folder %>/script/component'
            },
            base: {
                expand: true,
                cwd: 'app/script/base',
                src: '**/*',
                dest: '<%= config.folder %>/script/base'
            },
            libs: {
                expand: true,
                cwd: 'app/script/libs',
                src: '**/*',
                dest: '<%= config.folder %>/script/libs'
            },
            appJs: {
                expand: true,
                cwd: 'app/script',
                src: '*.js',
                dest: '<%= config.folder %>/script'
            },
            appHtml: {
                expand: true,
                cwd: 'app',
                src: ['*.html'],
                dest: '<%= config.folder %>'
            }
        },
        /**
         * 监听Task改变并执行对应的Task
         */
        watch: {
            options: {
                livereload: '<%= config.livereload%>'
            },
            less: {
                files: "app/assets/less/**/*.less",
                tasks: ["less:dev"]
            },
            component: {
                files: "app/script/component/**/*",
                tasks: ["copy:component"]
            },
            base: {
                files: "app/script/base/**/*",
                tasks: ["copy:base"]
            },
            libs: {
                files: "app/script/libs/**/*",
                tasks: ["copy:libs"]
            },
            appJs: {
                files: "app/script/*.js",
                tasks: ["copy:appJs"]
            },
            appHtml: {
                files: "app/*.html",
                tasks: ["copy:appHtml"]
            }
        },
        /**
         *  清理目录
         */
        clean: {
            dev:['<%= config.folder %>'],
            not:[
                    '<%= config.folder %>/assets/less',
                    '<%= config.folder %>/script/base',
                    '<%= config.folder %>/script/component'
                ]
        }
    });
    /**
     * 开发模式
     */
    grunt.registerTask('default', function () {
        grunt.task.run(['clean:dev', 'less:dev', 'copy:dev', 'connect:server', 'watch']);
    });

    /**
     * 打包上线
     */
    grunt.registerTask('release', function () {
        grunt.task.run(['clean:dev', 'requirejs', 'less:dev', 'autoprefixer:dev', 'cssmin:dev', 'clean:not']);
    });
}
