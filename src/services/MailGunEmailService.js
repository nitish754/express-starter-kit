const mailgun = require("mailgun-js");
const fs = require("fs");
const handlebars = require("handlebars");
const { EmailProvider } = require("../config/email");

class MailGunEmailService {
  constructor(apiKey, domain) {
    this.mailgun = mailgun({ apiKey, domain });
  }

  async sendEmail(from, to, subject, html, attachment, filename) {
    return new Promise((resolve, reject) => {
      const toEmails = Array.isArray(to) ? to.join(", ") : to;
      const data = { from, to: toEmails, subject, html };

      if (attachment) {
        data.attachment = new this.mailgun.Attachment({ data: attachment, filename });
      }

      this.mailgun.messages().send(data, (error, body) => {
        if (error) {
          console.error("Error in sending email:", error);
          reject(false);
        } else {
          console.log("Email Sent:", body);
          resolve(true);
        }
      });
    });
  }

  async sendEmailWithMultipleAttachment(from, to, subject, html, attachments) {
    return new Promise((resolve, reject) => {
      const toEmails = Array.isArray(to) ? to.join(", ") : to;
      const data = { from, to: toEmails, subject, html };

      if (attachments && attachments.length > 0) {
        data.attachment = attachments.map(attachment => new this.mailgun.Attachment({
          data: attachment.content,
          filename: attachment.filename
        }));
      }

      this.mailgun.messages().send(data, (error, body) => {
        if (error) {
          console.error("Error in sending email:", error);
          reject(false);
        } else {
          console.log("Email Sent:", body);
          resolve(true);
        }
      });
    });
  }

  /**
   * Send email using a template
   * @param {string} from - Sender email
   * @param {string | string[]} to - Recipient email(s)
   * @param {string} subject - Email subject
   * @param {string} templateName - Template file name (without extension)
   * @param {Object} context - Data for template rendering
   * @param {Array} attachments - Optional attachments
   * @returns {Promise<boolean>}
   */
  async sendTemplateEmail(from, to, subject, templatePath, context = {}, attachments = []) {
    return new Promise((resolve, reject) => {
      // const templatePath = templateName

      // Read template file
      fs.readFile(templatePath, "utf8", (err, templateData) => {
        if (err) {
          console.error("Error loading email template:", err);
          return reject(false);
        }

        // Compile template with Handlebars
        const template = handlebars.compile(templateData);
        const html = template(context);

        const toEmails = Array.isArray(to) ? to.join(", ") : to;
        const data = { from, to: toEmails, subject, html };

        // Add attachments if available
        if (attachments.length > 0) {
          data.attachment = attachments.map(att => new this.mailgun.Attachment({
            data: att.content,
            filename: att.filename,
          }));
        }

        this.mailgun.messages().send(data, (error, body) => {
          if (error) {
            console.error("Error in sending template email:", error);
            reject(false);
          } else {
            console.log("Template Email Sent:", body);
            resolve(true);
          }
        });
      });
    });
  }
}

const EmailServiceType = { MAILGUN: "mailgun" };

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

module.exports = { Mail };
