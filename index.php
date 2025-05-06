<?php include 'includes/header.php';

$home = json_decode(json_encode($a->gHome()), true);
$banner = $home['acf']['banner'];
$features = $home['acf']['features'];
$isVideo = substr($banner['imagen'], -4) === '.mp4';

?>

<main class="containerheader">
  <!-- BANNER -->
  <section class="banner">
    <?= $banner['titulo'] ?>

    <div class="banner__content">
      <div class="banner__media">
        <div class="video-container">
          <?php if ($isVideo): ?>
            <button type="button" onclick="unMutedVideo()" id="unmutedBtn">
              <img src="img/volOff.svg" alt="unmuted" />
            </button>
            <video id="video1" src="<?= $banner['imagen'] ?>" playsinline preload="auto" autoplay muted loop>
              <source src="<?= $banner['imagen'] ?>" type="video/mp4">
            </video>
          <?php else: ?>
            <img src="<?= $banner['imagen'] ?>" alt="Banner" class="banner__image" />
          <?php endif; ?>
        </div>
        <div class="pink-square">
          <img class="video__logo" src="img/Logo_AC.png" alt="Acuarela" />
        </div>
      </div>

      <div class="banner__content-info">
        <h2 class="banner__subtitle">
          <?= $banner['subtitulo'] ?>
        </h2>
        <div class="banner__buttons">
          <button class="btn btn--primarywhite"
            onclick="window.location.href='<?= $banner['link_boton_1'] ?: 'https://acuarela.app/planes-precios' ?>'">
            <?= $banner['texto_boton_1'] ?>
          </button>

          <button class="btn btn--secondary" id="openModalBtn">
            <?= $banner['texto_boton_2'] ?>
          </button>
          <div id="modalOverlay" class="modal-overlay hidden">
            <div class="modal-box">
              <img src="img/Cerrar.svg" alt="Cerrar" id="closeModalBtn" class="close-btn" />
              <div class="modal-inner">
                <div class="modal-left">
                  <h3>¡Empieza ahora!</h3>
                  <form id="demoForm" class="modal-form">
                    <input type="text" name="nombre" placeholder="Nombre" required />
                    <input type="text" name="apellidos" placeholder="Apellidos" required />
                    <input type="email" name="email" placeholder="Email" required />
                    <input type="text" name="daycare" placeholder="Daycare" required />
                    <input type="number" name="num_ninos" placeholder="Número de niños" required />
                    <!-- Aquí se inserta el reCAPTCHA de Google -->
                    <div class="recaptcha-container">
                      <!-- Reemplaza con tu clave de sitio reCAPTCHA -->
                      <div class="g-recaptcha" data-sitekey="TU_CLAVE_RECAPTCHA"></div>
                    </div>
                    <button type="submit" class="submit-btn">
                      Recibir <span class="bold-text">DEMO</span>
                    </button>
                  </form>
                </div>
                <div class="modal-right">
                  <div>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                      the industry's standard dummy text ever since the 1500s.</p>
                    <img src="img/logo_w.svg" alt="Logo Acuarela" />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        <h2 class="features__title"><?= $features['titulo_daycare_10de10'] ?></h2>
        <?php if (!empty($features['texto_boton_daycare_10de10']) && !empty($features['link_boton_daycare_10de10'])): ?>
          <button class="btn btn--secondary"
            onclick="window.location.href='<?= $features['link_boton_daycare_10de10'] ?>'">
            <?= $features['texto_boton_daycare_10de10'] ?>
          </button>
        <?php endif; ?>
      </div>

      <div class="features-cont">
        <?php
        for ($i = 1; $i <= 4; $i++) {
          $caracteristica = $features["caracteristica_$i"];
          echo '
            <div class="features-cont__feature-feature subs' . $i . '">
              <div class="feature__image img' . $i . '">
                <img class="img-feature" style="filter: brightness(0) invert(1);" src="' . $caracteristica['icono'] . '" alt="' . htmlspecialchars($caracteristica['titulo']) . '" />
              </div>
              <h3 class="feature-titleinfo">' . $caracteristica['titulo'] . '</h3>
              <p class="feature-textinfo">' . $caracteristica['descripcion'] . '</p>
            </div>
          ';
        }
        ?>
      </div>
    </div>
  </section>

  <!-- ADD-ONS -->
  <section class="add__ons" id="nosotros">
  </section>


  <!-- TESTIMONIOS -->
  <section class="testimonial__section" id="testimonios-section">
    <div class="testimonial">
      <h2>Testimonios</h2>
      <div class="testimonial__content">
        <img src="img\Flecha_izquierda.png" alt="Desplazar testimonios a la izquierda" />

        <div class="testimonial__content-view">
          <div class="testimonial__slider-track">

          </div>
        </div>

        <img src="img\Flecha_derecha.png" alt="Desplazar testimonios a la derecha" />
      </div>
    </div>
  </section>


  <!-- PREGUNTAS FRECUENTES -->
  <?php include 'faq.php'; ?>
