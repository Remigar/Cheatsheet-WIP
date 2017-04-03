(function(window) {
    'use strict';
    var App = window.App || {};

    function Course(courseID, db) {
        this.courseID = courseID;
        this.db = db;
    }

    Course.prototype.createTopic = function (topic) {
        console.log('Creating topic: ' + topic['topicDesc'] + ' for course ' + this.courseID);
        return this.db.add(topic.emailAddress, topic);
    };

    Course.prototype.removeTopic = function (emailAddress) {
        console.log('Removing topic created by '.concat(emailAddress));
        return this.db.remove(emailAddress);
    };

    Course.prototype.printTopics = function (printFn) {
        return this.db.getAll()
          .then(function(orders) {
              var topicIdArray = Object.keys(orders);
              console.log('Course ' + this.courseID + ' has topics:');
              topicIdArray.forEach(function(id) {
                  console.log(orders[id]);
                  if (printFn) {
                      printFn(orders[id]);
                  }
              }.bind(this));
          }.bind(this));
    };

    App.Course = Course;
    window.App = App;


})(window);
