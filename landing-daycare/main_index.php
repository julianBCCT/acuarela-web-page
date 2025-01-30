<?php include 'includes/config.php';
$protocol = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$url = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$nameUrl = explode('.', $url);
$info = $land->gInfoDaycare($nameUrl[0]);

function obtener_idioma_contenido($idioma_acf)
{
    if ($idioma_acf === 'Ingles') {
        return "en";
    } else if ($idioma_acf === 'Español') {
        return "es";
    }
}

// Determinar el idioma del contenido dinámico
$idioma_contenido = obtener_idioma_contenido($info->acf->idioma);

// Define los títulos en ambos idiomas
$titulos = [
    "en" => [
        "about-us" => "About Us",
        "services" => "Services",
        "contact-us" => "Contact Us",
        "visit" => "Schedule Visit",
        "main_phrase" => "An amazing experience to watch them grow",
        "more" => "I want to know more",
        "email" => "Email",
        "phone" => "Phone",
        "hours" => "Hours of Operation",
        "address" => "Address",
        "visit_btn" => "I want to schedule a visit",
        "mision" => "Mission",
        "mision_text" => "Our reason for being",
        "vision" => "Vision",
        "vision_text" => "Where are we going?",
        "philosophy" => "Philosophy of Education",
        "preinscription" => "Start pre-registration process",
        "view-more" => "Read more",
        "admissions" => "Admissions",
        "social" => "Networks & Social Media",
        "credito" => "Website made with",
        "complete" => "Complete your documents",
        "send" => "Send your Medical Tests",
        "welcome" => "Welcome to your New Daycare!",
        "complete-text" => "Fill out our admission forms to get to know you and your child better.",
        "send-text" => "Provide the results of your child's medical tests to ensure a safe environment.",
        "welcome-text" => "Get ready to join our community and start this exciting adventure together!",
        "disabled" => "Your website has been disabled",
        "disabled-text-1" => "We are sorry, this page is temporarily disabled. If you want to reactivate it or learn more about our services, please contact our sales team.",
        "disabled-text-2" => "Contact us at",
        "disabled-text-4" => "We are here to help you."
    ],
    "es" => [
        "about-us" => "Sobre Nosotros",
        "services" => "Servicios",
        "contact-us" => "Contáctanos",
        "visit" => "Agendar Visita",
        "main_phrase" => "Una experiencia increíble para verlos crecer",
        "more" => "Quiero saber más",
        "email" => "Correo",
        "phone" => "Teléfono",
        "hours" => "Horario",
        "address" => "Dirección",
        "visit_btn" => "Quiero agendar una visita",
        "mision" => "Misión",
        "mision_text" => "Nuestra razón de ser",
        "vision" => "Visión",
        "vision_text" => "¿Hacía dónde vamos?",
        "philosophy" => "Filosofía de Educación",
        "preinscription" => "Iniciar proceso de preinscripción",
        "view-more" => "Ver más",
        "admissions" => "Admisiones",
        "social" => "Redes Sociales",
        "credito" => "Sitio web hecho con",
        "complete" => "Completa tus Documentos",
        "send" => "Envía tus Pruebas Médicas",
        "welcome" => "¡Bienvenido a tu Nuevo Daycare!",
        "complete-text" => "Llena nuestros formularios de admisión para conocerte mejor a ti y a tu hijo/a.",
        "send-text" => "Proporciona los resultados de las pruebas médicas de tu hijo/a para garantizar un ambiente seguro.",
        "welcome-text" => "¡Prepárate para unirte a nuestra comunidad y comenzar esta emocionante aventura juntos!",
        "disabled" => "Tu website ha sido desactivado",
        "disabled-text-1" => "Lo sentimos, esta página se encuentra temporalmente desactivada. Si deseas reactivarla o conocer más sobre nuestros servicios, por favor, ponte en contacto con nuestro equipo de ventas.",
        "disabled-text-2" => "Contáctanos al",
        "disabled-text-4" => "Estamos aquí para ayudarte."
    ]
];

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="<?= $info->acf->color_1 ?>" />
    <meta name="twitter:card" value="summary" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="<?= $info->title->rendered ?>" />
    <meta property="og:url" content=" url" />
    <meta property="og:image" content="<?= $info->acf->banner_principal ?>" />
    <meta property="og:description" content="<?= $info->content->rendered ?>" />
    <title><?= $info->title->rendered ?></title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.3/dist/css/splide.min.css" />
    <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.3/dist/css/themes/splide-default.min.css" />
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/styles.css?v=<?= time() ?>" />
    <link rel="canonical" href="url" />
    <meta name="description" content="<?= $info->content->rendered ?>" />
    <style>
        #inactivo {
            font-family: "Montserrat", sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f4;
        }

        .container-inactivo {
            text-align: center;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
        }

        .message-box {
            color: #343434;
            border-radius: 8px;
        }

        :root {
            --color-primario:
                <?= $info->acf->color_1 ?>
            ;
            --color-secundario:
                <?= $info->acf->color_2 ?>
            ;
            --titulos: #3e3e43;
            --textos: #3e3e43;
            --fondo: #e0e0e0;
            --cards: #f4f4f5;
            --footer: #131727;
            --color-botones: #3e3e43;
            --color-pasos: #131727;
        }
    </style>
