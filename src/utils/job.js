const cron = require("node-cron");
const sender = require("../config/email-config");
const emailService = require("../services/email-service");

/**
 * 10:00 am
 * Every 5 mins
 * We will check are their pending emails which was expected to be sent by now and is pending
 */

const setupJobs = () => {
  cron.schedule("*/1 * * * *", async () => {
    try {
      const response = await emailService.fetchPendingEmails();
      response.forEach((email) => {
        sender.sendMail(
          {
            to: email.recepientEmail,
            subject: email.subject,
            text: email.content,
          },
          async (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
              await emailService.updateTicket(email.id, { status: "SUCCESS" });
            }
          }
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  });
};

module.exports = setupJobs;
