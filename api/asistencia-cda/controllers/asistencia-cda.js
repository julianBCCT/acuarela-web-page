"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const moment = require("moment");

module.exports = {
  async createMultipleAsistencias(ctx) {
    const { participants, fecha } = ctx.request.body;

    let AllParticipants = participants.map((participant) => {
      let {
        signedinUser: { displayName },
      } = participant;
      return displayName;
    });
    let date = participants.map((participant) => participant.earliestStartTime);
    let formatDate = moment(date).format("YYYY-MM-DD");
    // const entity = await strapi.services.acuarelauser.findOne({ id });
    return { AllParticipants, formatDate, date };
  },
};
