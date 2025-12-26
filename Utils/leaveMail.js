const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const leaveMail = async ({ to, subject, html }) => {
    return transporter.leaveMail({
        from: `"iTWINE-Vijay" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html
    });
};

module.exports = leaveMail;
