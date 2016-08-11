define(['base/tool','backbone'], function (tool) {

    var Router = Backbone.Router.extend({

        routes: {
            'home': 'home',
            '*actions': 'defaultAction'
        },
        initialize: function () {
        },
        home: function (argument) {
            require(['component/home/controller'], function (controller) {
                controller();
            });
        },
        defaultAction: function () {
            // console.log('404');
            location.hash = 'home';
        }

    });

    var router = new Router();
    /**
     * 事件解绑和一些清理工作
     * route 路由的名字
     * params 路由传递的参数
     */
    router.on('route', function (route, params) {
        
        //缓存路由信息
        tool.route = {
            name: route,
            param: params
        }

    });

    return router;
});