</main>
<script>
  // Cargar datos dinámicamente
  document.addEventListener("DOMContentLoaded", function () {
    const urls = {
      homeSections: '/g/getHomeSections/',
      testimonios: '/g/getTestimonios/',
    };

    function fetchData(url) {
      return fetch(url)
        .then(response => response.ok ? response.json() : Promise.reject(`Error: ${response.status}`))
        .catch(error => {
          console.error(`Error loading ${url}:`, error);
          return [];
        });
    }

    Promise.all([
      fetchData(urls.homeSections),
      fetchData(urls.testimonios),
    ]).then(([homeSections, testimonios]) => {
      const homeSectionsContainer = document.getElementById('nosotros');

      if (homeSectionsContainer && Array.isArray(homeSections)) {
        homeSectionsContainer.innerHTML = homeSections.map((section, index) => {
          const title = section.title.rendered;
          const content = section.content.rendered;
          const categoria = section.acf.categoria || '';
          const imagen = section.acf.imagen || '';
          const textoBoton = section.acf.texto_boton || 'Ver más';
          const linkBoton = section.link || 'https://acuarela.app/planes-precios';

          // Alternar tipo visual según el índice
          const isEven = index % 2 === 0;
          const type = isEven ? 'type1' : 'type2';
          const box = `box${index + 1}`;
          const lineClass = isEven ? 'tipe1' : 'tipe2';
          const infoClass = isEven ? 'pri' : 'sec';

          return `
          <div class="add__ons__content">
            ${isEven ? `<img class="adds-image" src="${imagen}" alt="${title}" />` : ''}
            <div class="adds-content">
              <div class="adds-content-page ${type}">
                ${!isEven ? `<div class="page-imagebox ${box}">
                  <img src="${categoria === "Finanzas"
                ? "img/feature-4white.svg"
                : categoria === "Mensajería"
                  ? "img/feature-2white.svg"
                  : categoria === "Gestión"
                    ? "img/feature-5white.svg"
                    : ""
              }" alt="${categoria}" />
                </div>` : ''}
                <div class="page-line ${lineClass}"></div>
                <div class="page-title">
                  <h4>${categoria}</h4>
                </div>
                ${isEven ? `<div class="page-imagebox ${box}">
                  <img src="img/feature-${index + 1}white.svg" alt="${categoria}" />
                </div>` : ''}
              </div>
              <div class="adds-content-info ${infoClass}">
                <h3 class="adds-info-title" style="margin-bottom:0;">${title}</h3>
                <p class="adds-info-text">${content}</p>
                <button class="btn btn--secondary" style="margin-top:15px;" onclick="window.location.href='${linkBoton}'">
                  ${textoBoton}
                </button>
              </div>
            </div>
            ${!isEven ? `<img class="adds-image" src="${imagen}" alt="${title}" />` : ''}
          </div>
        `;
        }).join('');
      }

      // Renderizar testimonios
      const testimoniosContainer = document.querySelector(".testimonial__slider-track");

      if (testimoniosContainer && Array.isArray(testimonios)) {
        testimoniosContainer.innerHTML = testimonios.map(t => {
          const media = t.acf.imagen_o_video || '';
          const isVideo = /\.(mp4|webm|ogg)$/i.test(media);

          const mediaHTML = isVideo
            ? `<video src="${media}" controls style="height: 100%; width: 100%; border-radius: 25px; object-fit: cover;"></video>`
            : ''; // si es imagen lo manejamos como background en el div

          return `
            <div class="testimonial__slide">
              <div class="testimonial__content-video" style="${!isVideo ? `background-image: url('${media}'); background-size: cover; background-position: center;` : ''}">
                ${mediaHTML}
              </div>
              <div class="testimonial__content-info">
                <div class="imgbox">
                  <img src="img/Heart.svg" alt="Like" />
                </div>
                <h3>${t.title.rendered}</h3>
                <h4>${t.acf.cargo || ''}</h4>
                <p>${t.content.rendered}</p>
              </div>
            </div>
          `;
        }).join('');
        attachSliderListeners();
      }
    });
  });
</script>
<?php include 'includes/footer.php'; ?>