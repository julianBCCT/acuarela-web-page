// $( document ).ready() {
//     console.log("READY")
// };

// General toggle
function toggleTarget(target) {
  $("[data-toggle='" + target + "']").toggleClass("active");
}

// Accordion
function toggleAccordion(target) {
  $("[data-toggle='" + target + "']")
    .siblings()
    .removeClass("active");
  $("[data-toggle='" + target + "']")
    .siblings()
    .find(".content")
    .slideUp();

  $("[data-toggle='" + target + "']").toggleClass("active");
  $("[data-toggle='" + target + "']")
    .find(".content")
    .slideToggle();
}

$("#contact__form").validate({
  ignore: "",
  rules: {
    name: "required",
    phone: {
      digits: true,
    },
    email: { required: true, email: true },
    daycare_name: { required: true },
    country: { required: true },
    city: { required: true },
  },
  messages: {
    name: "Nombre obligatorio.",
    phone: "Número telefónico obligatorio.",
    email: { required: "Correo obligatorio.", email: "Correo no valido." },
    daycare_name: { required: "Daycare obligatorio." },
    country: { required: "País obligatorio." },
    city: { required: "Ciudad obligatoria." },
  },
  highlight: function (element) {
    $(element).addClass("error");
    $(element).parent("div").addClass("error");
  },
  unhighlight: function (element) {
    $(element).removeClass("error").addClass("success");
    $(element).parent("div").removeClass("error").addClass("success");
  },
  submitHandler: function (form) {
    $("#contact__form button").attr("disabled", true);
    $("#contact__form button").text("Enviando");
    $("#contact__form").ajaxSubmit({
      dataType: "json",
      success: function (data) {
        console.log(data);
        console.log("Encviado");
      },
    });
    setTimeout(() => {
      $("#contact__form").fadeOut();
      $(".contact__texts").hide();
      $(".contact__success").fadeIn();
    }, 500);
  },
});
