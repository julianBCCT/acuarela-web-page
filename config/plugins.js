require('strapi-provider-email-mcmandrill');

module.exports = ({ env }) => ({
  // ...
  email: {
    provider: 'mcmandrill',
    providerOptions: {
      mandrill_api_key: env('MAILCHIMP_KEY'),
      mandrill_default_from_name: 'Acuarela',
      mandrill_default_from_email: 'from@domain.com',
      mandrill_subaccount: 'your subaccount name',
    },
  },
  // ...
});