const EmailProvider = {
  default: "mailgun",
  drivers: {
    mailgun: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
      from_email: process.env.MAILGUN_FROM_EMAIL,
      from_name: process.env.MAIL_FROM_NAME || "",
    },
  },
};

module.exports = { EmailProvider };