$("#demoForm").validate({
  ignore: "",
  rules: {
    name: "required",
    lastname: "required",
    state: "required",
    licence: "required",
    phone: {
      digits: true,
    },
    email: { required: true, email: true },
    daycare_name: { required: true },
    country: { required: true },
    city: { required: true },
    password: "required",
    repeat_password: { required: true, equalTo: "#password" },
  },
  messages: {
    name: "Nombre obligatorio.",
    lastname: "Apellido obligatorio.",
    state: "Estado obligatorio.",
    licence: "Número licencia obligatorio.",
    phone: "Número telefónico obligatorio.",
    email: { required: "Correo obligatorio.", email: "Correo no valido." },
    daycare_name: { required: "Daycare obligatorio." },
    country: { required: "País obligatorio." },
    city: { required: "Ciudad obligatoria." },
    password: "Contraseña obligatoria.",
    repeat_password: {
      required: "Confirmar contraseña obligatorio.",
      equalTo: "Las contraseñas no coinciden.",
    },
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
    $("#demoForm button").attr("disabled", true);
    $("#demoForm button").text("Enviando...");
    $("#demoForm").ajaxSubmit({
      dataType: "json",
      success: function (data) {
        if (data.message == 1) {
          console.log(data);
          console.log("Enviado");
          form.reset();
          setTimeout(() => {
            $("#demoForm").fadeOut();
            $(".contact__success").fadeIn();
          }, 500);
        }
      },
    });
  },
});
