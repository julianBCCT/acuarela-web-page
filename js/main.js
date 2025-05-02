
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
  const video = document.querySelector(".video-container #video1");
  if (video.muted === true) {
    document.querySelector("#unmutedBtn img").src = "img/volOn.svg";
    video.muted = false;
  } else if (video.muted === false) {
    document.querySelector("#unmutedBtn img").src = "img/volOff.svg";
    video.muted = true;
  }
}


//PARA EL MODAL DEL DEMO
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');

openModalBtn.addEventListener('click', () => {
  modalOverlay.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
  modalOverlay.classList.add('hidden');
});

// Cerrar si se hace clic fuera del modal-box
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.add('hidden');
  }
});


//Carrusel de testimonios
let currentIndex = 0;

const sliderTrack = document.querySelector('.testimonial__slider-track');
const slides = document.querySelectorAll('.testimonial__slide');
const totalSlides = slides.length;
const slidesPerView = 2;

function updateSlider() {
  const slideWidth = slides[0].offsetWidth + 20; // 20 es el gap
  const moveX = currentIndex * slideWidth;
  sliderTrack.style.transform = `translateX(-${moveX}px)`;
}

document.querySelector('img[alt="Desplazar testimonios a la izquierda"]').addEventListener('click', () => {
  currentIndex = Math.max(0, currentIndex - 1);
  updateSlider();
});

document.querySelector('img[alt="Desplazar testimonios a la derecha"]').addEventListener('click', () => {
  if (currentIndex < totalSlides - slidesPerView) {
    currentIndex++;
    updateSlider();
  }
});

// Opcional: Ajustar slider si cambia el tamaño
window.addEventListener('resize', updateSlider);



//Parte para manejar la tabla de acuarela lite y pro
let monthlyAcuarela = false;
let acuarelaService = false;

function toggleFrequencyAcuarela() {
  monthlyAcuarela = !monthlyAcuarela;
  document.getElementById("frequencyLabelAcuarela").textContent = monthlyAcuarela
    ? "Mensual"
    : "Anual";
  updateAcuarelaServices();
  // updatePricesIndiUni();
}
getAllAcuarela();


//Parte para manejar la tabla de acuarela lite y pro, (No con el switch)
function setFrequencyAcuarela(option) {
  monthlyAcuarela = option === "mensual";
  // Primero quitar "active" de ambos
  document.getElementById("optionAnual").classList.remove("active");
  document.getElementById("optionMensual").classList.remove("active");
  // Luego agregar "active" solo al seleccionado
  if (monthlyAcuarela) {
    document.getElementById("optionMensual").classList.add("active");
  } else {
    document.getElementById("optionAnual").classList.add("active");
  }

  updateAcuarelaServices();
}


const toggleBtn = document.querySelector('.toggle-btn');
const listDeployment = document.querySelector('.list-deployment');

toggleBtn.addEventListener('click', () => {
  listDeployment.classList.toggle('active');
  toggleBtn.classList.toggle('rotated');
});


function getAllAcuarela() {
  if (!acuarelaService) {
    return fetch("/g/getAcuarelaServices/")
      .then((res) => res.json())
      .then((data) => {
        acuarelaService = data;
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
            <th>
              <div class="boxtitle__table">
                <img src="img/Favicon.svg" alt="Acuarela App" />
                <div class="boxtitle__table-title">
                  <h2> Acuarela App</h2>
                    <p>
                      <span id="optionAnual" class="frequency-option ${monthlyAcuarela ? '' : 'active'}" onclick="setFrequencyAcuarela('anual')">Anual</span> / 
                      <span id="optionMensual" class="frequency-option ${monthlyAcuarela ? 'active' : ''}" onclick="setFrequencyAcuarela('mensual')">Mensual</span>
                    </p>
                </div>
              </div>

              <h3> Características </h3>
            </th>
      `;

      data.forEach((acuarela) => {
        const price = monthlyAcuarela
          ? acuarela.acf.precio_mensual
          : acuarela.acf.presio_anual;

        const isPro = acuarela.title.rendered.trim().toLowerCase() === "acuarela pro";

        const redirectLink = monthlyAcuarela
          ? acuarela.acf.link_de_pago_mensual
          : acuarela.acf.link_de_pago_anual;

        const isProButton = acuarela.acf.texto_boton === "Quiero ser Pro";
        const buttonText = isProButton ? "¡Próximamente!" : acuarela.acf.texto_boton;
        const disabledAttr = isProButton ? "disabled" : "";
        const buttonClassExtra = isProButton ? "btn-disable" : ""; 
        const onclickAttr = isProButton
          ? ""
          : `onclick="window.open('${redirectLink || "#"}', '_blank')"`; 
        
        const asesorButtonClass = isPro ? "buttonth-white" : "buttonth-white btn-invisible"; // Si NO es pro, sera "invisible"

        tableHTML += `
          <th class="th-acuarela">
            <p> 
              <span class="title-price">
                ${acuarela.title.rendered} 
                ${isPro ? '<img src="img/crown_simple.svg" alt="Pro"/>' : ''}
              </span>
              <span class="price">${price}</span>
            </p>
            <button class="buttonth ${buttonClassExtra}" ${disabledAttr} ${onclickAttr} target="_blank" >
              ${buttonText}
            </button>
            <button class="${asesorButtonClass}" target="_blank">
              Hablar con asesor
            </button>
          </th>
        `;
      });

      tableHTML += `
          </tr>
        </thead>
        <tbody>
      `;

      const allFeatures = {};

      data.forEach((acuarela) => {
        const featuresData = parseFeatures(acuarela.content.rendered);
        Object.keys(featuresData).forEach((feature) => {
          allFeatures[feature] = true; // Guardar la característica como clave única
        });
      });

      let index = 0;
      Object.keys(allFeatures).forEach((feature) => {
        const rowClass = index % 2 === 0 ? 'white-bgtd' : 'menta-bgtd'; // Alternar clase con base en index par o impar
        tableHTML += `
          <tr>
            <td class="${rowClass}">${feature}</td>
        `;

        data.forEach((acuarela) => {
          const featuresData = parseFeatures(acuarela.content.rendered);
          tableHTML += `
            <td style="text-align: center;">
              ${featuresData[feature] === true ? "✔" : featuresData[feature] === false ? "✖" : featuresData[feature]}
            </td>
          `;
        });

        tableHTML += `</tr>`;
        index++;
      });

      tableHTML += `
      <tr>
        <td style="text-align: center; font-weight: bold;"></td>
      `;

      tableHTML += `
      </tr>
    </tbody>
  </table>
  `;

      tableContainer.innerHTML = tableHTML;
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
  getAllAcuarela().then(updateAcuarelaServices);
}