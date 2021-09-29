<?php include 'includes/header.php'; ?>
    <main class="no-bg main-short">
      <!-- CONTACT -->
      <section class="contact contact-faq">
        <div class="contact__content">
          <div class="contact__texts">
            <h1 class="contact__title contact__title--faq">
              ¿Necesitas ayuda?
            </h1>
            <h3 class="contact__subtitle">Envíanos un mensaje</h3>
          </div>
          <form class="contact__form contact__form--faq" id="contact__form">
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
            <div class="form-group form-group-textarea">
              <label for="message">Mensaje</label>
              <textarea placeholder="Texto" name="message" rows="6"></textarea>
            </div>
            <button class="btn btn--primary">Enviar</button>
          </form>
        </div>
        <div class="contact__question question">
          <h4 class="question__title">
            ¿Lorem Ipsum dolor sit amet, consectetur adipiscing elit?
          </h4>
          <p class="question__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut
            leo vehicula, fringilla ipsum et, vehicula odio. Sed tincidunt sem
            nec dolor interdum faucibus. Sed fermentum dictum erat. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Maecenas id nunc
            id justo faucibus porttitor non ut urna. Phasellus sem tellus,
            accumsan sit amet finibus sit amet, ultrices vel lorem. Proin eu
            vulputate quam. Nullam finibus vestibulum egestas.
            <br /><br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            ligula ligula, consectetur id ligula sed, lacinia luctus erat. In
            scelerisque neque quis est malesuada fermentum. Integer nec tellus
            ac eros dictum molestie at quis leo. Maecenas sed metus pretium,
            feugiat tellus id, interdum quam. Aliquam consectetur quam at
            rhoncus venenatis. Fusce lacinia enim eget iaculis suscipit. In at
            odio rhoncus, egestas sem feugiat, vehicula felis. Ut vehicula, erat
            eget lacinia dignissim, urna risus mollis ante, sit amet dapibus
            mauris metus et odio. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus.
          </p>
          <button class="btn btn--transparent">
            <i class="btn__icon icon-prev"></i>
            <span class="btn__text">Volver a preguntas frecuentes</span>
          </button>
        </div>
      </section>
    </main>
<?php include 'includes/footer.php'; ?>