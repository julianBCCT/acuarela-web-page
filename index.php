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
   <section class="featurespr">
    <div class="features-boxpurple"></div>
    <div class="features-boxmenta"></div>
    <div class="features-boxpollito"></div>
    <div class="features-boxsandia"></div>
    <div class="features-inner">
      <div class="features-parttitle">
        <h2 class="features__title">Un Daycare 10/10 es capaz de:</h2>
        <button
            class="btn btn--secondary"
            onclick="window.location.href='https://bilingualchildcaretraining.com/miembros/crear-cuenta'"
          >
          Obtener un DEMO
        </button>
      </div>
      <div class="features-cont">
        <div class="features-cont__feature-feature subs1">
          <div class="feature__image img1">
            <img class="img-feature" src="img/feature-1white.svg" alt="Comunicarse fácilmente con personal y padres de familia" />
          </div>
          <h3 class="feature-titleinfo">Comunicarse fácilmente con personal y padres de familia...</h3>
          <p class="feature-textinfo">
            Ahora la mensajería instantánea, las notificaciones masivas y el muro
            social son parte de un gran servicio. Acuarela te acerca a tus
            asistentes y clientes a un toque de tu tablet preferida.
          </p>
        </div>
        <div class="features-cont__feature-feature subs2">
          <div class="feature__image img2">
            <img class="img-feature" src="img/feature-2white.svg" alt="Conseguir nuevos clientes" />
          </div>
          <h3 class="feature-titleinfo">Conseguir nuevos clientes</h3>
          <p class="feature-textinfo">
            La red de Daycares Acuarela pone tu negocio en el mapa, permitiendo
            que padres de familia en tu área conozcan tu daycare, instalaciones y
            mucho más.
          </p>
        </div>
        <div class="features-cont__feature-feature subs3">
          <div class="feature__image img3">
            <img class="img-feature" src="img/feature-3white.svg" alt="Usar nuevas formas de brindar seguridad" />
          </div>
          <h3 class="feature-titleinfo">Usar nuevas formas de brindar seguridad</h3>
          <p class="feature-textinfo">
            A manera de red social, Acuarela te permite hacer publicaciones para
            los padres de familia de los niños que cuidas a diario, esto ayuda a
            fortalecer relaciones con ellos y brindar seguridad mientras están en
            sus labores cotidianas.
        </p>
        </div>
        <div class="features-cont__feature-feature subs4">
          <div class="feature__image img4">
            <img class="img-feature" src="img/feature-4white.svg" alt="Gestionar sus finanzas en tiempo récord" />
          </div>
          <h3 class="feature-titleinfo">Gestionar sus finanzas en tiempo récord</h3>
          <p class="feature-textinfo">
            Obtén pagos automatizados vía PayPal, lleva control de Payrolls y
            obtén reportes del estado financiero de tu Daycare en pocos pasos, las
            24 horas del día, los 7 días de la semana.
          </p>
        </div>
      </div>
    </div>
  </section>


  <!-- ADD-ONS -->
  <section class="add__ons" id="nosotros">
    <div class="add__ons__content">
      <img class="adds-image" src="img/add-on1.png" alt="Cobros automáticos y Payrolls fáciles" />
     
      <div class="adds-content">
        <div class="adds-content-page type1">
          <div class="page-title">
            <h4>Finanzas</h4>
          </div>
          <div class="page-line tipe1"></div>
          <div class="page-imagebox box1">
            <img src="img/feature-4white.svg" alt="Gestionar sus finanzas en tiempo récord" />
          </div>
        </div>

        <div class="adds-content-info">
          <h3 class="adds-info-title">Cobros automáticos y Payrolls fáciles...</h3>
          <p class="adds-info-text">
            Nuestro sistema de pagos automáticos está listo para facilitar los cobros semanales de tu 
            servicio a los padres de familia que son parte de tu Daycare, además, Acuarela te permite hacer 
            gestión de tus gastos diarios y el pago periódico a los asistentes que te ayudan con el cuidado 
            de niños en tu negocio.
          </p>
          <button
            class="btn btn--secondary"
            onclick="window.location.href='https://acuarela.app/planes-precios'"
          >
            Ver planes y precios
          </button>
        </div>
      </div>
    </div>

    <div class="add__ons__content">     
      <div class="adds-content">
        <div class="adds-content-page type2">
          <div class="page-imagebox box2">
            <img src="img/feature-2white.svg" alt="Conseguir nuevos clientes" />
          </div>
          <div class="page-line tipe2"></div>
          <div class="page-title">
            <h4>Mensajería</h4>
          </div>
        </div>

        <div class="adds-content-info">
          <h3 class="adds-info-title">Llega a más clientes sin más esfuerzo...</h3>
          <p class="adds-info-text">
            Los daycares que usan Acuarela , son parte de nuestra red de Daycares, en la cual padres de 
            familia de tu región pueden conocer tu servicio, instalaciones y atractivos. Esta red no tiene 
            costo adicional y se convertirá en una importante fuente de clientes potenciales para que hagas 
            crecer tu negocio desde el día uno.
          </p>
          <button
            class="btn btn--secondary"
            onclick="window.location.href='https://acuarela.app/planes-precios'"
          >
            Ver planes y precios
          </button>
        </div>
      </div>

      <img class="adds-image" src="img/add-on2.png" alt="Llega a más clientes sin más esfuerzo" />
    </div>

    <div class="add__ons__content">
      <img class="adds-image" src="img/add-on3.png" alt="Funciones que te permiten dedicar más tiempo a cuidar y menos a administrar…" />
     
      <div class="adds-content">
        <div class="adds-content-page type1">
          <div class="page-title">
            <h4>Gestión</h4>
          </div>
          <div class="page-line tipe1"></div>
          <div class="page-imagebox box3">
            <img src="img/feature-5white.svg" alt="Gestión" />
          </div>
        </div>

        <div class="adds-content-info">
          <h3 class="adds-info-title">Funciones que te permiten dedicar más tiempo a cuidar y menos a administrar…...</h3>
          <p class="adds-info-text">
            El control de eventos, contratos, documentación, asistentes, fichas de salud, gestión de ingresos / gastos, 
            entre otras 40 funciones de administración, te permitirán tener control de tu daycare fácilmente, y 
            dedicarte la mayoría de tu tiempo al cuidado del futuro del mundo: los niños.
            Con una inversión mínima y pocos conocimientos de internet, tendrás al alcance de tu tablet un 
            sinnúmero de herramientas que llevarán tu Daycare a otro nivel.
          </p>
          <button
            class="btn btn--secondary"
            onclick="window.location.href='https://acuarela.app/planes-precios'"
          >
            Ver planes y precios
          </button>
        </div>
      </div>
    </div>
  </section>


  <!-- TESTIMONIOS -->
  <section class="testimonial__section">
    <div class="testimonial">
      <h2>Testimonios</h2>
      <div class="testimonial__content">
        <img src="img\Flecha_izquierda.png" alt="Desplazar testimonios a la izquierda" />
        
        <div class="testimonial__content-view">
          <div class="testimonial__content-testimonio">
            <div class="testimonial__content-video"></div>
            <div class="testimonial__content-info">
              <div class="imgbox">
                <img src="img\Heart.svg" alt="Like" />
              </div>
              <h3>Ana Maria Murcia</h3>
              <h4>Daycare: Lovely</h3>
              <p>
                “Cuidar el medio ambiente es una de las cosas que más amo enseñarle a los niños de mi Daycare. 
                Con Acuarela App, ahora podré también reducir el uso de papel en la gestión de mi negocio.”
              </p>
            </div>
          </div>
        </div>

        <!-- <div class="testimonial__content-view">
          <div class="testimonial__content-testimonio">
            <div class="testimonial__content-video"></div>
            <div class="testimonial__content-info">
              <div class="imgbox">
                <img src="img\Heart.svg" alt="Like" />
              </div>
              <h3>Isabel de NWest Childcare</h3>
              <h4>Daycare: Lovely</h3>
              <p>
                “Siempre he tenido inconvenientes con que los padres del Daycare paguen a tiempo. 
                Ya quiero tener la app para hacer uso de esta función.”
              </p>
            </div>
          </div>
        </div> -->

        <img src="img\Flecha_derecha.png" alt="Desplazar testimonios a la derecha" />
      </div>
    </div>
  </section>


  <!-- PREGUNTAS FRECUENTES -->
  <?php include 'faq.php'; ?>


<!-- 
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
   <?php } ?> -->
</main>
<?php include 'includes/footer.php'; ?>
