<?php include 'includes/config.php';

$protocol = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$url = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$nameUrl = explode('.', $url);
//$info = $land->gInfoDaycare($nameUrl[0]);
$webInfo = $land->gInfoDaycareStrapi($nameUrl[0]);
$_SESSION['webInfo_id'] = $webInfo->id;

function obtener_idioma_contenido($idioma_acf)
{
    if ($idioma_acf === 'Ingles') {
        return "en";
    } else if ($idioma_acf === 'Espanol') {
        return "es";
    }
}





// Determinar el idioma del contenido dinámico
$idioma_contenido = obtener_idioma_contenido($webInfo->idioma);

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
    <meta name="theme-color" content="<?= $webInfo->color_1?>" />
    <meta name="twitter:card" value="summary" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="<?= $webInfo->nombre?>" />
    <meta property="og:url" content=" url" />
    <meta property="og:image" content="<?= $webInfo->banner_principal->url ?>" />
    <meta property="og:description" content="<?= $webInfo->descripcion ?>" />
    <title><?= $webInfo->nombre ?></title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.3/dist/css/splide.min.css" />
    <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.3/dist/css/themes/splide-default.min.css" />
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/styles.css?v=<?= time() ?>" />
    <link rel="canonical" href="url" />
    <meta name="description" content="<?= $webInfo->descripcion ?>" />
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
                <?=$webInfo->color_1 ?>
            ;
            --color-secundario:
                <?= $webInfo->color_2 ?>
            ;
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

    <body id="activo">
        <header>
            <div class="logo">
                <img src="https://acuarelacore.com/api<?= $webInfo->logo_web->url?>" alt="logo" class="logo" />
            </div>
            <nav>
                <ul class="nav-links">
                    <li><a href="#about-us"><?= $titulos[$idioma_contenido]["about-us"] ?></a></li>
                    <li><a href="#services"><?= $titulos[$idioma_contenido]["services"] ?></a></li>
                    <li><a href="#contact-us"><?= $titulos[$idioma_contenido]["contact-us"] ?></a></li>
                </ul>
            </nav>
            <a href="https://wa.me/+1<?= $webInfo->telefono ?>" target="_blank" class="btn">
                <button><i class="acuarela acuarela-Evento"></i><?= $titulos[$idioma_contenido]["visit"] ?></button>
            </a>

            <a onclick="openNav()" href="#" class="menu"><button><i class="acuarela acuarela-Justificar"></i></button></a>

            <div class="overlay" id="mobile-menu">
                <a onclick="closeNav()" href="" class="close"><i class="acuarela acuarela-Cancelar"></i></a>
                <div class="overlay-content">
                    <a onclick="closeNav()" href="#about-us"><?= $titulos[$idioma_contenido]["about-us"] ?></a>
                    <a onclick="closeNav()" href="#services"><?= $titulos[$idioma_contenido]["services"] ?></a>
                    <a onclick="closeNav()" href="#contact-us"><?= $titulos[$idioma_contenido]["contact-us"] ?></a>
                        <a onclick="closeNav()" href="https://wa.me/+1<?= $webInfo->telefono ?>" target="_blank"
                        class="btn"><button class="titulo-dinamico" data-key="visit">
                            <i class="acuarela acuarela-Evento"></i><?= $titulos[$idioma_contenido]["visit"] ?>
                        </button></a>
                </div>
            </div>
        </header>

        <main style="background-image: url('<?= $webInfo->banner_principal->url ?>');">
            <div id="edit-topbar">
                <div class="container">
                    <span class="edit-mode-label">Estás en modo de edición</span>
                    <button id="exit-edit-mode" onclick="exitEditMode()">Salir de edición</button>
                </div>
            </div>


            <div class="portada">
                <img class="img-portada" src="https://acuarelacore.com/api<?= $webInfo->banner_principal->url?>" />
                <span class="edit-icon" onclick="enableEdit(this)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                        </svg>
                        Editar
                </span>
            </div>
            <section class="about-us" id="about-us">
                <div class="card">
                    <img src="https://acuarelacore.com/api<?= $webInfo->logo_web->url?>" alt="logo" class="logo" />
                    <div class="info">
                        <div class="info-esp">
                            <h2 contenteditable="false" data-field="nombre">
                                <?= $webInfo->nombre ?>
                            </h2> 
                            <div class="location">
                                <i class="acuarela acuarela-Localizacion"></i>
                                <p contenteditable="false" data-field="ciudad">
                                    <?= $webInfo->ciudad ?> 
                                </p>
                            </div>
                        </div>
                        <p contenteditable="false" data-field="descripcion">
                            <?= $webInfo->descripcion ?> 
                        </p>
                    </div>
                    <span class="edit-icon" onclick="enableEdit(this)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                        </svg>
                        Editar
                    </span>
                </div>
            </section>


            <section class="tour">
                <div class="sidebars">
                    <div class="sidebar-left">
                        <div class="galeria-1 card">
                            <ul class="image-gallery-1">
                                <li>
                                    <img src="https://acuarelacore.com/api<?= $webInfo->galeria[0]->url ?>" alt="Image 1" />
                                </li>
                                <li>
                                    <img src="https://acuarelacore.com/api<?= $webInfo->galeria[1]->url  ?>" alt="Image 2" />
                                </li>
                                <li>
                                    <img src="https://acuarelacore.com/api<?= $webInfo->galeria[2]->url  ?>" alt="Image 3" />
                                </li>
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
                                        
                                    <a
                                        href="mailto:<?= $webInfo->correo ?>;"><b><?= $titulos[$idioma_contenido]["email"] ?></b></a>
                                    <p data-field="correo"> <?= $webInfo->correo ?></p>
                                </div>
                            </div>
                            <div class="detail">
                                <i class="acuarela acuarela-Telefono"></i>
                                <div class="text">
                                    <a
                                        href="tel:<?= $webInfo->telefono ?>;"><b><?= $titulos[$idioma_contenido]["phone"] ?></b></a>
                                    <p data-field="telefono">
                                        <?= $webInfo->telefono ?>
                                    </p>
                                </div>
                            </div>
                            <div class="detail">
                                <i class="acuarela acuarela-Pendiente"></i>
                                <div class="text">
                                    <b><?= $titulos[$idioma_contenido]["hours"] ?></b>
                                    <p data-field="horario">
                                        <?= $webInfo->horario ?>
                                    </p>
                                </div>
                            </div>
                            <span class="edit-icon" onclick="enableEdit(this)">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                                </svg>
                                Editar
                            </span>
                        </div>
                        <div class="address card">
                            <b><?= $titulos[$idioma_contenido]["address"] ?></b>
                            <?
                            $direccion = str_replace(' ', '+', $webInfo->direccion);
                            $url = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAw2qBynYleldgejZ6JGPjXpkoDMhabqis&q=";
                            $url .= $direccion;
                            ?>
                            <iframe frameborder="0" style="border: 0" referrerpolicy="no-referrer-when-downgrade"
                                src="<?= $url ?>" allowfullscreen>
                            </iframe>
                            <div class="info-address">
                                <p data-field="direccion">
                                    <?= $webInfo->direccion ?>
                                </p>
                                <span class="edit-icon" onclick="enableEdit(this)">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
                                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                                    </svg>
                                    Editar
                                </span>
                            </div>
                        </div>
                    </div>


                    <div class="sidebar-right">
                        <div class="galeria card">
                            <ul class="image-gallery">
                                <li>
                                    <img src="https://acuarelacore.com/api<?= $webInfo->galeria[0]->url ?>" alt="Image 1" />
                                </li>
                                <li>
                                    <img src="https://acuarelacore.com/api<?= $webInfo->galeria[1]->url ?>" alt="Image 2" />
                                </li>
                                <li>
                                    <img src="https://acuarelacore.com/api<?= $webInfo->galeria[2]->url ?>" alt="Image 3" />
                                </li>
                                <?php if ($webInfo->galeria[3]->url) { ?>
                                    <li>
                                        <img src="https://acuarelacore.com/api<?= $webInfo->galeria[3]->url ?>" alt="Image 4" />
                                    </li>
                                <?php } ?>
                                <?php if ($webInfo->galeria[4]->url) { ?>
                                    <li>
                                        <img src="https://acuarelacore.com/api<?= $webInfo->galeria[4]->url ?>" alt="Image 5" />
                                    </li>
                                <?php } ?>
                            </ul>
                            <button class="prev-btn">
                                <i class="acuarela acuarela-Flecha_izquierda"></i>
                            </button>
                            <button class="next-btn">
                                <i class="acuarela acuarela-Flecha_derecha"></i>
                            </button>
                            <span class="edit-images edit-icon" onclick="toggleImageEdit(this)"> 
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                                </svg>
                                Editar
                            </span>

                            <!-- Contenedor para la edición de imágenes -->
                            <div class="edit-images-panel" style="display: none;">
                            <ul>
                                <?php foreach ($webInfo->galeria as $index => $item) { ?>
                                    <?php if (!empty($item->url)) { ?>
                                        <li>
                                            <img src="https://acuarelacore.com/api<?= $item->url ?>" alt="Image <?= $index + 1 ?>" />
                                            <input type="file" accept="image/*" onchange="uploadImage(this, <?= $index + 1 ?>)" />
                                            <button class="delete-btn" onclick="deleteImage(<?= $index + 1 ?>)">Eliminar</button>
                                        </li>
                                    <?php } ?>
                                <?php } ?>
                            </ul>

                                <button onclick="addNewImage()">Agregar Imagen</button>
                            </div>
                        </div>


                        <div class="popup-container">
                            <div class="popup-content">
                                <span class="close-btn">&times;</span>
                                <img class="popup-image" src="" alt="Popup Image" />
                            </div>
                        </div>
                        <div class="mision-vision card">
                            <b><?= $titulos[$idioma_contenido]["mision"] ?></b>
                            <p data-field="mision">
                                <?= $webInfo->mision ?>   
                            </p>
                            <b><?= $titulos[$idioma_contenido]["vision"] ?></b>
                            <p data-field="vision">
                                <?= $webInfo->vision ?>
                            </p>
                            <span class="edit-icon" onclick="enableEdit(this)">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                                </svg>
                                Editar
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <div class="philosophy">
                <div class="of-education card">
                    <b><?= $titulos[$idioma_contenido]["philosophy"] ?></b>
                    <p data-field="filosofia_de_educacion">
                        <!-- <?= $info->acf->filosofia_de_educacion ?>  -->
                        <?= $webInfo->filosofia_de_educacion ?>          
                    </p>
                    <span class="edit-icon" onclick="enableEdit(this)">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                            </svg>
                            Editar
                        </span>  
                </div> 
            </div>

