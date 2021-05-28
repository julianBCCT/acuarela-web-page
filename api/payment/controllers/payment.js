'use strict';
const paypal = require('paypal-rest-sdk');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async configure(ctx) {
    const { mode, client_id, client_secret } = ctx.params;
    
    paypal.configure({
      'mode': mode || process.env.PAYPAL_MODE, //sandbox or live
      'client_id': client_id || process.env.CLIENT_ID,
      'client_secret': client_secret || process.env.CLIENT_SECRET
    });

    return ctx.send({ ok: true });
  },
  async cancel_aggrement(ctx) {
    console.log(req.body);
    var billingAgreementId = ctx.request.body.plan;

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
            return ctx.send('Subscription Canceled.');
          }
        });
      }
    });
  },
  
  async create_aggrement(ctx) {
    var { currency, value, frecuency } = ctx.request.body;
    
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

    // Create the billing plan
    paypal.billingPlan.create(billingPlanAttributes, function (error, billingPlan) {
      if (error) {
        console.log(error);
        throw error;
      } else {
        console.log('Create Billing Plan Response');
        console.log(billingPlan);
  
        let billingPlanUpdateAttributes = [
          {
            'op': 'replace',
            'path': '/',
            'value': {
              'state': 'ACTIVE'
            }
          }
        ];
        
        // Activate the plan by changing status to Active
        paypal.billingPlan.update(billingPlan.id, billingPlanUpdateAttributes, function (error, response) {
          if (error) {
            console.log(error);
            throw error;
          } else {
            console.log('Billing Plan state changed to ' + billingPlan.state);
            //billingAgreementAttributes.plan.id = billingPlan.id;
            
            let startDate = Moment(new Date()).add(6, 'hour').format('gggg-MM-DDTHH:mm:ss')+'Z';
  
            let billingAgreementAttributes = {
              'name': 'Name of Payment Agreement',
              'description': 'Description of  your payment  agreement',
              'start_date': startDate,
              'plan': {
                'id': billingPlan.id
              },
              'payer': {
                'payment_method': 'paypal'
              }
            };
  
            // Use activated billing plan to create agreement
            paypal.billingAgreement.create(billingAgreementAttributes, function (error, billingAgreement) {
              if (error) {
                console.log(error);
                throw error;
              } else {
                console.log('Create Billing Agreement Response');
                console.log(billingAgreement);
                for (var index = 0; index < billingAgreement.links.length; index++) {
                  if (billingAgreement.links[index].rel === 'approval_url') {
                    var approval_url = billingAgreement.links[index].href;
  
                    console.log('For approving subscription via Paypal, first redirect user to');
                    console.log(approval_url);
  
                    return ctx.send({ ok: true, url: approval_url});
                  }
                }
              }
            });
          }
        });
          
      }
    });
  },

  async success_agreement(ctx) {
    const token = ctx.query.token;
    console.log(ctx.query);
  
    paypal.billingAgreement.execute(token, function (error, billingAgreement) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(billingAgreement));
        return ctx.send('Success');
      }
    });
  },

  async getAndVerify(ctx) {
    console.log(req.body);
    var eventBody = ctx.request.body.eventBody;
  
    paypal.notification.webhookEvent.getAndVerify(eventBody, function (error, response) {
      if (error) {
        console.log(error);
        throw error;
      } else {
        console.log(response);
        ctx.send(response);
      }
    });
  }
};
