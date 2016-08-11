define(function () {

    /**
     * 工具类
     */
    return {
        /**
         * 缓存当前路由
         * @param name 路由名
         * @param param 路由参数
         */
        route:{
            name:'',
            param:[]
        },
        /**
         * 此方法可以将同级其它元素设置为非激活样式，当前元素设置为激活样式 ［ active ］
         * @param dom jquery selector
         */
        setNavActive: function(dom){
            var el = dom;
            if(typeof dom === 'string') el = $(dom);
            el.siblings().removeClass('active').end().addClass('active');
        },
        /** 
         * 异步请求
         * @param uri urls中的地址信息对象
         * @param opt.type 请求方法 GET 或 POST 缺省值为GET
         * @param opt.rest rest写法时使用，key <--> value
         * @param opt.url 请求地址
         * @param opt.success 请求成功后回调 
         */
        ajax: function(uri, opt){
            var rest = opt.rest;
            var url = (localStorage.isDeveloper=="true" ? uri.develop: uri.online);
            var success = opt.success;
            // 有rest对象 并且 url中有rest信息
            if(rest && /{?}/.test(url)){
                for(var key in rest){
                    url = url.replace('{'+key+'}', rest[key]);
                }
            }
            $.ajax({
               type: opt.type || "GET",
               url: url,
               data: opt.data,
               success: function(res){
                    success && success.call(this, res);
               }
            });
        }
    }
});