</head>

<?php if ($info->acf->activacion == "no"): ?>

    <body id="inactivo">
        <div class="container-inactivo">
            <img src="https://i.ibb.co/Qf2SPq8/Website-Not-Found.png" alt="Website-Not-Found" style="width: 100%" />
            <div class="message-box" style="background-color: #eb5d5e; margin: 20px 0; color: white">
                <img src="https://i.ibb.co/HqtJF7t/precaucion.png" alt="precaucion" />
                <h1 style="position: relative; font-size: 24px; bottom: 12px">
                    <?= $titulos[$idioma_contenido]["disabled"] ?>
                </h1>
            </div>
            <div class="message-box" style="text-align: center;">
                <p style="font-size: 16px; line-height: 1.5">
                    <?= $titulos[$idioma_contenido]["disabled-text-1"] ?>
                </p>
                <br />
                <p style="font-size: 16px; line-height: 1.5">
                    <?= $titulos[$idioma_contenido]["disabled-text-2"] ?>
                    <strong><a href="https://wa.me/19292789168" target="_blank"
                            style="color: #343434; text-decoration: underline;">
                            +1 (929) 278-9168</a></strong>. <?= $titulos[$idioma_contenido]["disabled-text-3"] ?>
                </p>
                <img src="https://i.ibb.co/K9qk9Tr/Logo-Acuarela.png" style="margin: 20px 0; width: 150px" />
            </div>
        </div>
    </body>