<section class="services" id="services">
    <div class="services-tags card">
        <b><?= htmlspecialchars($titulos[$idioma_contenido]["services"], ENT_QUOTES, 'UTF-8') ?></b>
        <!-- <div class="tags">
            <ul id="services-list" data-field="servicios">
                <?php
                // Dividir los servicios por saltos de línea
                // $servicios = explode("\n", $info->acf->servicios);
                $servicios = explode(",", $webInfo->servicios);
                
                // Filtrar elementos vacíos y etiquetas no deseadas
                $servicios = array_filter($servicios, function ($servicio) {
                    $servicio = trim($servicio); // Eliminar espacios en blanco
                    return !empty($servicio) && strip_tags($servicio) !== ''; // Ignorar vacíos o etiquetas sin contenido
                });

                // Generar HTML solo para elementos válidos
                foreach ($servicios as $index => $servicio) {
                    // Decodificar entidades HTML y eliminar etiquetas <li>
                    $textoLimpio = strip_tags(htmlspecialchars_decode(trim($servicio), ENT_QUOTES));
                    ?>
                    <li data-id="<?= $index ?>">
                        <p contenteditable="false"><?= $textoLimpio ?></p>
                        <span class="edit-icon" onclick="enableServiceEdit(this)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                            </svg></span>
                        <button class="delete-btn" onclick="deleteServiceItem(this)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
                    </li>
                    <?php
                }
                ?>
            </ul>
            <button id="add-service-btn" onclick="addNewService()">Agregar Servicio</button>
        </div> -->
        <p data-field="servicios">
            <?= $webInfo->servicios ?>     
        </p>
        <span class="edit-icon" onclick="enableEdit(this)">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                            </svg>
                            Editar
                        </span>  
    </div>
