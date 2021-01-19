const terminalLink = require('terminal-link');
const classes = require('./classes.json');
var periods = [];
var times = [];
var totalClasses;

const options = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

function getClasses() {
  return new Promise((res, rej) => {
    for (var i = 1; i < 10; i++) {
      periods.push(classes.classes[i]);
      if (i == 9) res();
    }
  });
}

function getTimes() {
  return new Promise((res, rej) => {
    var noSchool = classes.days.no_school;
    var a_days = classes.days.a_days;
    var b_days = classes.days.b_days;
    d = new Date();
    var day = d.getDay();
    if (noSchool.includes(day)) res(console.log('No School Today'));
    if (a_days.includes(day)) {
      totalClasses = a_days.length;
      for (let i = 1; i <= totalClasses; i++) {
        times.push(classes.time.a_day[i]);
        if (i == totalClasses) res();
      }
    }
    if (b_days.includes(day)) {
      totalClasses = b_days.length;
      for (let i = 1; i <= totalClasses; i++) {
        times.push(classes.time.b_day[i]);
        if (i == totalClasses) res();
      }
    }
  });
}

function start() {
  const date = new Date();
  const time = new Intl.DateTimeFormat('en-US', options).format(date);
  getClasses();
  getTimes();
  getClass(time);
  setTimeout(() => {
    start();
  }, 5000);
}

function getClass(time) {
  if (times.includes(time)) {
    for (var i = 0; i <= totalClasses; i++) {
      if (times[i] == time) {
        var link = terminalLink(periods[i][0], periods[i][1]);
        var toSend = 'Your Current Period is ' + link;
        console.log(toSend);
      }
    }
  }
}

start();
