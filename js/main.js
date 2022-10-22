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
        TrackDemo(data.info);
      },
    });
    setTimeout(() => {
      $("#contact__form").fadeOut();
      $(".contact__texts").hide();
      $(".contact__success").fadeIn();
    }, 500);
  },
});

function trackDownload(OS) {
  fbq("track", "StartTrial", {
    test_event_code: "TEST8078",
  });
}

function InitiateCheckout(period, price) {
  fbq("track", "InitiateCheckout", {
    value: price,
    currency: "USD",
    period,
  });
}

function TrackDemo({ name, email, daycare, phone, city }) {
  fbq("track", "Lead", {
    name,
    email,
    daycare,
    phone,
    city,
  });
}

document.querySelector("#western-new-york").addEventListener("click", () => {
  setCondado("Western New York");
});
document.querySelector("#finger-lakes").addEventListener("click", () => {
  setCondado("Finger Lakes");
});
document.querySelector("#southern-tier").addEventListener("click", () => {
  setCondado("Southern Tier");
});
document.querySelector("#central-new-york").addEventListener("click", () => {
  setCondado("Central New York");
});
document.querySelector("#north-country").addEventListener("click", () => {
  setCondado("North Country");
});
document.querySelector("#capital-region").addEventListener("click", () => {
  setCondado("Capital Region");
});
document.querySelector("#mohawk-valley").addEventListener("click", () => {
  setCondado("Mohawk Valley");
});
document.querySelector("#hudson-valley").addEventListener("click", () => {
  setCondado("Hudson Valley");
});
document.querySelector("#new-york-city").addEventListener("click", () => {
  setCondado("New York City");
});
document.querySelector("#long-island").addEventListener("click", () => {
  setCondado("Long Island");
});

function setCondado(name) {
  Fancybox.show([{ src: "#dialog-content", type: "inline" }], {
    on: {
      done: (fancybox, slide) => {
        document.querySelector("#condado").value = name;
        doneBox();
      },
    },
  });
}

function openInvitationForm() {
  Fancybox.show([{ src: "#dialog-content", type: "inline" }], {
    on: {
      done: (fancybox, slide) => {
        doneBox();
      },
    },
  });
}

function doneBox() {
  $("#invitationForm").validate({
    ignore: "",
    rules: {
      name: { required: true },
      daycare: { required: true },
      licencia: { required: true },
      condado: { required: true },
      email: { required: true, email: true },
      phone: {
        required: true,
      },
    },
    messages: {
      name: { required: "Nombre obligatorio." },
      daycare: { required: "Daycare obligatorio." },
      licencia: { required: "Licencia obligatoria." },
      condado: { required: "Condado obligatorio." },
      email: {
        required: "Correo obligatorio.",
        email: "Correo no valido.",
      },
      phone: {
        required: "No es un número telefónico.",
      },
    },
    submitHandler: function (form) {
      $("#invitationForm button").attr("disabled", true);
      $("#invitationForm button").text("Enviando");
      $("#invitationForm").ajaxSubmit({
        dataType: "json",
        success: function (data) {
          console.log(data);
        },
      });
      setTimeout(() => {
        $(".formLanding .form").fadeOut();
        $(".formLanding .success").fadeIn();
      }, 500);
    },
  });
}

function unMutedVideo() {
  const video = document.querySelector(".home-banner #video1");
  if (video.muted === true) {
    document.querySelector("#unmutedBtn img").src = "img/volOn.svg";
    video.muted = false;
  } else if (video.muted === false) {
    document.querySelector("#unmutedBtn img").src = "img/volOff.svg";
    video.muted = true;
  }
}
