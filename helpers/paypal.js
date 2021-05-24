const paypal = require('paypal-rest-sdk');

const paypal_configuration = (mode, client_id, client_secret) => {
  paypal.configure({
    'mode': mode || process.env.PAYPAL_MODE, //sandbox or live
    'client_id': client_id || process.env.CLIENT_ID,
    'client_secret': client_secret || process.env.CLIENT_SECRET
  });
};

const aggrement = (billingAgreementId) => {

  var cancel_note = {
    'note': 'Canceling the agreement'
  };

  paypal.billingAgreement.cancel(billingAgreementId, cancel_note, function (error, response) {
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log('Cancel Billing Agreement Response');
      console.log(response);

      paypal.billingAgreement.get(billingAgreementId, function (error, billingAgreement) {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          console.log(billingAgreement.state);
          return ('Subscription Canceled.');
        }
      });
    }
  });
  //P-2W420695H9159143SDKRATQQ
};

const billingAttributes = (currency, value, frecuency) => {
  let billingPlanAttributes = {
    'description': ' Add about subscription details.',
    'merchant_preferences': {
      'auto_bill_amount': 'yes',
      'cancel_url': 'http://localhost:3000/cancel',
      'initial_fail_amount_action': 'continue',
      'max_fail_attempts': '1',
      'return_url': 'http://localhost:3000/success'
    },
    'name': 'Paypal Agreement',
    'payment_definitions': [
      {
        'amount': {
          'currency': currency,
          'value': value
        },
        'charge_models': [],
        'cycles': '0',
        'frequency': frecuency,
        'frequency_interval': 1,
        'name': 'Regular Payments',
        'type': 'REGULAR'
      }
    ],
    'type': 'INFINITE'
  };
  return billingPlanAttributes;
};