</section>

            <section class="steps" id="steps">
                <div class="container-steps card">
                    <div >
                        <b><?= $titulos[$idioma_contenido]["admissions"] ?></b>
                        <p data-field="proceso_de_admision">
                            <!-- <?= $info->acf->filosofia_de_educacion ?>  -->
                            <?= $webInfo->proceso_de_admision ?>          
                        </p>
                        <span class="edit-icon" onclick="enableEdit(this)">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                                </svg>
                                Editar
                            </span>  
                    </div> 
                </div>
            </section>
            <?php
                if (
                    $webInfo->facebook != "" ||
                    $webInfo->instagram != "" ||
                    $webInfo->tik_tok!= "" ||
                    $webInfo->twitter != ""
                ) {
                ?>
                    <!-- <section class="contact" id="contact-us">
                    <div class="social-media card">
                        <b><?= $titulos[$idioma_contenido]["social"] ?></b>
                        <div class="icons">
                            <?php if ($webInfo->facebook != "") { ?>
                                <div class="social-group">
                                    <a href="<?= $webInfo->facebook ?>" target="_blank" class="socialContainer containerOne" >
                                        <svg class="socialSvg facebookSvg" viewBox="0 0 16 16">
                                            <path d="M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z"></path>
                                        </svg>
                                    </a>
                                    <input type="text" class="change_sm" value="<?= $webInfo->facebook ?>" contenteditable="true" data-field="facebook"/>
                                </div>
                            <?php } ?>
                            <?php if ($webInfo->instagram != "") { ?>
                                <div class="social-group" data-field="instagram">
                                    <a href="<?= $webInfo->instagram ?>" target="_blank" class="socialContainer containerTwo">
                                        <svg class="socialSvg instagramSvg" viewBox="0 0 16 16">
                                            <path
                                                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z">
                                            </path>
                                        </svg>
                                    </a>
                                    <input type="text" class="change_sm" value="<?= $webInfo->instagram ?>" contenteditable="true" data-field="instagram"/>
                                </div>
                            <?php } ?>
                            <?php if ($webInfo->tik_tok != "") { ?>
                                <div class="social-group" >
                                    <a href="<?= $webInfo->tik_tok ?>" target="_blank" class="socialContainer containerThree" data-field="tik_tok">
                                        <svg class="socialSvg tiktokSvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24; " xml:space="preserve" width="512" height="512">
                                            <path d="M22.465,9.866c-2.139,0-4.122-0.684-5.74-1.846v8.385c0,4.188-3.407,7.594-7.594,7.594c-1.618,0-3.119-0.51-4.352-1.376  c-1.958-1.375-3.242-3.649-3.242-6.218c0-4.188,3.407-7.595,7.595-7.595c0.348,0,0.688,0.029,1.023,0.074v0.977v3.235  c-0.324-0.101-0.666-0.16-1.023-0.16c-1.912,0-3.468,1.556-3.468,3.469c0,1.332,0.756,2.489,1.86,3.07  c0.481,0.253,1.028,0.398,1.609,0.398c1.868,0,3.392-1.486,3.462-3.338L12.598,0h4.126c0,0.358,0.035,0.707,0.097,1.047  c0.291,1.572,1.224,2.921,2.517,3.764c0.9,0.587,1.974,0.93,3.126,0.93V9.866z" fill="white"/>
                                        </svg>
                                    </a>
                                    <input type="text" class="change_sm" value="<?= $webInfo->tik_tok ?>" contenteditable="true" data-field="tik_tok"/>
                                </div>
                            <?php } ?>
                            <?php if ($webInfo->twitter != "") { ?>
                                <div class="social-group" data-field="twitter">
                                    <a class="socialContainer containerFour" href="<?= $webInfo->twitter ?>" target="_blank">
                                        <svg class="socialSvg twitterSvg" width="396" height="396" viewBox="0 0 396 396" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M301.026 37.125H355.608L236.362 173.415L376.645 358.875H266.805L180.774 246.395L82.335 358.875H27.72L155.265 213.098L20.691 37.125H133.32L211.084 139.937L301.026 37.125ZM281.869 326.205H312.114L116.886 68.079H84.4305L281.869 326.205Z" fill="white"/>
                                        </svg>
                                    </a>
                                    <input type="text" class="change_sm" value="<?= $webInfo->twitter ?>" contenteditable="true" data-field="twitter"/>
                                </div>
                            <?php } ?> 
                        </div>
                        <span class="edit-icon" onclick="toggleSocialMediaEdit(this)">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                            </svg>
                            Editar
                        </span>
                    </div>
                </section>                 -->

                <section class="contact" id="contact-us">
                    <div class="social-media card">
                        <b>Redes Sociales</b>
                        <div class="icons">
                            <!-- Facebook -->
                            <div class="social-group">
                                <a href="<?= $webInfo->facebook ?>" target="_blank" class="socialContainer containerOne">
                                        <svg class="socialSvg facebookSvg" viewBox="0 0 16 16">
                                            <path d="M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z"></path>
                                        </svg>
                                </a>
                                <input type="text" class="change_sm" data-field="facebook" value="<?= $webInfo->facebook ?>" style="display: none;" />
                            </div>

                            <!-- Instagram -->
                            <div class="social-group">
                                <a href="<?= $webInfo->instagram ?>" target="_blank" class="socialContainer containerTwo">
                                <svg class="socialSvg instagramSvg" viewBox="0 0 16 16">
                                            <path
                                                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z">
                                            </path>
                                        </svg>
                                </a>
                                <input type="text" class="change_sm" data-field="instagram" value="<?= $webInfo->instagram ?>" style="display: none;" />
                            </div>

                            <!-- TikTok -->
                            <div class="social-group">
                                <a href="<?= $webInfo->tik_tok ?>" target="_blank" class="socialContainer containerThree">
                                <svg class="socialSvg tiktokSvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24; " xml:space="preserve" width="512" height="512">
                                            <path d="M22.465,9.866c-2.139,0-4.122-0.684-5.74-1.846v8.385c0,4.188-3.407,7.594-7.594,7.594c-1.618,0-3.119-0.51-4.352-1.376  c-1.958-1.375-3.242-3.649-3.242-6.218c0-4.188,3.407-7.595,7.595-7.595c0.348,0,0.688,0.029,1.023,0.074v0.977v3.235  c-0.324-0.101-0.666-0.16-1.023-0.16c-1.912,0-3.468,1.556-3.468,3.469c0,1.332,0.756,2.489,1.86,3.07  c0.481,0.253,1.028,0.398,1.609,0.398c1.868,0,3.392-1.486,3.462-3.338L12.598,0h4.126c0,0.358,0.035,0.707,0.097,1.047  c0.291,1.572,1.224,2.921,2.517,3.764c0.9,0.587,1.974,0.93,3.126,0.93V9.866z" fill="white"/>
                                        </svg>
                                </a>
                                <input type="text" class="change_sm" data-field="tik_tok" value="<?= $webInfo->tik_tok ?>" style="display: none;" />
                            </div>

                            <!-- Twitter -->
                            <div class="social-group">
                                <a href="<?= $webInfo->twitter ?>" target="_blank" class="socialContainer containerFour">
                                <svg class="socialSvg twitterSvg" width="396" height="396" viewBox="0 0 396 396" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M301.026 37.125H355.608L236.362 173.415L376.645 358.875H266.805L180.774 246.395L82.335 358.875H27.72L155.265 213.098L20.691 37.125H133.32L211.084 139.937L301.026 37.125ZM281.869 326.205H312.114L116.886 68.079H84.4305L281.869 326.205Z" fill="white"/>
                                        </svg>
                                </a>
                                <input type="text" class="change_sm" data-field="twitter" value="<?= $webInfo->twitter ?>" style="display: none;" />
                            </div>
                        </div>
                        <span class="edit-icon" data-editing="false" onclick="handleSocialMediaEdit(this)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                            </svg>
                            Editar
                        </span>

                    </div>
                </section>



                
                <?php
            }
            ?>


            <div id="whatsapp" data-field="whatsapp">
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
        <script src="js/edit.js?v=<?= time() ?>"></script>
        <script src="js/galery.js?v=<?= time() ?>"></script>
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.3/dist/js/splide.min.js"></script>
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    </body>


<?php endif; 
?>

</html>