<?php else: ?>

    <body id="activo" class="main-body">
        <header>
            <div class="logo">
                <img src=" <?= $info->acf->logo ?>" alt="logo" class="logo" />
            </div>
            <nav>
                <ul class="nav-links">
                    <li><a href="#about-us"><?= $titulos[$idioma_contenido]["about-us"] ?></a></li>
                    <li><a href="#services"><?= $titulos[$idioma_contenido]["services"] ?></a></li>
                    <li><a href="#contact-us"><?= $titulos[$idioma_contenido]["contact-us"] ?></a></li>
                </ul>
            </nav>
            <a href="https://wa.me/+1<?= $info->acf->telefono ?>" target="_blank" class="btn">
                <button><i class="acuarela acuarela-Evento"></i><?= $titulos[$idioma_contenido]["visit"] ?></button>
            </a>

            <a onclick="openNav()" href="#" class="menu"><button><i class="acuarela acuarela-Justificar"
                        style="color: var(--color-botones);"></i></button></a>

            <div class="overlay" id="mobile-menu">
                <a onclick="closeNav()" href="" class="close"><i class="acuarela acuarela-Cancelar"></i></a>
                <div class="overlay-content">
                    <a onclick="closeNav()" href="#about-us"><?= $titulos[$idioma_contenido]["about-us"] ?></a>
                    <a onclick="closeNav()" href="#services"><?= $titulos[$idioma_contenido]["services"] ?></a>
                    <a onclick="closeNav()" href="#contact-us"><?= $titulos[$idioma_contenido]["contact-us"] ?></a>
                    <a onclick="closeNav()" href="https://wa.me/+1<?= $info->acf->telefono ?>" target="_blank"
                        class="btn"><button class="titulo-dinamico" data-key="visit">
                            <i class="acuarela acuarela-Evento"></i><?= $titulos[$idioma_contenido]["visit"] ?>
                        </button></a>
                </div>
            </div>
        </header>

        <main style="background-image: url('<?= $info->acf->imagen_fondo_web ?>');">
            <section class="main">
                <div class="logo-movil">
                    <img src=" <?= $info->acf->logo ?>" alt="logo" />
                </div>
                <div class="icons-1">
                    <?php if ($info->acf->instagram != "") { ?>
                        <a href="<?= $info->acf->instagram ?>" target="_blank" class="socialContainer containerTwo"
                            style="background-color: var(--color-primario);">
                            <svg class="socialSvg instagramSvg" viewBox="0 0 16 16">
                                <path
                                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z">
                                </path>
                            </svg>
                        </a>
                    <?php } ?>
                    <?php if ($info->acf->facebook != "") { ?>
                        <a href="<?= $info->acf->facebook ?>" target="_blank" class="socialContainer containerOne"
                            style="background-color: var(--color-secundario);">
                            <svg class="socialSvg facebookSvg" viewBox="0 0 16 16">
                                <path d="M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z"></path>
                            </svg>
                        </a>
                    <?php } ?>
                </div>
                <div class="logo">
                    <img src=" <?= $info->acf->logo ?>" alt="logo" />
                </div>
                <div class="icons-2">
                    <?php if ($info->acf->tiktok != "") { ?>
                        <a href="<?= $info->acf->tik_tok ?>" target="_blank" class="socialContainer containerThree"
                            style="background-color: var(--color-primario);">
                            <svg class="socialSvg tiktokSvg" viewBox="0 0 16 16">
                                <path
                                    d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h22c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
                            </svg>
                        </a>
                    <?php } ?>
                    <?php if ($info->acf->twitter != "") { ?>
                        <a class="socialContainer containerFour" href="<?= $info->acf->twitter ?>" target="_blank"
                            style="background-color: var(--color-secundario);">
                            <svg viewBox="0 0 16 16" class="socialSvg twitterSvg">
                                <path
                                    d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z">
                                </path>
                            </svg>
                        </a>
                    <?php } ?>
                </div>
            </section>
            <section class="hero">
                <div class="main">
                    <h1><?= $titulos[$idioma_contenido]["main_phrase"] ?></h1>
                    <p><?= $info->content->rendered ?></p>
                    <button><?= $titulos[$idioma_contenido]["more"] ?></button>
                </div>
                <div class="img" style="background-image: url('<?= $info->acf->banner_principal ?>');"></div>
            </section>
            <div class="wave">
                <div style="height: 150px; overflow: hidden;"><svg viewBox="0 0 500 150" preserveAspectRatio="none"
                        style="height: 100%; width: 100%;">
                        <path d="M0.00,49.98 C265.52,154.45 266.64,-24.16 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                            style="stroke: none;"></path>
                    </svg></div>
            </div>
            <section class="map-contact">
                <div class="address">
                    <?
                    $direccion = str_replace(' ', '+', $info->acf->direccion);
                    $url = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAw2qBynYleldgejZ6JGPjXpkoDMhabqis&q=";
                    $url .= $direccion;
                    ?>
                    <!-- <iframe frameborder="0" style="border: 0" referrerpolicy="no-referrer-when-downgrade"
                        src="<?= $url ?>" allowfullscreen>
                    </iframe> -->
                    <div class="info-address">
                        <p><?= $info->acf->direccion ?></p>
                    </div>
                </div>
                <div id="details_card" class="details">
                    <div class="detail">
                        <i class="acuarela acuarela-Mensajes"></i>
                        <div class="text">
                            <a
                                href="mailto:<?= $info->acf->correo ?>;"><b><?= $titulos[$idioma_contenido]["email"] ?></b></a>
                            <p><?= $info->acf->correo ?></p>
                        </div>
                    </div>
                    <div class="detail">
                        <i class="acuarela acuarela-Telefono"></i>
                        <div class="text">
                            <a
                                href="tel:<?= $info->acf->telefono ?>;"><b><?= $titulos[$idioma_contenido]["phone"] ?></b></a>
                            <p><?= $info->acf->telefono ?></p>
                        </div>
                    </div>
                    <div class="detail">
                        <i class="acuarela acuarela-Pendiente"></i>
                        <div class="text">
                            <b><?= $titulos[$idioma_contenido]["hours"] ?></b>
                            <p><?= $info->acf->horario ?></p>
                        </div>
                    </div>
                    <button><?= $titulos[$idioma_contenido]["visit_btn"] ?></button>
                </div>
            </section>
            <section class="galeria">
                <div class="galeria-1">
                    <div class="gallery-wrapper">
                        <ul class="image-gallery-1">
                            <li><img src="<?= $info->acf->imagen_1->url ?>" alt="Image 1"
                                    onclick="openImageModal(this.src)" /></li>
                            <li><img src="<?= $info->acf->imagen_2->url ?>" alt="Image 2"
                                    onclick="openImageModal(this.src)" /></li>
                            <li><img src="<?= $info->acf->imagen_3->url ?>" alt="Image 3"
                                    onclick="openImageModal(this.src)" /></li>
                            <?php if ($info->acf->imagen_4->url) { ?>
                                <li><img src="<?= $info->acf->imagen_4->url ?>" alt="Image 4"
                                        onclick="openImageModal(this.src)" /></li>
                            <?php } ?>
                            <?php if ($info->acf->imagen_5->url) { ?>
                                <li><img src="<?= $info->acf->imagen_5->url ?>" alt="Image 5"
                                        onclick="openImageModal(this.src)" /></li>
                            <?php } ?>
                        </ul>
                    </div>
                </div>
            </section>
            <!-- Modal para ver cada imagen de la galeria-->
            <div id="imageModal" class="modal">
                <span class="close-modal">&times;</span>
                <img id="modalImg" src="" alt="Imagen ampliada" />
            </div>
            <section class="mision" style="background-color: var(--color-primario);">
                <div class="main-content">
                    <h2><?= $titulos[$idioma_contenido]["mision_text"] ?></h2>
                    <p><?= $info->acf->mision ?></p>
                </div>
                <svg width="303" height="238" viewBox="0 0 303 238" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M140.278 66.3292L57 232H245L161.722 66.3292C157.291 57.5152 144.709 57.5152 140.278 66.3292Z"
                        stroke="white" stroke-width="10" />
                    <path
                        d="M156 5.5C156 2.73858 153.761 0.5 151 0.5C148.239 0.5 146 2.73858 146 5.5H156ZM156 57V5.5H146V57H156Z"
                        fill="var(--color-botones)" />
                    <path
                        d="M106.839 10.836C129.493 14.7807 142.96 9.88262 148.535 5.75493C149.275 5.20709 150.5 5.71901 150.5 6.6397V34.7341C150.5 35.186 150.187 35.5856 149.749 35.6953C126.205 41.5854 111.151 23.4874 105.758 12.1906C105.414 11.4712 106.054 10.6993 106.839 10.836Z"
                        stroke="white" stroke-width="10" />
                    <path
                        d="M79 132.068L94 158.068L57 232.068H9C23.1667 204.068 53.2 144.868 60 132.068C66.8 119.268 75.5 126.734 79 132.068Z"
                        stroke="white" stroke-width="10" />
                    <path
                        d="M224 132.068L209 158.068L246 232.068H294C279.833 204.068 249.8 144.868 243 132.068C236.2 119.268 227.5 126.734 224 132.068Z"
                        stroke="white" stroke-width="10" />
                </svg>
            </section>
            <div class="triangles" style="overflow:hidden;position: relative;top: -14px;">
                <svg width="1934" height="14" viewBox="0 0 1934 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M265.5 0L250.5 14H280L265.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M824.5 0L809.5 14H839L824.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1131 0L1116 14H1145.5L1131 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1580 0L1565 14H1594.5L1580 0Z" fill="var(--color-primario-claro)" />
                    <path d="M489.5 0L474.5 14H504L489.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1048.5 0L1033.5 14H1063L1048.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1497.5 0L1482.5 14H1512L1497.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1355 0L1340 14H1369.5L1355 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1804 0L1789 14H1818.5L1804 0Z" fill="var(--color-primario-claro)" />
                    <path d="M153.5 0L138.5 14H168L153.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M712.5 0L697.5 14H727L712.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M70.5 0L55.5 14H85L70.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M629.5 0L614.5 14H644L629.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M377.5 0L362.5 14H392L377.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M936.5 0L921.5 14H951L936.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1243 0L1228 14H1257.5L1243 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1692 0L1677 14H1706.5L1692 0Z" fill="var(--color-primario-claro)" />
                    <path d="M320.5 0L305.5 14H335L320.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M879.5 0L864.5 14H894L879.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1186 0L1171 14H1200.5L1186 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1635 0L1620 14H1649.5L1635 0Z" fill="var(--color-primario-claro)" />
                    <path d="M544.5 0L529.5 14H559L544.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1103.5 0L1088.5 14H1118L1103.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1552.5 0L1537.5 14H1567L1552.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1410 0L1395 14H1424.5L1410 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1859 0L1844 14H1873.5L1859 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1440 0L1425 14H1454.5L1440 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1889 0L1874 14H1903.5L1889 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1919 0L1904 14H1933.5L1919 0Z" fill="var(--color-primario-claro)" />
                    <path d="M208.5 0L193.5 14H223L208.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M767.5 0L752.5 14H782L767.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M432.5 0L417.5 14H447L432.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M991.5 0L976.5 14H1006L991.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1298 0L1283 14H1312.5L1298 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1747 0L1732 14H1761.5L1747 0Z" fill="var(--color-primario-claro)" />
                    <path d="M238 0L223 14H252.5L238 0Z" fill="var(--color-primario-claro)" />
                    <path d="M797 0L782 14H811.5L797 0Z" fill="var(--color-primario-claro)" />
                    <path d="M462 0L447 14H476.5L462 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1021 0L1006 14H1035.5L1021 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1470 0L1455 14H1484.5L1470 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1327.5 0L1312.5 14H1342L1327.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1776.5 0L1761.5 14H1791L1776.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M126 0L111 14H140.5L126 0Z" fill="var(--color-primario-claro)" />
                    <path d="M685 0L670 14H699.5L685 0Z" fill="var(--color-primario-claro)" />
                    <path d="M43 0L28 14H57.5L43 0Z" fill="var(--color-primario-claro)" />
                    <path d="M602 0L587 14H616.5L602 0Z" fill="var(--color-primario-claro)" />
                    <path d="M15 0L0 14H29.5L15 0Z" fill="var(--color-primario-claro)" />
                    <path d="M574 0L559 14H588.5L574 0Z" fill="var(--color-primario-claro)" />
                    <path d="M350 0L335 14H364.5L350 0Z" fill="var(--color-primario-claro)" />
                    <path d="M909 0L894 14H923.5L909 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1215.5 0L1200.5 14H1230L1215.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1664.5 0L1649.5 14H1679L1664.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M293 0L278 14H307.5L293 0Z" fill="var(--color-primario-claro)" />
                    <path d="M852 0L837 14H866.5L852 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1158.5 0L1143.5 14H1173L1158.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1607.5 0L1592.5 14H1622L1607.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M517 0L502 14H531.5L517 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1076 0L1061 14H1090.5L1076 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1525 0L1510 14H1539.5L1525 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1382.5 0L1367.5 14H1397L1382.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1831.5 0L1816.5 14H1846L1831.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M181 0L166 14H195.5L181 0Z" fill="var(--color-primario-claro)" />
                    <path d="M740 0L725 14H754.5L740 0Z" fill="var(--color-primario-claro)" />
                    <path d="M98 0L83 14H112.5L98 0Z" fill="var(--color-primario-claro)" />
                    <path d="M657 0L642 14H671.5L657 0Z" fill="var(--color-primario-claro)" />
                    <path d="M405 0L390 14H419.5L405 0Z" fill="var(--color-primario-claro)" />
                    <path d="M964 0L949 14H978.5L964 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1270.5 0L1255.5 14H1285L1270.5 0Z" fill="var(--color-primario-claro)" />
                    <path d="M1719.5 0L1704.5 14H1734L1719.5 0Z" fill="var(--color-primario-claro)" />
                </svg>
            </div>
            <section class="vision" style="background-color: var(--color-primario-claro);">
                <svg width="316" height="324" viewBox="0 0 316 324" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M279.148 71.2813L99.6525 87.3338C98.7612 87.4135 98.4152 88.534 99.1065 89.1023L255.959 218.049C256.557 218.54 257.463 218.195 257.582 217.431L280.225 72.4316C280.325 71.7892 279.796 71.2234 279.148 71.2813Z"
                        stroke="#E68972" stroke-width="8" />
                    <path
                        d="M153.461 188.059L153.855 136.562C153.858 136.188 154.07 135.846 154.404 135.677L272.485 75.8812C273.521 75.3564 274.468 76.7228 273.614 77.5092L153.461 188.059ZM153.461 188.059L205.502 179.301M124.726 211.373C69.8165 257.015 18.6825 206.119 42.6952 187.074C71.21 164.458 98.6137 259.163 4.00004 250.491"
                        stroke="#E68972" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="main-content">
                    <h2><?= $titulos[$idioma_contenido]["vision_text"] ?></h2>
                    <p><?= $info->acf->vision ?></p>
                </div>
            </section>
            <section class="philosophy">
                <div class="main-content">
                    <h2><?= $titulos[$idioma_contenido]["mision_text"] ?></h2>
                    <p><?= $info->acf->filosofia_de_educacion ?></p>
                </div>
                <div class="logo">
                    <img src=" <?= $info->acf->logo ?>" alt="logo" />
                </div>
            </section>
            <?php
            if (
                $info->acf->servicios != ""
            ) {
                ?>
                <section class="services" id="services">
                    <div class="services-tags">
                        <div class="tags">
                            <?= $info->acf->servicios ?>
                        </div>
                    </div>
                    <button><?= $titulos[$idioma_contenido]["preinscription"] ?></button>
                </section>
                <?php
            }
            ?>
            <section class="admission">
                <div class="main-content">
                <h2><?= $titulos[$idioma_contenido]["admissions"] ?></h2>
                </div>
                <form action="" class="preregistration">

                </form>
            </section>
            <section class="faqs">
                <details>
                    <summary>¿Cuántos niños cuida cada persona?</summary>
                    <p>Garantizamos atención personalizada...</p>
                </details>
                <details>
                    <summary>¿Qué horarios tienen?</summary>
                    <p>Contamos con horarios flexibles...</p>
                </details>
            </section>

            <div id="whatsapp">
                <a href="https://wa.me/+1<?= $info->acf->telefono ?>" target="_blank" id="toggle1" class="wtsapp">

                    <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision"
                        text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd"
                        clip-rule="evenodd" viewBox="0 0 510 512.459">
                        <path fill="#FFFFFF"
                            d="M435.689 74.468C387.754 26.471 324 .025 256.071 0 116.098 0 2.18 113.906 2.131 253.916c-.024 44.758 11.677 88.445 33.898 126.946L0 512.459l134.617-35.311c37.087 20.238 78.85 30.891 121.345 30.903h.109c139.949 0 253.88-113.917 253.928-253.928.024-67.855-26.361-131.645-74.31-179.643v-.012zm-179.618 390.7h-.085c-37.868-.011-75.016-10.192-107.428-29.417l-7.707-4.577-79.886 20.953 21.32-77.889-5.017-7.987c-21.125-33.605-32.29-72.447-32.266-112.322.049-116.366 94.729-211.046 211.155-211.046 56.373.025 109.364 22.003 149.214 61.903 39.853 39.888 61.781 92.927 61.757 149.313-.05 116.377-94.728 211.058-211.057 211.058v.011zm115.768-158.067c-6.344-3.178-37.537-18.52-43.358-20.639-5.82-2.119-10.044-3.177-14.27 3.178-4.225 6.357-16.388 20.651-20.09 24.875-3.702 4.238-7.403 4.762-13.747 1.583-6.343-3.178-26.787-9.874-51.029-31.487-18.86-16.827-31.597-37.598-35.297-43.955-3.702-6.355-.39-9.789 2.775-12.943 2.849-2.848 6.344-7.414 9.522-11.116s4.225-6.355 6.343-10.581c2.12-4.238 1.06-7.937-.522-11.117-1.584-3.177-14.271-34.409-19.568-47.108-5.151-12.37-10.385-10.69-14.269-10.897-3.703-.183-7.927-.219-12.164-.219s-11.105 1.582-16.925 7.939c-5.82 6.354-22.209 21.709-22.209 52.927 0 31.22 22.733 61.405 25.911 65.642 3.177 4.237 44.745 68.318 108.389 95.812 15.135 6.538 26.957 10.446 36.175 13.368 15.196 4.834 29.027 4.153 39.96 2.52 12.19-1.825 37.54-15.353 42.824-30.172 5.283-14.818 5.283-27.529 3.701-30.172-1.582-2.641-5.819-4.237-12.163-7.414l.011-.024z" />
                    </svg>
                </a>
            </div>
        </main>
        <footer>
            <p><?= $titulos[$idioma_contenido]["credito"] ?></p>
            <img src="https://i.ibb.co/K9qk9Tr/Logo-Acuarela.png" alt="Logo-Acuarela" border="0">
        </footer>
        <script src="js/landing.js?v=<?= time() ?>"></script>
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.3/dist/js/splide.min.js"></script>
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    </body>

<?php endif; ?>

</html>