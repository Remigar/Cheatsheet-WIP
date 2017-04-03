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

        /*var $likeCount = $('<label for="likelabel"></label>');
        $likeCount.text(topic['likes']);
        var $dislikeCount = $('<label> for="dislikelabel"</label>');
        $dislikeCount.text(topic['dislikes']);*/
        var voteTotal = parseInt(topic['likes']) - parseInt(topic['dislikes']);
        console.log(voteTotal);
        var $topicScore = $('<label for="scoreLabel"></label>');
        $topicScore.text(voteTotal.toString());

        var description = topic['topicDesc'];

        var $likeButton = $('<input type="button" class="likeBtn" value="1" name="likeBtn" id="likeBtn"/>');
        var $dislikeButton = $('<input type="button" class = "dislikeBtn" value="1" name="dislikeBtn" id="dislikeBtn"');
        //give these like buttons a unique id


        $label.append(description);
        $div.append($label);
        $div.append($likeButton);
        $div.append($dislikeButton);
        this.$element = $div;
    }

    App.TopicList = TopicList;
    window.App = App;
})(window);
