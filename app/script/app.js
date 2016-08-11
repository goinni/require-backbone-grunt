(function(){
	requirejs.config({

		//baseUrl 为加载文件的默认路径 
		//不写默认路径用grunt打包的时候很容易报错找不到文件
		baseUrl : './script',
		paths : {

			//此处一般加载项目依赖包(js)
			//有了baseUrl 所以此地方的路径就代表 项目根路径下的 script/lib/jquery.js
			//同为js文件的话.js可以省略
			jquery: 'libs/jquery/jquery.min',
	        underscore: 'libs/underscore/underscore-min',
	        backbone: 'libs/backbone/backbone-min',
	        text: 'libs/text/text' 
		},
		shim : {

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
		}
	});

	//上面为 配置requirjs 是个config,真正加载文件从这requiejs()函数开始
	//内一般都是放的 整个项目的依赖包比如 jquery等
	require([
		'backbone', 
		'underscore', 
		'base/router'
		// ,'component/home/controller'   //grunt release 要把它打开，否则不能把所有的模块打包到一起，暂时无没有解决办，如果要谁有，告诉我3Q
		], function(){
			
	    Backbone.history.start();   //开始监控url变化
	});
})();