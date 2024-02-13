const EventEmitter = require('events');
class AppointmentActionEmitter extends EventEmitter { }
module.exports = new AppointmentActionEmitter();