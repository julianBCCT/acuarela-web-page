<?php include 'includes/header.php'; ?>
    <main class="container">
      <!-- CONTACT -->
      <section class="contact">
        <div class="contact__content">
          <div class="contact__texts">
            <h1 class="contact__title">¡Obtén tu demo!</h1>
            <h3 class="contact__subtitle">
              Cuéntanos sobre ti y tu Daycare, uno de nuestros asesores se
              comunicará contigo para presentarte Acuarela y activar tu free-demo.
            </h3>
          </div>
          <div class="contact__success">
            <h1 class="contact__title">¡Obtén tu demo!</h1>
            <h3 class="contact__subtitle">¡Listo! Recibimos tu mensaje</h3>
            <p class="contact__message">
              Muy pronto nos pondremos en contacto contigo para ayudarte a
              resolver tus dudas.
            </p>
          </div>
          <form class="contact__form" id="contact__form" action="/s/demo/" method="POST">
            <div class="form-group">
              <label for="name">Nombre</label>
              <div class="input-wrapper">
                <input
                  required
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Nombre"
                />
                <label for="name"></label>
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <div class="input-wrapper">
                <input
                  required
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
                <label for="email"></label>
              </div>
            </div>
            <div class="form-group">
              <label for="phone">Número telefónico</label>
              <div class="input-wrapper">
                <input
                  required
                  name="phone"
                  id="phone"
                  type="tel"
                  placeholder="Número telefónico"
                />
                <label for="phone"></label>
              </div>
            </div>
            <div class="form-group">
              <label for="daycare_name">Nombre de tu Daycare</label>
              <div class="input-wrapper">
                <input
                  required
                  name="daycare_name"
                  id="daycare_name"
                  type="text"
                  placeholder="Daycare"
                />
                <label for="daycare_name"></label>
              </div>
            </div>
            <div class="form-group">
              <label for="country">País</label>
              <div class="select-wrapper">
                <select required name="country" id="country">
                  <option selected disabled></option>
                  <option value="CO">Colombia</option>
                  <option value="US">United States</option>
                  <option value="BR">Brasil</option>
                  <option value="MX">México</option>
                </select>
                <label for="country"></label>
              </div>
            </div>
            <div class="form-group">
              <label for="city">Ciudad</label>
              <div class="input-wrapper">
                <input
                  required
                  name="city"
                  id="city"
                  type="text"
                  placeholder="Ciudad"
                />
                <label for="city"></label>
              </div>
            </div>
            <span class="empty"></span>
            <button class="btn btn--primary">Enviar</button>
          </form>
        </div>
        <div class="contact__card card">
          <h2 class="card__title">Contáctanos</h2>
          <h3 class="card__subtitle">Acuarela</h3>
          <ul class="card__address">
            <li>info@acuarela.app</li>
            <li>+1 (561) 982 6122</li>
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
      </section>
    </main>
<?php include 'includes/footer.php'; ?>