(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if(!selector) {
            throw new Error('no selector provided');
        }
        this.$formElement = $(selector);
        if(this.$formElement.length === 0) {
            throw new Error('could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function (fn) {
        console.log('setting topic submission handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });

            console.log(data);
            fn(data)
            .then(function() {
                this.reset();

            }.bind(this));
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;


})(window);
