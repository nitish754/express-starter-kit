const { RESET_PASSWORD_CONST } = require('../../Modules/auth/authConfig');
const {sendRestPasswordLinkJob} = require('../queueJobs');
const { Mail } = require('../../services/MailGunEmailService');

sendRestPasswordLinkJob.process(async (job) => {
    const { to, subject, templatePath, context } = job.data;

    const emailService = Mail.CreateEmail();
    await emailService.sendTemplateEmail(
        RESET_PASSWORD_CONST.FROM_EMAIL,
        to,
        subject,
        templatePath,
        context
    );

    console.log(`Email sent to ${to}`);
});

