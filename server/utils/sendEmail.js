const nodemailer = require("nodemailer");

exports.sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP,
    port: 587,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // HTML Email Template
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${options.subject}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          background-color: #007bff;
          color: #ffffff;
          padding: 20px;
          text-align: center;
        }
        .email-header h1 {
          margin: 0;
          font-size: 24px;
        }
        .email-body {
          padding: 20px;
          color: #333333;
          line-height: 1.6;
        }
        .email-footer {
          background-color: #f4f4f4;
          padding: 10px;
          text-align: center;
          font-size: 12px;
          color: #666666;
        }
        .email-footer a {
          color: #007bff;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>${options.subject}</h1>
        </div>
        <div class="email-body">
          ${options.message.replace(/\n/g, "<br>")}
        </div>
        <div class="email-footer">
          <p>Thank you for choosing <a href="${
            process.env.FRONTEND_URL
          }">Chaithanya Tours And Travels</a>.</p>
          <p>If you have any questions, feel free to <a href="mailto:${
            process.env.SMTP_EMAIL
          }">contact us</a>.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: `${options.email}, ${process.env.SMTP_EMAIL}`, // Send email to both user and business email
    subject: options.subject,
    html: htmlTemplate, // Use HTML instead of plain text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Message sent successfully: ${info.messageId}`);
  } catch (error) {
    console.log(`Error sending message: ${error}`);
  }
};
