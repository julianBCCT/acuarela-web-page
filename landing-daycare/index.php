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
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.3/dist/css/splide.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.3/dist/css/themes/splide-default.min.css"
    />
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/styles.css?v=<?=time()?>" />
    <link rel="canonical" href="url" />
    <meta name="description" content="<?=$info->content->rendered?>" />
    <style>
      :root{
        --color1: <?=$info->acf->color_1?>;
      }
      h1 {
        color: <?=$info->acf->color_1?>
      }
   </style>

  </head>

  <body class="landing">
    <header>
      <nav>
        <a href="#about">ABOUT US </a>
        <a href="#tour">TOUR</a>
        <a href="#service">SERVICES</a>
        <a href="#contact">CONTACT US</a>
        <!-- <a href="">Mision, Vision, Valores, Filosofia del Daycare</a> -->
      </nav>
    </header>
    <div
      class="landing-banner"
      style="background-image: url(<?=$info->acf->banner_principal?>)"
    ></div>
    <div class="container">
      <div class="intro" id="about">
        <div class="flex logoCont">
          <img src=" <?=$info->acf->logo?>" alt="logo" class="logo" />
          <h1><?=$info->title->rendered?></h1>
        </div>
        <?=$info->content->rendered?>
      </div>
    </div>
    <?php if($info->acf->galeria->imagen_1){ ?>
      <section class="splideCenter splide" id="tour">
        <div class="splide__track">
          <ul class="splide__list">
            <?php 
            for ($i=1; $i < 5; $i++) { 
              if($info->acf->galeria->{'imagen_'.$i}){
               
              
              ?>
               <li class="splide__slide">
                  <img src="<?=$info->acf->galeria->{'imagen_'.$i}?>" alt="Image Slide" />
                </li>
            <?php }}?>
          </ul>
        </div>
      </section>
    <?php } ?>
    <?php if($info->acf->seccion_1->texto != ""){ ?>
      <section class="info container" id="service">
        <img src="<?=$info->acf->seccion_1->imagen?>" alt="image" />
        <div class="txt">
        <?=$info->acf->seccion_1->texto?>
        </div>
      </section>
    <?php }?>
    <?php if($info->acf->seccion_2->texto != ""){ ?>
      <section class="info container" id="contact">
        <div class="txt">
        <?=$info->acf->seccion_2->texto?>
        </div>
      <img src="<?=$info->acf->seccion_2->imagen?>" alt="image" />
      </section>
    <?php }?>
    <div class="cards container">
      <div
        class="cards-item"
        style="background-color: <?=$info->acf->color_2?>"
      >
        <p><strong>Address</strong> <a target="_blank" href="https://www.google.com/maps/place/<?=$info->acf->direccion?>"><?=$info->acf->direccion?></a></p>
        <p><strong>Email</strong> <a href="mailto:<?=$info->acf->correo?>;"><?=$info->acf->correo?></a></p>
        <p><strong>Phone</strong> <a href="tel:<?=$info->acf->telefono?>;"><?=$info->acf->telefono?></a></p>
      </div>
      <div
        class="cards-item"

        style="background-color: <?=$info->acf->color_1?>"
      >
        <p><strong>Hours of operation</strong></p>
        <p>
          <?=$info->acf->horario?>
        </p>
      </div>
      <div
        class="cards-item"

        style="background-color: <?=$info->acf->color_2?>"
      >
     <?=$info->acf->informacion_adicional?>
     <?php 
     if($info->acf->networks_social_media->facebook != "" ||
     $info->acf->networks_social_media->instagram != "" ||
     $info->acf->networks_social_media->tiktok != "" ||
     $info->acf->networks_social_media->twitter != ""){
     ?>
     <strong>Social Network</strong> 
     <?php 
     }
     ?>
     <div class="social">

       <?php if($info->acf->networks_social_media->facebook != ""){ ?>
         <a href="<?=$info->acf->networks_social_media->facebook?>"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
         <path d="M23.625 12C23.625 5.57812 18.4219 0.375 12 0.375C5.57812 0.375 0.375 5.57812 0.375 12C0.375 17.8022 4.62609 22.6116 10.1836 23.4844V15.3605H7.23047V12H10.1836V9.43875C10.1836 6.52547 11.918 4.91625 14.5744 4.91625C15.8466 4.91625 17.1769 5.14313 17.1769 5.14313V8.0025H15.7106C14.2669 8.0025 13.8164 8.89875 13.8164 9.81797V12H17.0405L16.5248 15.3605H13.8164V23.4844C19.3739 22.6116 23.625 17.8022 23.625 12Z" fill="currentColor"/>
       </svg></a>
       <?php } ?>
       <?php if($info->acf->networks_social_media->instagram != ""){ ?>
         <a href="<?=$info->acf->networks_social_media->instagram?>">
         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M15.9845 4.70294C15.9469 3.85127 15.8091 3.26888 15.6119 2.76164C15.4084 2.22309 15.0952 1.74403 14.6882 1.34325C14.2874 0.936204 13.8021 0.619961 13.2729 0.422701C12.7626 0.22544 12.1833 0.0876712 11.3316 0.0500978C10.4737 0.00939335 10.2013 0 8.02832 0C5.85533 0 5.58292 0.00939334 4.73126 0.0469667C3.87959 0.0845401 3.2972 0.222309 2.78996 0.419569C2.25454 0.623092 1.77235 0.933072 1.37157 1.34325C0.964524 1.74403 0.648281 2.22935 0.451021 2.75851C0.253761 3.26888 0.115992 3.84814 0.0784182 4.6998C0.0377137 5.55773 0.0283203 5.82701 0.0283203 8C0.0283203 10.173 0.0377137 10.4454 0.075287 11.2971C0.11286 12.1487 0.25063 12.7311 0.44789 13.2384C0.651412 13.7769 0.967655 14.256 1.37157 14.6568C1.77235 15.0638 2.25767 15.38 2.78683 15.5773C3.2972 15.7746 3.87646 15.9123 4.72812 15.9499C5.57979 15.9875 5.85219 15.9969 8.02519 15.9969C10.1982 15.9969 10.4706 15.9875 11.3223 15.9499C12.1739 15.9123 12.7563 15.7746 13.2635 15.5773C14.3375 15.1609 15.1892 14.3123 15.6056 13.2352C15.8029 12.7249 15.9406 12.1456 15.9782 11.2939C16.0158 10.4391 16.0252 10.1699 16.0252 7.99687C16.0252 5.82387 16.0221 5.55773 15.9845 4.70294ZM8.02832 12.1112C5.75826 12.1112 3.91717 10.2701 3.91717 8C3.91717 5.72994 5.76139 3.89198 8.02832 3.89198C10.2984 3.89198 12.1395 5.73307 12.1395 8.00313C12.1395 10.2732 10.2984 12.1112 8.02832 12.1112ZM12.3023 4.68728C11.7731 4.68728 11.3442 4.25832 11.3442 3.72916C11.3442 3.2 11.7731 2.77104 12.3023 2.77104C12.8315 2.77104 13.2604 3.2 13.2604 3.72916C13.2635 4.25832 12.8315 4.68728 12.3023 4.68728ZM10.696 8C10.696 9.47162 9.50308 10.6677 8.02832 10.6677C6.5567 10.6677 5.36061 9.47476 5.36061 8C5.36061 6.52524 6.55356 5.33229 8.02832 5.33229C9.50308 5.33542 10.696 6.52838 10.696 8Z" fill="currentColor"/>
         </svg>
         </a>
       <?php } ?>
       <?php if($info->acf->networks_social_media->tiktok != ""){ ?>
         <a href="<?=$info->acf->networks_social_media->tiktok?>"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M15.01 4.01208C14.0969 4.01208 13.2544 3.70958 12.5778 3.19927C11.8019 2.61427 11.2444 1.75615 11.0475 0.767085C10.9987 0.52271 10.9725 0.270522 10.97 0.012085H8.36154V7.13959L8.35841 11.0436C8.35841 12.0874 7.67873 12.9724 6.73654 13.2836C6.4631 13.374 6.16779 13.4168 5.86029 13.3999C5.46779 13.3783 5.09998 13.2599 4.78029 13.0686C4.09997 12.6618 3.63872 11.9236 3.62622 11.0793C3.60654 9.75958 4.67341 8.68365 5.99216 8.68365C6.25248 8.68365 6.50248 8.72615 6.73654 8.80333V6.85521V6.1549C6.48966 6.11834 6.23841 6.09927 5.98435 6.09927C4.54091 6.09927 3.19091 6.69927 2.22591 7.78021C1.49654 8.59708 1.05904 9.63927 0.991537 10.7321C0.903099 12.1677 1.42841 13.5324 2.44716 14.5393C2.59685 14.6871 2.75404 14.8243 2.91841 14.9508C3.79185 15.623 4.85966 15.9874 5.98435 15.9874C6.23841 15.9874 6.48966 15.9686 6.73654 15.9321C7.78716 15.7765 8.75654 15.2955 9.52154 14.5393C10.4615 13.6102 10.9809 12.3768 10.9865 11.064L10.9731 5.23396C11.4215 5.5799 11.9119 5.86615 12.4381 6.08834C13.2565 6.43365 14.1244 6.60865 15.0175 6.60834V4.71427V4.01146C15.0181 4.01208 15.0106 4.01208 15.01 4.01208V4.01208Z" fill="currentColor"/>
         </svg>
         </a>
       <?php } ?>
       <?php if($info->acf->networks_social_media->twitter != ""){ ?>
         <a href="<?=$info->acf->networks_social_media->twitter?>">
         <svg width="24" height="20" viewBox="0 0 24 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
         <path d="M21.533 5.11175C21.5482 5.32494 21.5482 5.53817 21.5482 5.75136C21.5482 12.2539 16.599 19.7463 7.5533 19.7463C4.76648 19.7463 2.17767 18.9391 0 17.5382C0.395953 17.5838 0.776625 17.5991 1.18781 17.5991C3.48727 17.5991 5.60405 16.8224 7.29441 15.4976C5.13197 15.4519 3.31978 14.0356 2.69541 12.0864C3 12.132 3.30455 12.1625 3.62438 12.1625C4.06598 12.1625 4.50764 12.1016 4.91878 11.995C2.66498 11.5381 0.974578 9.55845 0.974578 7.16759V7.1067C1.62938 7.47219 2.39086 7.70061 3.19791 7.73103C1.87303 6.84777 1.00505 5.34017 1.00505 3.63458C1.00505 2.72089 1.24866 1.88333 1.67508 1.15236C4.09641 4.13713 7.73602 6.08633 11.8172 6.29956C11.7411 5.93408 11.6954 5.55341 11.6954 5.17269C11.6954 2.462 13.8883 0.253906 16.6141 0.253906C18.0304 0.253906 19.3095 0.847813 20.208 1.8072C21.3197 1.59402 22.3857 1.18283 23.3299 0.619391C22.9643 1.76155 22.1877 2.72094 21.1674 3.33003C22.1573 3.22348 23.1167 2.94931 23.9999 2.56864C23.33 3.54322 22.4924 4.4112 21.533 5.11175Z" fill="currentColor"/>
       </svg>
         </a>
       <?php } ?>
     </div>

      </div>
    </div>12
    <footer style="background-color: <?=$info->acf->color_1?>">
      <p>
        Sitio web hecho con
        <a href="https://acuarela.app/" target="_blank">Acuarela</a>
      </p>
    </footer>
    <div class="whatsapp">
      <a href="https://wa.me/+1<?=$info->acf->telefono?>" target="_blank">
        <img src="img/whatsapp.svg" class="whatsappImgMobile" />
      </a>
    </div>
    <script src="js/main.js?v=<?=time()?>"></script>
    <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.3/dist/js/splide.min.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  </body>
</html>
