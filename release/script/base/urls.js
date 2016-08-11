define(function () {

    /**
     * URL工具类
     * REST写法 在URL中使用｛name｝进行占位, 
     * (在请求中需要传入rest对象，使程序自动识别进行匹配  例｛name:xx｝)
     */
    return {
        about:{
            develop: "/mockdata/about.{id}.json",
            online: ""
        }
    }
});