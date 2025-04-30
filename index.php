<?php include 'includes/header.php'; ?>
<!-- <div class="home-banner">
    <button type="button" onclick="unMutedVideo()" id="unmutedBtn"><img src="img/volOff.svg" alt="unmuted" /></button>
    <video

    id="video1"
      src="<?=$a->generalInfo->acf->video_home?>"
      autobuffer
      playsinline
      preload="auto"
      muted
      loop
      autoplay
    >
      <source
        src="<?=$a->generalInfo->acf->video_home?>"
      />
    </video>
</div> -->
<main class="containerheader">
  <!-- BANNER -->
  <section class="banner">
    <h1 class="banner__title">
      Administra <strong class="banner__title-strong">Tu Daycare Digitalmente</strong> Y Haz Crecer Tu Negocio.
    </h1>

    <div class="banner__content">
      <!-- <div class="banner__media">
        <video autoplay muted loop>
          <source src="<?=$a->generalInfo->acf->video_home?>" type="video/mp4">
          Tu navegador no soporta video HTML5.
        </video>
        <div class="red-square">
          <img class="header__logo" src="img/Logo_AC.png" alt="Acuarela" />
        </div>
      </div> -->
      <div class="banner__media">
        <div class="video-container">
          <video autoplay muted loop>
            <source src="<?=$a->generalInfo->acf->video_home?>" type="video/mp4">
            Tu navegador no soporta video HTML5.
          </video>
        </div>
        <div class="pink-square">
          <img class="video__logo" src="img/Logo_AC.png" alt="Acuarela" />
        </div>
      </div>

      <div class="banner__content-info">
        <h2 class="banner__subtitle">
          Convierte el servicio de tu daycare en una experiencia 10/10 con la
          familia de herramientas digitales Acuarela.
        </h2>
        <div class="banner__buttons">
          <button
            class="btn btn--primarywhite"
            onclick="window.location.href='https://bilingualchildcaretraining.com/miembros/crear-cuenta'"
          >
          Crea una cuenta gratis
          </button>
          <button
            class="btn btn--secondary"
            onclick="window.location.href='https://bilingualchildcaretraining.com/miembros/crear-cuenta'"
          >
          Obtener un DEMO
          </button>
        </div>
      </div>    
    </div>
  </section>

  <!-- CLIENTES -->
  <!-- <section class="clientes__daycares">
    <p class="clientes-title">Con la confianza de</p>
    <img class="logos-daycares" src="img/daycares/GummyBear.png" alt="Acuarela" />
    <img class="logos-daycares" src="img/daycares/JyN.png" alt="Acuarela" />
    <img class="logos-daycares" src="img/daycares/LittleGenius.png" alt="Acuarela" />
    <img class="logos-daycares" src="img/daycares/ManitasFuturo.png" alt="Acuarela" />
    <img class="logos-daycares" src="img/daycares/Nuri.png" alt="Acuarela" />
    <img class="logos-daycares" src="img/daycares/RaisingStars.png" alt="Acuarela" />
  </section> -->

  <!-- FEATURES -->
  <section class="features">
    <h2 class="features__title">Un Daycare 10/10 es capaz de...</h2>
    <div class="features-cont">
      <div class="features-cont__feature-feature">
        <img class="feature__img" src="img/feature-1.svg" />
        <h3 class="feature__title">
          Comunicarse fácilmente con personal y padres de familia...
        </h3>
        <p class="feature__text">
          Ahora la mensajería instantánea, las notificaciones masivas y el muro
          social son parte de un gran servicio. Acuarela te acerca a tus
          asistentes y clientes a un toque de tu tablet preferida.
        </p>
      </div>
      <div class="features-cont__feature-feature">
        <img class="feature__img" src="img/feature-2.svg" />
        <h3 class="feature__title">Conseguir nuevos<br />clientes</h3>
        <p class="feature__text">
          La red de Daycares Acuarela pone tu negocio en el mapa, permitiendo
          que padres de familia en tu área conozcan tu daycare, instalaciones y
          mucho más.
        </p>
      </div>
      <div class="features-cont__feature-feature">
        <img class="feature__img" src="img/feature-3.svg" />
        <h3 class="feature__title">Usar nuevas formas de brindar seguridad</h3>
        <p class="feature__text">
          A manera de red social, Acuarela te permite hacer publicaciones para
          los padres de familia de los niños que cuidas a diario, esto ayuda a
          fortalecer relaciones con ellos y brindar seguridad mientras están en
          sus labores cotidianas.
        </p>
      </div>
      <div class="features-cont__feature-feature">
        <img class="feature__img" src="img/feature-4.svg" />
        <h3 class="feature__title">Gestionar sus finanzas en tiempo récord</h3>
        <p class="feature__text">
          Obtén pagos automatizados vía PayPal, lleva control de Payrolls y
          obtén reportes del estado financiero de tu Daycare en pocos pasos, las
          24 horas del día, los 7 días de la semana.
        </p>
      </div>
    </div>
  </section>

  <!-- FEATURES RESPONSIVE-->
  <h2 class="features__title1">Un Daycare 10/10 es capaz de...</h2>
  <div class="glider-carousel">
    <div class="glider">
      <div class="card">
        <img class="feature__img" src="img/feature-1.svg" />
        <h3 class="feature__title">
          Comunicarse fácilmente con personal y padres de familia...
        </h3>
        <p class="feature__text">
          Ahora la mensajería instantánea, las notificaciones masivas y el muro
          social son parte de un gran servicio. Acuarela te acerca a tus
          asistentes y clientes a un toque de tu tablet preferida.
        </p>
      </div>
      <div class="card">
        <img class="feature__img" src="img/feature-2.svg" />
        <h3 class="feature__title">Conseguir nuevos<br />clientes</h3>
        <p class="feature__text">
          La red de Daycares Acuarela pone tu negocio en el mapa, permitiendo
          que padres de familia en tu área conozcan tu daycare, instalaciones y
          mucho más.
        </p>
      </div>
      <div class="card">
        <img class="feature__img" src="img/feature-3.svg" />
        <h3 class="feature__title">Usar nuevas formas de brindar seguridad</h3>
        <p class="feature__text">
          A manera de red social, Acuarela te permite hacer publicaciones para
          los padres de familia de los niños que cuidas a diario, esto ayuda a
          fortalecer relaciones con ellos y brindar seguridad mientras están en
          sus labores cotidianas.
        </p>
      </div>
      <div class="card">
        <img class="feature__img" src="img/feature-4.svg" />
        <h3 class="feature__title">Gestionar sus finanzas en tiempo récord</h3>
        <p class="feature__text">
          Obtén pagos automatizados vía PayPal, lleva control de Payrolls y
          obtén reportes del estado financiero de tu Daycare en pocos pasos, las
          24 horas del día, los 7 días de la semana.
        </p>
      </div>
    </div>
  </div>

  <!-- ADD-ONS -->

  <?php 
  $sections = $a->getHomeSections();
  for ($i=0; $i < count($sections); $i++) { 
    $section = $sections[$i];
   ?>
   <?php if($i % 2 == 0){?>
    <section class="add-on add-on--left">
      <img class="add-on__img" src="<?=$section->acf->imagen?>" />
      <div class="add-on__texts">
        <h2 class="add-on__title">
          <?=$section->title->rendered?>
        </h2>
        <p class="add-on__description">
        <?=$section->content->rendered?>
        </p>
        <button
          class="btn btn--primary"
          onclick="window.location.href='/planes-precios'"
        >
          <span class="btn__text"> <?=$section->acf->texto_boton?> </span>
        </button>
      </div>
    </section>
   <?php }else{ ?>
    <section class="add-on">
      <div class="add-on__texts">
        <h2 class="add-on__title">
          <?=$section->title->rendered?>
        </h2>
        <p class="add-on__description">
        <?=$section->content->rendered?>
        </p>
        <button
          class="btn btn--primary"
          onclick="window.location.href='/planes-precios'"
        >
          <span class="btn__text"> <?=$section->acf->texto_boton?> </span>
        </button>
      </div>
      <img class="add-on__img" src="<?=$section->acf->imagen?>" />
    </section>
   <?php } ?>
   <?php } ?>
</main>
<?php include 'includes/footer.php'; ?>
