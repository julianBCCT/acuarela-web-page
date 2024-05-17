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
        "email" => "Email",
        "phone" => "Phone",
        "hours" => "Hours of Operation",
        "address" => "Address",
        "mision" => "Mission",
        "vision" => "Vision",
        "philosophy" => "Philosophy of Education",
        "view-more" => "Read more",
        "admissions" => "Admissions",
        "social" => "Networks & Social Media",
        "credito" => "Website made with",
        "complete"=>"Complete your documents",
        "send"=>"Send your Medical Tests",
        "welcome"=>"Welcome to your New Daycare!",
        "complete-text"=>"Fill out our admission forms to get to know you and your child better.",
        "send-text"=>"Provide the results of your child's medical tests to ensure a safe environment.",
        "welcome-text"=>"Get ready to join our community and start this exciting adventure together!"
    ],
    "es" => [
        "about-us" => "Sobre Nosotros",
        "services" => "Servicios",
        "contact-us" => "Contáctanos",
        "visit" => "Agendar Visita",
        "email" => "Correo",
        "phone" => "Teléfono",
        "hours" => "Horario",
        "address" => "Dirección",
        "mision" => "Misión",
        "vision" => "Visión",
        "philosophy" => "Filosofía de Educación",
        "view-more" => "Ver más",
        "admissions" => "Admisiones",
        "social" => "Redes Sociales",
        "credito" => "Sitio web hecho con",
        "complete"=>"Completa tus Documentos",
        "send"=>"Envía tus Pruebas Médicas",
        "welcome"=>"¡Bienvenido a tu Nuevo Daycare!",
        "complete-text"=>"Llena nuestros formularios de admisión para conocerte mejor a ti y a tu hijo/a.",
        "send-text"=>"Proporciona los resultados de las pruebas médicas de tu hijo/a para garantizar un ambiente seguro.",
        "welcome-text"=>"¡Prepárate para unirte a nuestra comunidad y comenzar esta emocionante aventura juntos!"
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
        :root {
            --color-primario:
                <?= $info->acf->color_1 ?>;
            --color-secundario:
                <?= $info->acf->color_2 ?>;
            --titulos: #060606;
            --textos: #3e3e43;
            --fondo: #e0e0e0;
            --cards: #f4f4f5;
            --footer: #131727;
            --color-botones: #060606;
            --color-pasos: #131727;
        }
    </style>
</head>

<body>
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

        <a onclick="openNav()" href="#" class="menu"><button><i class="acuarela acuarela-Justificar"></i></button></a>

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

    <main>
        <div class="portada">
            <img class="img-portada" src="<?= $info->acf->banner_principal ?>" />
        </div>
        <section class="about-us" id="about-us">
            <div class="card">
                <img src=" <?= $info->acf->logo ?>" alt="logo" class="logo" />
                <div class="info">
                    <div class="info-esp">
                        <h2><?= $info->title->rendered ?></h2>
                        <div class="location">
                            <i class="acuarela acuarela-Localizacion"></i>
                            <p><?= $info->acf->ciudad ?></p>
                        </div>
                    </div>
                    <p><?= $info->content->rendered ?></p>
                </div>
            </div>
        </section>
        <section class="tour">
            <div class="sidebars">
                <div class="sidebar-left">
                    <div class="galeria-1 card">
                        <ul class="image-gallery-1">
                            <li>
                                <img src="<?= $info->acf->imagen_1->url ?>" alt="Image 1" />
                            </li>
                            <li>
                                <img src="<?= $info->acf->imagen_2->url ?>" alt="Image 2" />
                            </li>
                            <li>
                                <img src="<?= $info->acf->imagen_3->url ?>" alt="Image 3" />
                            </li>
                            <?php if ($info->acf->imagen_4->url) { ?>
                                <li>
                                    <img src="<?= $info->acf->imagen_4->url ?>" alt="Image 4" />
                                </li>
                            <?php } ?>
                            <?php if ($info->acf->imagen_5->url) { ?>
                                <li>
                                    <img src="<?= $info->acf->imagen_5->url ?>" alt="Image 5" />
                                </li>
                            <?php } ?>
                        </ul>
                        <button class="prev-btn-1">
                            <i class="acuarela acuarela-Flecha_izquierda"></i>
                        </button>
                        <button class="next-btn-1">
                            <i class="acuarela acuarela-Flecha_derecha"></i>
                        </button>
                    </div>
                    <div class="popup-container-1">
                        <div class="popup-content-1">
                            <span class="close-btn-1">&times;</span>
                            <img class="popup-image-1" src="" alt="Popup Image" />
                        </div>
                    </div>
                    <div id="details_card" class="details card">
                        <div class="detail">
                            <i class="acuarela acuarela-Mensajes"></i>
                            <div class="text">
                                <a href="mailto:<?= $info->acf->correo ?>;"><b><?= $titulos[$idioma_contenido]["email"] ?></b></a>
                                <p><?= $info->acf->correo ?></p>
                            </div>
                        </div>
                        <div class="detail">
                            <i class="acuarela acuarela-Telefono"></i>
                            <div class="text">
                                <a href="tel:<?= $info->acf->telefono ?>;"><b><?= $titulos[$idioma_contenido]["phone"] ?></b></a>
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
                    </div>
                    <div class="address card">
                        <b><?= $titulos[$idioma_contenido]["address"] ?></b>
                        <?
                        $direccion = str_replace(' ', '+', $info->acf->direccion);
                        $url = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAw2qBynYleldgejZ6JGPjXpkoDMhabqis&q=";
                        $url .= $direccion;
                        ?>
                        <iframe frameborder="0" style="border: 0" referrerpolicy="no-referrer-when-downgrade"
                            src="<?= $url ?>" allowfullscreen>
                        </iframe>
                        <div class="info-address">
                            <p><?= $info->acf->direccion ?></p>
                        </div>
                    </div>
                    <div class="img card">
                        <img src="<?= $info->acf->seccion_1->imagen ?>" alt="image" />
                    </div>
                </div>
                <div class="sidebar-right">
                    <div class="galeria card">
                        <ul class="image-gallery">
                            <li>
                                <img src="<?= $info->acf->imagen_1->url ?>" alt="Image 1" />
                            </li>
                            <li>
                                <img src="<?= $info->acf->imagen_2->url ?>" alt="Image 2" />
                            </li>
                            <li>
                                <img src="<?= $info->acf->imagen_3->url ?>" alt="Image 3" />
                            </li>
                            <?php if ($info->acf->imagen_4->url) { ?>
                                <li>
                                    <img src="<?= $info->acf->imagen_4->url ?>" alt="Image 4" />
                                </li>
                            <?php } ?>
                            <?php if ($info->acf->imagen_5->url) { ?>
                                <li>
                                    <img src="<?= $info->acf->imagen_5->url ?>" alt="Image 5" />
                                </li>
                            <?php } ?>
                        </ul>
                        <button class="prev-btn">
                            <i class="acuarela acuarela-Flecha_izquierda"></i>
                        </button>
                        <button class="next-btn">
                            <i class="acuarela acuarela-Flecha_derecha"></i>
                        </button>
                    </div>
                    <div class="popup-container">
                        <div class="popup-content">
                            <span class="close-btn">&times;</span>
                            <img class="popup-image" src="" alt="Popup Image" />
                        </div>
                    </div>
                    <div class="mision-vision card">
                        <b><?= $titulos[$idioma_contenido]["mision"] ?></b>
                        <div class="text-container">
                            <p class="text-content">
                                <?= $info->acf->mision ?>
                            </p>
                            <div class="boton-ver">
                                <button class="read-more-btn" data-lang="<?= $idioma_contenido ?>"><?= $titulos[$idioma_contenido]["view-more"] ?><i
                                        class="acuarela acuarela-Flecha_abajo"></i></button>
                            </div>
                        </div>
                        <b><?= $titulos[$idioma_contenido]["vision"] ?></b>
                        <div class="text-container">
                            <p class="text-content">
                                <?= $info->acf->vision ?>
                            </p>
                            <div class="boton-ver">
                                <button class="read-more-btn" data-lang="<?= $idioma_contenido ?>"><?= $titulos[$idioma_contenido]["view-more"] ?><i
                                        class="acuarela acuarela-Flecha_abajo"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="philosophy">
            <div class="of-education">
                <b><?= $titulos[$idioma_contenido]["philosophy"] ?></b>
                <div class="text-container">
                    <p class="text-content">
                        <?= $info->acf->filosofia_de_educacion ?>
                    </p>
                    <div class="boton-ver">
                        <button class="read-more-btn" data-lang="<?= $idioma_contenido ?>"><?= $titulos[$idioma_contenido]["view-more"] ?><i
                                class="acuarela acuarela-Flecha_abajo"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <?php
        if (
            $info->acf->servicios != ""
        ) {
            ?>
            <section class="services" id="services">
                <div class="services-tags">
                    <b><?= $titulos[$idioma_contenido]["services"] ?></b>
                    <div class="tags">
                        <?= $info->acf->servicios ?>
                    </div>
                </div>
            </section>
            <?php
        }
        ?>
        <section class="steps" id="steps">
            <div class="container-steps">
                <b><?= $titulos[$idioma_contenido]["admissions"] ?></b>
                <ul class="card">
                    <li class="hovered">
                        <div class="subtitulo">
                            <h2>1</h2><b><?= $titulos[$idioma_contenido]["complete"] ?></b>
                        </div>
                        <p><?= $titulos[$idioma_contenido]["complete-text"] ?></p>
                    </li>
                    <li class="hovered">
                        <div class="subtitulo">
                            <h2>2</h2><b><?= $titulos[$idioma_contenido]["send"] ?></b>
                        </div>
                        <p><?= $titulos[$idioma_contenido]["send-text"] ?></p>
                    </li>
                    <li class="hovered">
                        <div class="subtitulo">
                            <h2>3</h2><b><?= $titulos[$idioma_contenido]["welcome"] ?></b>
                        </div>
                        <p><?= $titulos[$idioma_contenido]["welcome-text"] ?></p>
                    </li>
                </ul>
            </div>
        </section>
        <?php
        if (
            $info->acf->facebook != "" ||
            $info->acf->instagram != "" ||
            $info->acf->tiktok != "" ||
            $info->acf->twitter != ""
        ) {
            ?>
            <section class="contact" id="contact-us">
                <div class="social-media">
                    <b><?= $titulos[$idioma_contenido]["social"] ?></b>
                    <div class="icons">
                        <?php if ($info->acf->facebook != "") { ?>
                            <a href="<?= $info->acf->facebook ?>" target="_blank" class="socialContainer containerOne">
                                <svg class="socialSvg facebookSvg" viewBox="0 0 16 16">
                                    <path d="M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z"></path>
                                </svg>
                            </a>
                        <?php } ?>
                        <?php if ($info->acf->instagram != "") { ?>
                            <a href="<?= $info->acf->instagram ?>" target="_blank" class="socialContainer containerTwo">
                                <svg class="socialSvg instagramSvg" viewBox="0 0 16 16">
                                    <path
                                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z">
                                    </path>
                                </svg>
                            </a>
                        <?php } ?>
                        <?php if ($info->acf->tiktok != "") { ?>
                            <a href="<?= $info->acf->tik_tok ?>" target="_blank" class="socialContainer containerThree">
                                <svg class="socialSvg tiktokSvg" viewBox="0 0 16 16">
                                    <path
                                        d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h22c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
                                </svg>
                            </a>
                        <?php } ?>
                        <?php if ($info->acf->twitter != "") { ?>
                            <a class="socialContainer containerFour" href="<?= $info->acf->twitter ?>" target="_blank">
                                <svg viewBox="0 0 16 16" class="socialSvg twitterSvg">
                                    <path
                                        d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z">
                                    </path>
                                </svg>
                            </a>
                        <?php } ?>
                    </div>
                </div>
            </section>
            <?php
        }
        ?>
        <a href="https://wa.me/+1<?= $info->acf->telefono ?>" class="btn-wsp" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40px" height="53px">
                <path
                    d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z" />
            </svg>
        </a>
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

</html>