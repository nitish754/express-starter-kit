const { EmailProvider } = require("../config/email");
const { MailGunEmailService } = require("./MailGunEmailService");

const EmailServiceType = {
  MAILGUN: "mailgun",
  // Add more services if needed
};

class Mail {
  static type = EmailProvider.default;

  static CreateEmail() {
    switch (this.type) {
      case EmailServiceType.MAILGUN:
        return new MailGunEmailService(
          EmailProvider.drivers.mailgun.api_key,
          EmailProvider.drivers.mailgun.domain
        );
    }
  }
}

module.exports = { Mail, EmailServiceType };