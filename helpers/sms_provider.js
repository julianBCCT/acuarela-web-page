
function send_sms(to, msg) {
  // send token { number, code }
  return { ok: true, status: 200, code: 0, msg: 'SMS Send Succesfully.' };
}

module.exports = {
  send_sms: send_sms
};