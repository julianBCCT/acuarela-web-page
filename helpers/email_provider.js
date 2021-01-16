
function send_email(to, msg, subject) {
  // send token { email, code }
  return { ok: true, status: 200, code: 0, msg: 'Mail Send Succesfully.' };
}

module.exports = {
  send_email: send_email
};