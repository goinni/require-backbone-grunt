define(['text!component/home/index.html'], function (tpl) {

    var view = Backbone.View.extend({
        el: '#container',

        events: {
        },

        initialize: function () {
            this.$el.off();
            this.render();
            this.model.on('change', this.render, this); 
        },

        render: function () {
            this.$el.html(_.template(tpl, {model: this.model}));    
        }
    });

    return view;
});