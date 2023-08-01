const {v4: uuidv4} = require("uuid")

class Session {
  constructor(tutor, student, duration, courseId, topics, dateOf, timeOf, location, bOnline) {
    this.uuid = uuidv4();
    this.tutor = tutor;
    this.student = student;
    this.duration = duration;
    this.courseId = courseId;
    this.topics = topics;
    this.location = location || (bOnline ? "Virtual Classroom" : "");
    this.bOnline = bOnline;
    this.dateOf = dateOf;
    this.timeOf = timeOf;
    this.status = "pending";
  }
}
module.exports = Session