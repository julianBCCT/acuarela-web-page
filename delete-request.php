<?php include 'includes/header.php'; ?>
<main class="container no-bg">
  <!-- CONTACT -->
  <section class="contact">

    <div class="contact__card card">
      <h2 class="card__title">Contáctanos</h2>
      <h3 class="card__subtitle">Acuarela</h3>
      <ul class="card__address">
        <li>info@acuarela.app</li>
        <li>+1 (347) 523-8504</li>
      </ul>
      <!-- <a class="card__email">bilingualchildcaretraining.com</a> -->
      <img class="card__img" src="img/contact-us.png" />
      <div class="card__bottom">
        <h3>Síguenos en redes</h3>
        <div class="card__social">
          <a href="https://www.facebook.com/Acuarela-App-106811688249671" target="_blank">
            <img src="img/facebook-2.png" class="card__fb"></img>
          </a>
          <a href="https://www.instagram.com/acuarela.app/" target="_blank">
            <img class="card__ig" src="img/instagram.ico" />
          </a>

        </div>
      </div>
    </div>
    <div class="contact__content">
      <div class="contact__texts">
        <h1 class="contact__title">Solicita acceso, corrección o eliminación de tus datos personales.</h1>
        <h3 class="contact__subtitle">
          Enviar una solicitud para administrar tus datos personales.
        </h3>
        <p class="contact__message">
          En Bilingual Child Care Training, respetamos tu derecho a decidir sobre tu información
          personal. Si deseas acceder a los datos que hemos recopilado, corregirlos o solicitar su
          eliminación, puedes hacerlo enviando una solicitud a través del siguiente formulario.
          <br><br>
          La información personal que recopilamos se utiliza exclusivamente para la prestación de
          nuestros servicios formativos, administrativos y de soporte.
          <br><br>
          Según nuestra <a href="https://acuarela.app/politicas" target="_BLANK">Política de Privacidad</a> y conforme a principios de retención responsable,
          conservamos los datos personales únicamente durante el tiempo necesario para cumplir con
          la finalidad para la que fueron recabados y con nuestras obligaciones legales, lo cual puede
          extenderse hasta por un período de cinco (5) años a partir de la finalización de la relación
          con el usuario o la prestación del servicio.
          <!-- Solicita aquí la eliminación de tus datos (usuario, contraseña, teléfonos, correo, datos personales, información de tu daycare y sus integrantes) de Acuarela Apps. Recuerda que tus datos son almacenados con el único propósito de prestarte los servicios contratados y se almacenan de forma permanente mientras tu cuenta está activa y hasta por 5 años si tu suscripción a Acuarela Lite o Acuarela Pro se encuentran vencidas según <a href="https://acuarela.app/politicas" target="_BLANK">nuestra política de privacidad y tratamiento de datos.</a> -->
        </p>
      </div>
      <div class="contact__success">
        <h1 class="contact__title">Solicitud enviada</h1>
        <p class="contact__message">
          ¡Listo! Recibirás una notificación cuando tu cuenta y datos hayan sido eliminados de nuestro sistema. Recuerda que esta acción no se puede deshacer. Tu usuario, correo, contraseña, datos personales, información de tu daycare, integrantes, asistentes serán eliminadas.
        </p>
      </div>
      <!-- <form class="contact__form" id="contact__form" action="/s/demo/" method="POST"> -->
      <form class="delete_request_form" id="delete_request_form">
        <div class="form-group">
          <br><br>
          <label for="email">Escribe el e-mail asociado a tu cuenta de Acuarela Apps</label>
          <div class="input-wrapper">
            <input
              required
              name="email"
              id="email"
              type="email"
              placeholder="Tu correo electrónico" />
          </div>
        </div>

        <div class="form-group">
          <label for="request_type">¿Qué tipo de solicitud deseas realizar?</label>
          <div class="input-wrapper">
            <select name="request_type" id="request_type" required>
              <option value="" disabled selected>Selecciona una opción</option>
              <option value="acceder datos">Solicitar acceso a mis datos personales.</option>
              <option value="actualizar datos">Solicitar corrección de mis datos personales.</option>
              <option value="eliminar datos">Solicitar eliminación de mis datos personales.</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="reason">Indica el motivo de tu solicitud (opcional).</label>
          <div class="input-wrapper">
            <textarea
              name="reason"
              id="reason"
              rows="4"
              placeholder="Describe brevemente el motivo de tu solicitud"></textarea>
          </div>
        </div>

        <div class="form-group">
          <label class="checkbox">
            <input id="accept" type="checkbox" name="consent" required />
            Al enviar esta solicitud, declaras que la información proporcionada es veraz y que
            eres el titular de los datos personales o que estás autorizado legalmente para
            actuar en su nombre.
          </label>
        </div>

        <span class="empty"></span>
        <button class="btn btn--primary">Enviar solicitud</button>
      </form>

    </div>
  </section>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const form = document.getElementById('delete_request_form');
      const emailInput = document.getElementById('email');
      const requestType = document.getElementById('request_type');
      const reasonInput = document.getElementById('reason');
      const checkbox = document.getElementById('accept');
      console.log(checkbox);
      console.log(emailInput);

      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = {
          email: emailInput.value,
          requestType: requestType.value,
          reason: reasonInput.value,
        };
        console.log(formData);

        const email = emailInput.value.trim();

        // if (!email) {

        //   return;
        // }

        try {
          // URL de tu API Strapi con filtro por email (ajusta endpoint si es necesario)
          const response = await fetch(`https://acuarelacore.com/api/acuarelausers?mail=${email}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Si Strapi requiere autenticación, agrega el token aquí:
              // 'Authorization': 'Bearer TU_TOKEN'
            }
          });

          const data = await response.json();
          console.log(data);

          if (data.length === 0) {
            Swal.fire({
              title: "¡Email no existente!",
              text: "El email ingresado no está registrado. Por favor verifica y vuelve a intentarlo.",
              icon: "warning", // "success", "error", "info", "question", "warning"
              confirmButtonText: "Entendido",
              background: "#f8f9fa",
              color: "#333",
              confirmButtonColor: "#0cb5c3",
            });
            return;
          } else {
            console.log('Email existe, enviando formulario...');
            fetch("/s/delete-request/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              })
              .then((response) => response.text())
              .then((text) => {
                const data = JSON.parse(text);
                if (data.success) {
                  Swal.fire({
                    title: "¡Solicitud enviada con éxito!",
                    text: "Tu solicitud ha sido recibida y será atendida en un plazo máximo de 30 días calendario, conforme a buenas prácticas.",
                    icon: "success", // "success", "error", "info", "question", "warning"
                    confirmButtonText: "Entendido",
                    background: "#f8f9fa",
                    color: "#333",
                    confirmButtonColor: "#0cb5c3",
                  });
                  console.log(data);
                  emailInput.value = "";
                  requestType.value = "";
                  reasonInput.value = "";
                  checkbox.checked = false;
                } else {
                  Swal.fire({
                    title: "Error al enviar la solicitud",
                    text: "Hubo un problema al procesar tu solicitud. Por favor intenta nuevamente.",
                    icon: "error", // "success", "error", "info", "question", "warning"
                    confirmButtonText: "Entendido",
                    background: "#f8f9fa",
                    color: "#333",
                    confirmButtonColor: "#0cb5c3",
                  });
                  console.log(data);
                }
              })
              .catch((error) => {
                Swal.fire({
                  title: "Error al enviar la solicitud",
                  text: "Hubo un problema al procesar tu solicitud. Por favor intenta nuevamente.",
                  icon: "error", // "success", "error", "info", "question", "warning"
                  confirmButtonText: "Entendido",
                  background: "#f8f9fa",
                  color: "#333",
                  confirmButtonColor: "#0cb5c3",
                });
                console.error("Error:", error);
              });
          }
        } catch (error) {
          alert('Ocurrió un error al verificar el email. Intenta nuevamente más tarde.');
          console.error(error);
        }
      });
    });
  </script>
</main>
<?php include 'includes/footer.php'; ?>