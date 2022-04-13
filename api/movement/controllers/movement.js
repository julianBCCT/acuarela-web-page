"use strict";
const paypal = require("paypal-rest-sdk");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const { response } = ctx.request.body;
    //return ctx.send(response);
    console.log(response);
    let entity = await strapi.query("movement").model.find();

    if (!entity)
      return ctx.send({
        ok: true,
        status: 200,
        code: 0,
        msg: "Groups not found.",
      });
    else {
      response.msg = "Query completed successfully!";
      response.response = entity;
      return ctx.send(response);
    }
  },

  /** -------------------------------------------------PAYPAL----------------------------------------------------- */
  // Configura la información del cliente para que reciba el pago
  async configure(ctx) {
    const { mode, client_id, client_secret } = ctx.request.body;

    paypal.configure({
      mode: mode || process.env.PAYPAL_MODE, //sandbox or live
      client_id: client_id || process.env.CLIENT_ID,
      client_secret: client_secret || process.env.CLIENT_SECRET,
    });

    return ctx.send({ ok: true });
  },
  // Se usa el billingAgreementId de un acuerdo de pago creado para cancelar la suscribción
  async cancel_aggrement(ctx) {
    //console.log(req.body);
    var billingAgreementId = ctx.request.body.plan;

    var cancel_note = {
      note: "Canceling the agreement",
    };

    paypal.billingAgreement.cancel(
      billingAgreementId,
      cancel_note,
      function (error, response) {
        if (error) {
          console.log(error);
          throw error;
        } else {
          console.log("Cancel Billing Agreement Response");
          console.log(response);

          paypal.billingAgreement.get(
            billingAgreementId,
            function (error, billingAgreement) {
              if (error) {
                console.log(error.response);
                throw error;
              } else {
                console.log(billingAgreement.state);
                return ctx.send("Subscription Canceled.");
              }
            }
          );
        }
      }
    );
  },

  // Se inicia el proceso para crear un suscribción
  // currency = divisa de la suscribción
  // frecuency = frecuencia con la que se realizará el cobro
  // value = valor de la suscribción que se cobrara según la frecuencoa fijada
  async create_aggrement(ctx) {
    var { currency, frecuency, value } = ctx.request.body;
    // Configura describciones de la suscribción
    // cancel_url -> dirección a la que redirije al usuario en caso de que este no complete el proceso de suscribción
    // return_url -> dirección a la que redirije al usuario cuando completa la suscribición de forma exitosa
    let billingPlanAttributes = {
      description: " Add about subscription details.",
      merchant_preferences: {
        auto_bill_amount: "yes",
        cancel_url: "http://localhost:3000/cancel",
        initial_fail_amount_action: "continue",
        max_fail_attempts: "1",
        return_url: "http://localhost:3000/success",
      },
      name: "Paypal Agreement",
      payment_definitions: [
        {
          amount: {
            currency: currency,
            value: value,
          },
          charge_models: [],
          cycles: "0",
          frequency: frecuency,
          frequency_interval: 1,
          name: "Regular Payments",
          type: "REGULAR",
        },
      ],
      type: "INFINITE",
    };

    // Create the billing plan
    paypal.billingPlan.create(
      billingPlanAttributes,
      function (error, billingPlan) {
        if (error) {
          console.log(error);
          throw error;
        } else {
          console.log("Create Billing Plan Response");
          console.log(billingPlan);

          let billingPlanUpdateAttributes = [
            {
              op: "replace",
              path: "/",
              value: {
                state: "ACTIVE",
              },
            },
          ];

          // Activate the plan by changing status to Active
          paypal.billingPlan.update(
            billingPlan.id,
            billingPlanUpdateAttributes,
            function (error, response) {
              if (error) {
                console.log(error);
                throw error;
              } else {
                console.log(
                  "Billing Plan state changed to " + billingPlan.state
                );
                //billingAgreementAttributes.plan.id = billingPlan.id;
                // Se añada seis horas para que la direción del server vs la hora de la persona coincidan
                // Si el usuario está en otra ubicación quizá el tiempo a agregar sea mayor o menor
                let startDate =
                  Moment(new Date())
                    .add(6, "hour")
                    .format("gggg-MM-DDTHH:mm:ss") + "Z";

                let billingAgreementAttributes = {
                  name: "Name of Payment Agreement",
                  description: "Description of  your payment  agreement",
                  start_date: startDate,
                  plan: {
                    id: billingPlan.id,
                  },
                  payer: {
                    payment_method: "paypal",
                  },
                };

                // Use activated billing plan to create agreement
                paypal.billingAgreement.create(
                  billingAgreementAttributes,
                  function (error, billingAgreement) {
                    if (error) {
                      console.log(error);
                      throw error;
                    } else {
                      console.log("Create Billing Agreement Response");
                      console.log(billingAgreement);
                      for (
                        var index = 0;
                        index < billingAgreement.links.length;
                        index++
                      ) {
                        if (
                          billingAgreement.links[index].rel === "approval_url"
                        ) {
                          var approval_url = billingAgreement.links[index].href;

                          console.log(
                            "For approving subscription via Paypal, first redirect user to"
                          );
                          console.log(approval_url);
                          // La url de la respuesta redirige a la pagina de PayPal que se encargará de completar la suscribción según la parametros fijados
                          // en caso de que se complete exitosamenten, o no, está rederige al usuario a las urls que también se configuraron.
                          return ctx.send({ ok: true, url: approval_url });
                        }
                      }
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  },
  // Al llegar a la dirección en la cual la suscrbición se completa de forma exitosa se debe hacer una petición a este endpoint
  async success_aggrement(ctx) {
    const token = ctx.query.token;
    console.log(ctx.query);

    paypal.billingAgreement.execute(token, function (error, billingAgreement) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(billingAgreement));
        let { organization, id } = ctx.request.body.response.user;
        strapi.services.movement.create({
          paypal: JSON.stringify(billingAgreement),
          daycare: organization,
          payer: id,
          category: "60b0ed8db83e2f4588f879a1",
          extra_info: "Creación de suscribción de PayPal.",
        });
        return ctx.send("Success");
      }
    });
  },
  // Este endpoint está suscrito a un webhook de PayPal y recibira la información respecto a acciones que se ejecuten a una suscibcióm
  // por ejempleo que no se realice el pago por fondo insuficiente o se cancele la suscribción.
  async getAndVerify(ctx) {
    console.log(req.body);
    var eventBody = ctx.request.body.eventBody;

    paypal.notification.webhookEvent.getAndVerify(
      eventBody,
      function (error, response) {
        if (error) {
          console.log(error);
          throw error;
        } else {
          console.log(response);
          /*
        let { organization, id } = ctx.request.body.response.user;
        strapi.services.movement.create({ paypal: response, daycare: organization, payer: id, category: '60b0ed8db83e2f4588f879a1', extra_info: 'Estado de suscribción de PayPal.' });
        */
          strapi.services.movement.create({ paypal: response });
          ctx.send(response);
        }
      }
    );
  },
};
