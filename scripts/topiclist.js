(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function TopicList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('No elements with selector: ' + selector);
        }
    }

    TopicList.prototype.addTopic = function (topic) {
        this.removeTopic(topic.emailAddress);
        var rowElement = new Row(topic);
        this.$element.append(rowElement.$element);
    };

    TopicList.prototype.removeTopic = function (email) {
        this.$element
            .find('[value="' + email + '"]')
            .closest('[data-topic-post="topiclist"]')
            .remove();
    };

    function Row(topic) {
        //note: gotta add up/down vote buttons
        var $div = $('<div></div>', {
            'data-topic-post': 'topiclist',
            'class': 'topiclist'
        });

        var $label = $('<label></label>');

        //vote buttons

        var description = topic.description;

        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }

    App.TopicList = TopicList;
    window.App = App;
})(window);
