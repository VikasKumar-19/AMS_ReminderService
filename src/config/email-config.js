const nodemailer = require("nodemailer");
const { EMAIL_ID, EMAIL_PASS } = require("./server-config");

const sender = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_ID,
    password: EMAIL_PASS,
  },
});

module.exports = sender;