<?php include 'includes/header.php';
$prices = $a->getPrices();
?>


<main class="container__home">
  <!-- BANNER -->
  <section class="banner banner--center banner--short">
    <div class="banner__texts">
      <h1 class="banner__title">
        ¡Únete a la nueva era del cuidado y digitaliza tu Daycare ahora!
      </h1>
    </div>
    <img class="banner__img banner__img--no-border" src="img/pricing.png" />
  </section>

  <!-- PRICING -->

  <!-- <section class="pricing" id="acuarela-services"> -->

  <section class="acuarela-services" id="acuarela-services">
    <div id="curriculums-slide-planes-acuarela">
      <div class="desc">
        <?= $service->acf->{$template}->desc_plan ?>
      </div>
      <div class="switch-container">
        <label class="switch">
          <input type="checkbox" id="frequencySwitch" onchange="toggleFrequencyAcuarela()">
          <span class="slider round"></span>
        </label>
        <span id="frequencyLabelAcuarela">Anual</span>
      </div>
      <section class="acuarela-slide">
        <!-- <ul class="bussines-slide" id="prices"> </ul> -->
        <table class="acuarela-bussines-slide" id="services"></table>
      </section>
    </div>

    <!-- <?php for ($i = 0; $i < count($prices); $i++) {
            $price = $prices[$i]; ?>
      <div class="pricing-plan">
        <b class="pricing-plan__name"><?= $price->title->rendered ?></b>
        <h1 class="launch__price"><?= $price->acf->precio ?></h1>
        <h1 class="pricing-plan__price"></h1>
        <hr />
        <?= $price->content->rendered ?>
        <a href="<?= $price->acf->link_de_pago ?>" class="btn btn--primary btn--small">
          <span class="btn__text"><?= $price->acf->texto_boton ?></span>
        </a>
      </div>
    <?php } ?> -->
    <!-- <?php if (!isset($_GET["free"])) { ?>
      <div class="pricing-plan">
        <b class="pricing-plan__name">Suscripción Gratuita</b>
        <h1 class="launch__price">FREE TRIAL</h1>
        <h1 class="pricing-plan__price"></h1>
        <hr />
        <ul class="pricing-plan__features">
          <li>Disfruta del servicio completo por 14 días, luego podrás elegir entre una suscripción mensual o anual.</li>
          <li>
            Gestiona las inscripciones de hasta 16 niños, con sus respectivos
            padres y acudientes
          </li>
          <li>Registra ingreso y salida de niños por medio de QR CODE.</li>
          <li>Administra las finanzas de tu daycare desde tu iPad o tablet</li>
          <li>Administra grupos y sus actividades.</li>
          <li>Gestiona tus precios, horarios y asistentes.</li>
          <li>
            Ofrece a los padres la app móvil de tu guardería para estar en
            constante comunicación.
          </li>
          <li>
            Haz publicaciones del progreso de tus niños a sus padres y familiares.
          </li>
        </ul>
        <a href="/invitaciones" class="btn btn--primary btn--small">
          <span class="btn__text">Obtén tu invitación</span>
        </a>
      </div>
    <?php } ?>
    <div class="pricing-plan">
      <b class="pricing-plan__name">Suscripción mensual</b>
      <h1 class="launch__price">$24.00/mes</h1>
      <h1 class="pricing-plan__price"><s>$29.00/mes</s></h1>
      <hr />
      <ul class="pricing-plan__features">
        <li>
          Gestiona las inscripciones de hasta 16 niños, con sus respectivos
          padres y acudientes
        </li>
        <li>Registra ingreso y salida de niños por medio de QR CODE.</li>
        <li>Administra las finanzas de tu daycare desde tu iPad o tablet</li>
        <li>Administra grupos y sus actividades.</li>
        <li>Gestiona tus precios, horarios y asistentes.</li>
        <li>
          Ofrece a los padres la app móvil de tu guardería para estar en
          constante comunicación.
        </li>
        <li>
          Haz publicaciones del progreso de tus niños a sus padres y familiares.
        </li>
      </ul>
      <button
        class="btn btn--primary btn--small"
        onclick="InitiateCheckout('monthly',21)"
      >
        <a
          href="https://bilingualchildcaretraining.com/checkout/?service=6352aad797a7c9104df3f2fd"
          target="_blank"
        >
          <span class="btn__text">Seleccionar</span>
        </a>
      </button>
    </div>
    <div class="pricing-plan">
      <b class="pricing-plan__name">Ahorra el 10% con una suscripción anual</b>
      <h1 class="launch__price">$259.00/año</h1>
      <h1 class="pricing-plan__price"><s>$315.00/año</s></h1>
      <hr />
      <ul class="pricing-plan__features">
        <li>
          Gestiona las inscripciones de hasta 16 niños, con sus respectivos
          padres y acudientes
        </li>
        <li>Registra ingreso y salida de niños por medio de QR CODE.</li>
        <li>Administra las finanzas de tu daycare desde tu iPad o tablet</li>
        <li>Administra grupos y sus actividades.</li>
        <li>Gestiona tus precios, horarios y asistentes.</li>
        <li>
          Ofrece a los padres la app móvil de tu guardería para estar en
          constante comunicación.
        </li>
        <li>
          Haz publicaciones del progreso de tus niños a sus padres y familiares.
        </li>
      </ul>
      <button
        class="btn btn--primary btn--small"
        onclick="InitiateCheckout('yearly',227)"
      >
        <a
          href="https://bilingualchildcaretraining.com/checkout/?service=6352ab1a97a7c9104df3f300"
          target="_blank"
        >
          <span class="btn__text">Seleccionar</span>
        </a>
      </button>
    </div> -->
  </section>

</main>
<?php include 'includes/footer.php' ?>