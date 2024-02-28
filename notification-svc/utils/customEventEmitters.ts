import EventEmitter from 'events'
class ReschedulingPromtEmitter extends EventEmitter { }
export const reschedulingEventEmitter = new ReschedulingPromtEmitter()
class ReminderEmitter extends EventEmitter { }
export const reminderEmitter = new ReminderEmitter