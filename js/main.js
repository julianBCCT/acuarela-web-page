
// $( document ).ready() {
//     console.log("READY")
// };
console.log("main.js cargado bien");


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

// document.querySelector("#western-new-york").addEventListener("click", () => {
//   setCondado("Western New York");
// });
// document.querySelector("#finger-lakes").addEventListener("click", () => {
//   setCondado("Finger Lakes");
// });
// document.querySelector("#southern-tier").addEventListener("click", () => {
//   setCondado("Southern Tier");
// });
// document.querySelector("#central-new-york").addEventListener("click", () => {
//   setCondado("Central New York");
// });
// document.querySelector("#north-country").addEventListener("click", () => {
//   setCondado("North Country");
// });
// document.querySelector("#capital-region").addEventListener("click", () => {
//   setCondado("Capital Region");
// });
// document.querySelector("#mohawk-valley").addEventListener("click", () => {
//   setCondado("Mohawk Valley");
// });
// document.querySelector("#hudson-valley").addEventListener("click", () => {
//   setCondado("Hudson Valley");
// });
// document.querySelector("#new-york-city").addEventListener("click", () => {
//   setCondado("New York City");
// });
// document.querySelector("#long-island").addEventListener("click", () => {
//   setCondado("Long Island");
// });

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
      condado: { required: "Estado obligatorio." },
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


//Parte para manejar la tabla de acuarela lite y pro

let monthlyAcuarela = false;
let acuarelaService = false;

console.log(monthlyAcuarela);

function toggleFrequencyAcuarela() {
  // console.log(monthlyAcuarela);
  console.log("Hola");
  monthlyAcuarela = !monthlyAcuarela;
  document.getElementById("frequencyLabelAcuarela").textContent = monthlyAcuarela
    ? "Mensual"
    : "Anual";
  updateAcuarelaServices();
  // updatePricesIndiUni();
}
getAllAcuarela();

function getAllAcuarela() {
  console.log("Holaaaa");
  if (!acuarelaService) {
    return fetch("/g/getAcuarelaServices/")
      .then((res) => res.json())
      .then((data) => {
        acuarelaService = data;
        console.log("Mostrar acuarela: ", JSON.stringify(data, null, 2));
        return data;
      });
  } else {
    return Promise.resolve(acuarelaService);
  }
}

function updateAcuarelaServices() {
  getAllAcuarela() // Obtener los datos de los currículos
    .then((data) => {
      const tableContainer = document.querySelector(".acuarela-bussines-slide#services");
      tableContainer.innerHTML = ""; // Limpiar la tabla anterior
      let tableHTML = `
      <table>
        <thead>
          <tr>
            <th>Características</th>
      `;

      data.forEach((acuarela) => {
        console.log(acuarela);
        const featuresData = parseFeatures(acuarela.content.rendered);
        console.log("esta es la data: ", featuresData);

        // Seleccionar el precio según el estado de monthlyAcuarela
        const price = monthlyAcuarela
          ? acuarela.acf.precio_mensual
          : acuarela.acf.presio_anual;

        tableHTML += `
          <th class="th-acuarela">${acuarela.title.rendered} <br/> <span>${price}</span></th>
        `;
      });

      tableHTML += `
      </tr>
    </thead>
    <tbody>
  `;

      // Obtener las características únicas de todos los servicios
      const allFeatures = {};

      data.forEach((acuarela) => {
        const featuresData = parseFeatures(acuarela.content.rendered);
        Object.keys(featuresData).forEach((feature) => {
          allFeatures[feature] = true; // Guardar la característica como clave única
        });
      });

      // Construir las filas para cada característica
      Object.keys(allFeatures).forEach((feature) => {
        tableHTML += `
      <tr>
        <td>● ${feature}</td>
    `;

        // Agregar check, "X", o el valor según el servicio
        data.forEach((acuarela) => {
          const featuresData = parseFeatures(acuarela.content.rendered);
          const value = featuresData[feature];
          let displayValue;

          // Determinar qué mostrar según el valor
          if (value === true) {
            displayValue = "✔";
          } else if (value === false) {
            displayValue = "✖";
          } else {
            displayValue = value; // Mostrar valores no booleanos tal cual
          }

          tableHTML += `
        <td style="text-align: center;">
          ${displayValue}
        </td>
      `;
        });

        tableHTML += `</tr>`;
      });

      // Agregar la fila con botones al final de las columnas
      tableHTML += `
      <tr>
        <td style="text-align: center; font-weight: bold;"></td>
    `;
      data.forEach((acuarela) => {
        tableHTML += `
        <td style="text-align: center;">
          
          <button class="btn-acuarela">
            ${acuarela.acf.texto_boton}
          </button>
        </td>
      `;
      });
      tableHTML += `
      </tr>
    </tbody>
  </table>
  `;

      tableContainer.innerHTML = tableHTML; // Agregar la tabla al contenedor
    })
    .catch((error) => {
      console.error("Error al obtener los datos de los currículos:", error);
    });
}

function parseFeatures(featuresString) {
  // Limpiar el contenido de etiquetas HTML y comillas especiales
  const cleanedData = featuresString
    .replace(/<p>|<\/p>/g, '') // Eliminar etiquetas <p>
    .replace(/<br\s*\/?>/g, '') // Eliminar saltos de línea
    .replace(/«|»/g, '"'); // Reemplazar comillas angulares por comillas estándar

  try {
    // Intentar parsear el contenido como JSON
    const features = JSON.parse(cleanedData);
    return features.features;
  } catch (error) {
    console.error("Error al parsear el JSON de características:", error);
    return null; // Retorna null si hay error en el parseo
  }
}

if (document.querySelector(".acuarela-services")) {
  console.log("Desde acuarela");
  getAllAcuarela().then(updateAcuarelaServices);
}