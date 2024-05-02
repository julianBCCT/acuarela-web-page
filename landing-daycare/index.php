<?php include 'includes/config.php';
$protocol = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$url = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$nameUrl = explode('.',$url);
$info = $land->gInfoDaycare($nameUrl[0]); 

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="<?=$info->acf->color_1?>" />
    <meta name="twitter:card" value="summary" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="<?=$info->title->rendered?>" />
    <meta property="og:url" content=" url" />
    <meta property="og:image" content="<?=$info->acf->banner_principal?>" />
    <meta property="og:description" content="<?=$info->content->rendered?>" />
    <title><?=$info->title->rendered?></title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.3/dist/css/splide.min.css" />
    <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.3/dist/css/themes/splide-default.min.css" />
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/styles.css?v=<?=time()?>" />
    <link rel="canonical" href="url" />
    <meta name="description" content="<?=$info->content->rendered?>" />
    <style>
    :root {
        --color-primario: <?=$info->acf->color_1?>;
        --color-secundario: <?=$info->acf->color_2?>;
        --titulos: #060606;
        --textos: #3e3e43;
        --fondo: #e0e0e0;
        --cards: #f4f4f5;
        --footer: #131727;
        --color-botones: #060606;
    }
    </style>
</head>

<body>
    <header>
        <div class="logo">
            <img src=" <?=$info->acf->logo?>" alt="logo" class="logo" />
        </div>
        <nav>
            <ul class="nav-links">
                <li><a href="#about-us">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="https://wa.me/<?=$info->acf->telefono?>;">Contact Us</a></li>
            </ul>
        </nav>
        <a href="https://wa.me/<?=$info->acf->telefono?>;" class="btn">
            <button><i class="acuarela acuarela-Evento"></i>Agendar Visita</button>
        </a>

        <a onclick="openNav()" href="#" class="menu"><button><i class="acuarela acuarela-Justificar"></i></button></a>

        <div class="overlay" id="mobile-menu">
            <a onclick="closeNav()" href="" class="close"><i class="acuarela acuarela-Cancelar"></i></a>
            <div class="overlay-content">
                <a onclick="closeNav()" href="#about-us">About Us</a>
                <a onclick="closeNav()" href="#services">Services</a>
                <a onclick="closeNav()" href="#https://wa.me/<?=$info->acf->telefono?>;">Contact Us</a>
                <a onclick="closeNav()" href="https://wa.me/<?=$info->acf->telefono?>;" class="btn"><button>
                        <i class="acuarela acuarela-Evento"></i>Agendar Visita
                    </button></a>
            </div>
        </div>
    </header>

    <main>
        <div class="portada">
            <img class="img-portada" src="<?=$info->acf->banner_principal?>" />
        </div>
        <section class="about-us" id="about-us">
            <div class="card">
                <img src=" <?=$info->acf->logo?>" alt="logo" class="logo" />
                <div class="info">
                    <div class="info-esp">
                        <h2><?=$info->title->rendered?></h2>
                        <div class="location">
                            <i class="acuarela acuarela-Localizacion"></i>
                            <p>New York</p>
                        </div>
                    </div>
                    <p><?=$info->content->rendered?></p>
                </div>
            </div>
        </section>
        <section class="tour">
            <div class="sidebars">
                <div class="sidebar-left">
                    <div id="details_card" class="details card">
                        <div class="detail">
                            <i class="acuarela acuarela-Mensajes"></i>
                            <div class="text">
                                <a href="mailto:<?=$info->acf->correo?>;"><b>Email</b></a>
                                <p><?=$info->acf->correo?></p>
                            </div>
                        </div>
                        <div class="detail">
                            <i class="acuarela acuarela-Telefono"></i>
                            <div class="text">
                                <a href="tel:<?=$info->acf->telefono?>;"><b>Phone</b></a>
                                <p><?=$info->acf->telefono?></p>
                            </div>
                        </div>
                        <div class="detail">
                            <i class="acuarela acuarela-Pendiente"></i>
                            <div class="text">
                                <b>Hours of Operation</b>
                                <p><?=$info->acf->horario?></p>
                            </div>
                        </div>
                    </div>
                    <div class="address card">
                        <b>Address</b>
                        <?
                        $direccion = str_replace(' ', '+', $info->acf->direccion);
                        $url = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAw2qBynYleldgejZ6JGPjXpkoDMhabqis&q=";
                        $url .= $direccion;
                        ?>
                        <iframe frameborder="0" style="border: 0" referrerpolicy="no-referrer-when-downgrade"
                            src="<?= $url ?>" allowfullscreen>
                        </iframe>
                        <div class="info-address">
                            <p><?=$info->acf->direccion?></p>
                        </div>
                    </div>
                    <div class="img card">
                        <img src="<?=$info->acf->seccion_1->imagen?>" alt="image" />
                    </div>
                </div>
                <div class="sidebar-right">
                    <div class="galeria card">
                        <ul class="image-gallery">
                            <li>
                                <img src="<?=$info->acf->imagen_1->url?>" alt="Image 1" />
                            </li>
                            <li>
                                <img src="<?=$info->acf->imagen_2->url?>" alt="Image 2" />
                            </li>
                            <li>
                                <img src="<?=$info->acf->imagen_3->url?>" alt="Image 3" />
                            </li>
                            <?php if($info->acf->imagen_4->url){ ?>
                            <li>
                                <img src="<?=$info->acf->imagen_4->url?>" alt="Image 4" />
                            </li>
                            <?php } ?>
                            <?php if($info->acf->imagen_5->url){ ?>
                            <li>
                                <img src="<?=$info->acf->imagen_5->url?>" alt="Image 5" />
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
                        <b>Mision</b>
                        <p><?=$info->acf->mision?>
                        </p>
                        <b>Vision</b>
                        <p><?=$info->acf->vision?>
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <div class="philosophy">
            <div class="of-education">
                <b>Philosophy of Education</b>
                <p><?=$info->acf->seccion_2->texto?></p>
            </div>
        </div>
        <section class="services" id="services">
            <div class="services-tags">
                <b>Services</b>
                <div class="tags">
                    <?=$info->acf->informacion_adicional?>
                </div>
            </div>
        </section>
        <?php 
        if($info->acf->networks_social_media->facebook != "" ||
        $info->acf->networks_social_media->instagram != "" ||
        $info->acf->networks_social_media->tiktok != "" ||
        $info->acf->networks_social_media->twitter != ""){
        ?>
        <section class="contact" id="contact-us">
            <div class="social-media">
                <b>Networks Social Media</b>
                <div class="icons">
                    <?php if($info->acf->networks_social_media->facebook != ""){ ?>
                    <a class="facebook" href="<?=$info->acf->networks_social_media->facebook?>" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
                            <path
                                d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z" />
                        </svg>
                    </a>
                    <?php } ?>
                    <?php if($info->acf->networks_social_media->instagram != ""){ ?>
                    <a class="instagram" href="<?=$info->acf->networks_social_media->instagram?>" target="_blank">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
                            <path
                                d="M0 0 C1.43653931 -0.00472824 1.43653931 -0.00472824 2.90209961 -0.009552 C3.94374268 -0.00752777 4.98538574 -0.00550354 6.05859375 -0.00341797 C7.12021729 -0.00437469 8.18184082 -0.00533142 9.27563477 -0.00631714 C11.52522847 -0.00699911 13.77482412 -0.00514366 16.02441406 -0.00097656 C19.48116446 0.00437143 22.93778492 -0.00092101 26.39453125 -0.00732422 C28.57421904 -0.00666344 30.75390675 -0.00538228 32.93359375 -0.00341797 C34.49605835 -0.00645432 34.49605835 -0.00645432 36.09008789 -0.009552 C37.04778076 -0.00639984 38.00547363 -0.00324768 38.9921875 0 C39.83966553 0.00079559 40.68714355 0.00159119 41.56030273 0.00241089 C43.49609375 0.12939453 43.49609375 0.12939453 44.49609375 1.12939453 C44.59440521 2.62809501 44.62407831 4.13137992 44.62548828 5.63330078 C44.62864044 6.59099365 44.6317926 7.54868652 44.63504028 8.53540039 C44.63301605 9.57704346 44.63099182 10.61868652 44.62890625 11.69189453 C44.62986298 12.75351807 44.6308197 13.8151416 44.63180542 14.90893555 C44.63248739 17.15852925 44.63063194 19.4081249 44.62646484 21.65771484 C44.62111685 25.11446525 44.62640929 28.5710857 44.6328125 32.02783203 C44.63215172 34.20751982 44.63087057 36.38720753 44.62890625 38.56689453 C44.63093048 39.6085376 44.63295471 40.65018066 44.63504028 41.72338867 C44.63031204 43.15992798 44.63031204 43.15992798 44.62548828 44.62548828 C44.62469269 45.47296631 44.62389709 46.32044434 44.62307739 47.19360352 C44.49609375 49.12939453 44.49609375 49.12939453 43.49609375 50.12939453 C41.99739327 50.22770599 40.49410836 50.25737909 38.9921875 50.25878906 C37.55564819 50.2635173 37.55564819 50.2635173 36.09008789 50.26834106 C35.04844482 50.26631683 34.00680176 50.2642926 32.93359375 50.26220703 C31.87197021 50.26316376 30.81034668 50.26412048 29.71655273 50.2651062 C27.46695903 50.26578817 25.21736338 50.26393272 22.96777344 50.25976562 C19.51102304 50.25441763 16.05440258 50.25971007 12.59765625 50.26611328 C10.41796846 50.2654525 8.23828075 50.26417135 6.05859375 50.26220703 C5.01695068 50.26423126 3.97530762 50.26625549 2.90209961 50.26834106 C1.94440674 50.2651889 0.98671387 50.26203674 0 50.25878906 C-0.84747803 50.25799347 -1.69495605 50.25719788 -2.56811523 50.25637817 C-4.50390625 50.12939453 -4.50390625 50.12939453 -5.50390625 49.12939453 C-5.60221771 47.63069405 -5.63189081 46.12740915 -5.63330078 44.62548828 C-5.63645294 43.66779541 -5.6396051 42.71010254 -5.64285278 41.72338867 C-5.64082855 40.68174561 -5.63880432 39.64010254 -5.63671875 38.56689453 C-5.63767548 37.505271 -5.6386322 36.44364746 -5.63961792 35.34985352 C-5.64029989 33.10025982 -5.63844444 30.85066416 -5.63427734 28.60107422 C-5.62892935 25.14432382 -5.63422179 21.68770336 -5.640625 18.23095703 C-5.63996422 16.05126924 -5.63868307 13.87158154 -5.63671875 11.69189453 C-5.63874298 10.65025146 -5.64076721 9.6086084 -5.64285278 8.53540039 C-5.63970062 7.57770752 -5.63654846 6.62001465 -5.63330078 5.63330078 C-5.63250519 4.78582275 -5.63170959 3.93834473 -5.63088989 3.06518555 C-5.38452851 -0.69044892 -3.24984304 0.00305088 0 0 Z M3.49609375 10.12939453 C0.60622128 14.83359988 1.16621034 19.7093269 1.18359375 25.06689453 C1.16748047 26.05625 1.15136719 27.04560547 1.13476562 28.06494141 C1.04205666 35.14575056 1.04205666 35.14575056 4.49609375 41.12939453 C9.2002991 44.01926701 14.07602612 43.45927794 19.43359375 43.44189453 C20.42294922 43.45800781 21.41230469 43.47412109 22.43164062 43.49072266 C29.51244977 43.58343162 29.51244977 43.58343162 35.49609375 40.12939453 C38.38596622 35.42518918 37.82597716 30.54946216 37.80859375 25.19189453 C37.82470703 24.20253906 37.84082031 23.21318359 37.85742188 22.19384766 C37.95013084 15.11303851 37.95013084 15.11303851 34.49609375 9.12939453 C29.7918884 6.23952206 24.91616138 6.79951112 19.55859375 6.81689453 C18.56923828 6.80078125 17.57988281 6.78466797 16.56054688 6.76806641 C9.47973773 6.67535745 9.47973773 6.67535745 3.49609375 10.12939453 Z "
                                transform="translate(5.50390625,-0.12939453125)" />
                            <path
                                d="M0 0 C0.89847656 -0.020625 1.79695313 -0.04125 2.72265625 -0.0625 C7.61634282 -0.09141395 11.24559842 -0.11110097 15.125 3.25 C16.55227587 7.53182762 16.34947769 11.63945436 16.375 16.125 C16.395625 17.02347656 16.41625 17.92195313 16.4375 18.84765625 C16.46641395 23.74134282 16.48610097 27.37059842 13.125 31.25 C8.84317238 32.67727587 4.73554564 32.47447769 0.25 32.5 C-0.64847656 32.520625 -1.54695313 32.54125 -2.47265625 32.5625 C-7.36634282 32.59141395 -10.99559842 32.61110097 -14.875 29.25 C-16.30227587 24.96817238 -16.09947769 20.86054564 -16.125 16.375 C-16.145625 15.47652344 -16.16625 14.57804687 -16.1875 13.65234375 C-16.21641395 8.75865718 -16.23610097 5.12940158 -12.875 1.25 C-8.59317238 -0.17727587 -4.48554564 0.02552231 0 0 Z M9.125 4.25 C9.125 5.57 9.125 6.89 9.125 8.25 C10.115 7.92 11.105 7.59 12.125 7.25 C11.795 6.26 11.465 5.27 11.125 4.25 C10.465 4.25 9.805 4.25 9.125 4.25 Z M-7.875 11.25 C-9.30162219 14.10324437 -9.18533868 16.08454549 -8.875 19.25 C-7.07506226 21.94990662 -5.791227 23.7918865 -2.875 25.25 C0.99714182 25.68023798 2.64996371 25.56669086 5.9375 23.375 C8.51766816 20.86855093 9.04217964 19.99538327 9.4375 16.4375 C9.05335642 12.5192355 7.83243683 11.03706733 5.125 8.25 C-0.1731842 5.6009079 -3.8834938 7.37253683 -7.875 11.25 Z "
                                transform="translate(24.875,8.75)" />
                            <path
                                d="M0 0 C1.9375 1.6875 1.9375 1.6875 3 4 C2.92897215 7.4803645 2.61415498 9.29485909 0.3125 11.9375 C-2.89943934 13.41325591 -4.66474802 13.06444212 -8 12 C-9.9375 10.3125 -9.9375 10.3125 -11 8 C-10.92897215 4.5196355 -10.61415498 2.70514091 -8.3125 0.0625 C-5.10056066 -1.41325591 -3.33525198 -1.06444212 0 0 Z "
                                transform="translate(29,19)" />
                        </svg>
                    </a>
                    <?php } ?>
                    <?php if($info->acf->networks_social_media->tiktok != ""){ ?>
                    <a class="tik-tok" href="<?=$info->acf->networks_social_media->tiktok?>" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
                            <path
                                d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
                        </svg>
                    </a>
                    <?php } ?>
                    <?php if($info->acf->networks_social_media->twitter != ""){ ?>
                    <a class="twitter" href="<?=$info->acf->networks_social_media->twitter?>" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
                            <path
                                d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z" />
                        </svg>
                    </a>
                    <?php } ?>
                </div>
            </div>
        </section>
        <?php 
        }
        ?>
    </main>
    <footer>
        <p>Sitio web hecho con</p>
        <img src="https://i.ibb.co/K9qk9Tr/Logo-Acuarela.png" alt="Logo-Acuarela" border="0">
    </footer>
    <script src="js/landing.js?v=<?=time()?>"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.3/dist/js/splide.min.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
</body>

</html>