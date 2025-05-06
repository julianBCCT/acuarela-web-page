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
            <h1 class="contact__title">Elimina tu cuenta</h1>
            <h3 class="contact__subtitle">
            Enviar una solicitud para eliminar tu cuenta y todos tus datos de Acuarela
            </h3>
            <p class="contact__message">
            Solicita aquí la eliminación de tus datos (usuario, contraseña, teléfonos, correo, datos personales, información de tu daycare y sus integrantes) de Acuarela Apps. Recuerda que tus datos son almacenados con el único propósito de prestarte los servicios contratados y se almacenan de forma permanente mientras tu cuenta está activa y hasta por 5 años si tu suscripción a Acuarela Lite o Acuarela Pro se encuentran vencidas según <a href="https://acuarela.app/politicas" target="_BLANK">nuestra política de privacidad y tratamiento de datos.</a>
            </p>
          </div>
          <div class="contact__success">
            <h1 class="contact__title">Solicitud enviada</h1>
            <p class="contact__message">
            ¡Listo! Recibirás una notificación cuando tu cuenta y datos hayan sido eliminados de nuestro sistema. Recuerda que esta acción no se puede deshacer. Tu usuario, correo, contraseña, datos personales, información de tu daycare, integrantes, asistentes serán eliminadas.
            </p>
          </div>
          <form class="contact__form" id="contact__form" action="/s/demo/" method="POST">
            <div class="form-group">
              <br><br>
              <label for="name">Escribe el e-mail asociado a tu cuenta de Acuarela Apps</label>
              <div class="input-wrapper">
                <input
                  required
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Tu correo electrónico"
                />
                <label for="email"></label>
              </div>
            </div>
            
            <span class="empty"></span>
            <button class="btn btn--primary">Enviar solicitud</button>
          </form>
        </div>
      </section>
    </main>
<?php include 'includes/footer.php'; ?>