(function( window ) {
    'use strict';
    var SERVER_URL = 'http://localhost:3002/';
    var FORM_SELECTOR = '[data-topic-post="form"]';
    var TOPICLIST_SELECTOR = '[data-topic-post="topiclist"]';
    var App = window.App;
    var Course = App.Course;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var TopicList = App.TopicList;
    var remoteDS = new RemoteDataStore(SERVER_URL.concat('CPSC-473'));
    var remoteDS2 = new RemoteDataStore(SERVER_URL.concat('CPSC-120'));
    var myCourse = new Course('CPSC-473', remoteDS);
    var myCourse2 = new Course('CPSC-120', remoteDS2);
    window.myCourse = myCourse;

    var formHandler = new FormHandler(FORM_SELECTOR);
    var topicList = new TopicList(TOPICLIST_SELECTOR);

    formHandler.addSubmitHandler(function(data) {
        /*return myCourse.createTopic.call(myCourse, data)
        .then(function() {
            topicList.addTopic.call(topicList, data);
        });*/
        if (data['className'] == 'CPSC-473') {
            return myCourse.createTopic.call(myCourse, data)
            .then(function() {
                topicList.addTopic.call(topicList, data);
            });
        }
        else {
            return myCourse2.createTopic.call(myCourse2, data)
            .then(function() {
                topicList.addTopic.call(topicList, data);
            });
        }
    });





})(window);
