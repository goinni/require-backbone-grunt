define([
    'base/tool', 
    'base/urls'
],function (tool, urls) {
    var model = Backbone.Model.extend({

        defaults: function () {
            return {
                content: ""
            };
        },
        fetch: function (id, callback) {
            var _this = this;
        }

    });

    return model;
});