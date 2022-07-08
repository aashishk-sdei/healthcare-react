/*
 * @file: index.js
 * @description: It Contain environment variables.
 * @date: 01.07.2020
 * @author: Dixit
 */

const local = {
  apiUrl: "http://localhost:",
  encryptionkey: "He@lth!ex@dm!n"
};

const production = {
  apiUrl: "http://54.219.221.224:",
  encryptionkey: "He@lth!ex@dm!n"
};

console.log("process.env.REACT_APP_ENV :", process.env.REACT_APP_ENV);

if (process.env.REACT_APP_ENV === "prod") module.exports = production;
else if (process.env.REACT_APP_ENV === "dev") module.exports = local;
else module.exports = production;
