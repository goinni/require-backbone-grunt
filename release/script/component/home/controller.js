define([
	'base/tool',
    'component/home/view',
    'component/home/model'
], function (tool, View, Model) {
    var controller = function () {
    	// alert(123);
    	var model = new Model();
        new View({model: model});

        model.fetch();

    };

    return controller;
});