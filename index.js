const terminalLink = require('terminal-link');
const classes = require('./classes.json');
var periods = [];
var times = [];
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
    var noSchool = [0, 6];
    var monday = [1];
    var other = [2, 3, 4, 5];
    d = new Date();
    var day = d.getDay();
    if (noSchool.includes(day)) res(console.log('No School Today'));
    if (monday.includes(day)) {
      for (let i = 1; i < 10; i++) {
        times.push(classes.time.monday[i]);
        if (i == 9) res();
      }
    }
    if (other.includes(day)) {
      for (let i = 1; i < 10; i++) {
        times.push(classes.time.tuesday_friday[i]);
        if (i == 9) res();
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
    for (var i = 0; i < 10; i++) {
      if (times[i] == time) {
        var link = terminalLink(classes[i][0], classes[i][1]);
        var toSend = 'Your Current Period is ' + link;
        console.log(toSend);
      }
    }
  }
}

start();
