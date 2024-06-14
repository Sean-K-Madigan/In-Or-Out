const express = require('express');
const app = express();

// Logging middleware for logging requests
const reqLog = (req, res, next) => {
console.log(`${new Date().toISOString()} - ${req.method} ${req.url} w/ ${Object.keys(req.body)}`.magenta);
next();
}

module.exports = reqLog



// function formatDate(date) {

//   // Get month, day, year, hours, and minutes
//   var month = date.getMonth() + 1;
//   var day = date.getDate();
//   var year = date.getFullYear() % 100; // Get last two digits of the year
//   var hours = date.getHours();
//   var minutes = date.getMinutes();

//   // Determine AM/PM
//   var period = hours >= 12 ? "PM" : "AM";

//   // Convert hours to 12-hour format
//   hours = hours > 12 ? hours - 12 : hours;
//   hours = hours == 0 ? 12 : hours;

//   // Add leading zeros if needed
//   month = month < 10 ? "0" + month : month;
//   day = day < 10 ? "0" + day : day;
//   hours = hours < 10 ? "0" + hours : hours;
//   minutes = minutes < 10 ? "0" + minutes : minutes;

//   // Construct formatted date string
//   var formattedDate =
//     month + "/" + day + "/" + year + " " + hours + ":" + minutes + " " + period;
//   return formattedDate;
// }

// // Example usage:
// // var currentDate = new Date();
// // console.log(formatDate(currentDate));


module.exports = reqLog
// module.exports = formatDate

