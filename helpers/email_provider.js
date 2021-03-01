const Filter = require('bad-words');
const filter = new Filter();

function send_email(to, from, replyTo, msg, subject) {
  // send token { email, code }
  // return { ok: true, status: 200, code: 0, msg: 'Mail Send Succesfully.' };

  // check if the comment content contains a bad word
  /*
    if (msg !== filter.clean(msg)) {
      // send an email by using the email plugin
      await strapi.plugins['email'].services.email.send({
        to,
        from,
        subject,
        text: `
          The comment #${5} contain a bad words.

          Comment:
          ${msg}
        `,
      });
    }
  */
  return { ok: true, status: 200, code: 0, msg: 'Mail Send Succesfully.' };
}

module.exports = {
  send_email: send_email
};