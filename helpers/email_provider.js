const Filter = require('bad-words');
const filter = new Filter();
const mailchimp = require('mailchimp_transactional')(
  process.env.MAILCHIMP_KEY
);

async function send_email(to, from, replyTo, msg, subject) {
  
  const message = {
    from_email: from,
    subject: subject,
    
    text: `Enlace de invitacion ${msg}`,
    to: [
      {
        email: to,
        type: 'to'
      }
    ]
  };
  
  const response = await mailchimp.messages.send({ message });
  console.log(response);
  if (response[0].status === 'sent')
    return { ok: true, status: 200, code: 0, msg: 'Email Send Succesfully.' };
  else {
    return { ok: false, status: 500, code: 1, msg: `Something wrong with the email:\n ${response[0].reject_reason}` };
  }
}

module.exports = {
  send_email: send_email
};