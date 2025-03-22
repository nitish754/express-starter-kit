const EmailProvider = {
  default: "mailgun",
  drivers: {
    mailgun: {
      api_key: "key-de4582feecd40bce619439a152ce7d23",
      domain: "mailing.webfirminfotech.com",
      from_email: "Info@newcastleschooluk.com",
      from_name: process.env.MAIL_FROM_NAME || "HRMS-AI",
    },
  },
};

module.exports = { EmailProvider };