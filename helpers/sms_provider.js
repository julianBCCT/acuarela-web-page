function send_sms(message, to) {
  var https = require('follow-redirects').https;

  number =  to.substring(1);
  var options = {
    'method': 'GET',
    'hostname': 'api.sms.to',
    'path': `/sms/send?api_key=Ecy4KVVyFpqxrqVdFQo8JZ9TXtfVNUPi&to=${number}&message=${message}&sender_id=smsto`,
    'maxRedirects': 20
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on('data', function (chunk) {
      chunks.push(chunk);
    });

    res.on('end', function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on('error', function (error) {
      console.error(error);
    });
  });

  var postData =  `{\n    "message": ${message},\n    "to": ${to},\n    }`;

  req.write(postData);

  req.end();
  // send token { number, code }
  return { ok: true, status: 200, code: 0, msg: 'SMS Send Succesfully.' };
}

module.exports = {
  send_sms: send_sms
};