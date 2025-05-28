<?php include 'includes/header.php'; 
?>
    <main class="containerheader">
        <!-- BANNER -->
        <section class="banner">
            <h1 class="banner__title">
                <?=$a->about->acf->banner->titulo?>
            </h1>
            <div class="banner__texts">
                <h3 class="banner__subtitle banner__subtitle--little">
                    <?=$a->about->acf->banner->descripcion?>
                </h3>
            </div>
            <img
                class="banner__img banner__img--no-border"
                src="<?=$a->about->acf->banner->imagen?>"
            />
        </section>

        <!-- ADD-ONS -->
        <section class="add-on add-on--left add-on--end" style="width:100%; max-width:1000px; padding: 50px 25px;">
            <img class="add-on__img" src="<?=$a->about->acf->seccion_1->imagen?>" />
            <div class="add-on__texts">
                <h3 class="add-on__title"><?=$a->about->acf->seccion_1->titulo?></h3>
                <p class="add-on__description">
                   <?=$a->about->acf->seccion_1->descripcion?>
                </p>
                <button class="btn btn--primary"   onclick="window.location.href='/invitaciones'">
                    <span class="btn__text"><?=$a->about->acf->seccion_1->texto_boton?> </span>
                </button>
            </div>
        </section>

        <section class="add-on" style="width:100%; max-width:1000px; padding: 50px 25px;">
            <div class="add-on__texts">
                <h3 class="add-on__title">
                <?=$a->about->acf->seccion_2->titulo?>
                </h3>
                <p class="add-on__description">
                <?=$a->about->acf->seccion_2->descripcion?>
                </p>
            </div>
            <img class="add-on__img" src="<?=$a->about->acf->seccion_2->imagen?>" />
        </section>

        <!-- TESTIMONIOS -->
        <section class="testimonial__section">
            <div class="testimonial">
            <h2>Testimonios</h2>
            <div class="testimonial__content">
                <img src="img\Flecha_izquierda.png" alt="Desplazar testimonios a la izquierda" />

                <div class="testimonial__content-view">
                <div class="testimonial__slider-track">
                    <?php 
                    $testimonios = $a->getTestimonios();
                    for ($i = 0; $i < count($testimonios); $i++) { 
                        $testimonio = $testimonios[$i];
                    ?>
                    <div class="testimonial__slide">
                    <div class="testimonial__content-video">
                        <img class="testimonials-cont__avatar" src="<?=$testimonio->acf->imagen?>"/>
                    </div>

                    <div class="testimonial__content-info">
                        <div class="imgbox">
                        <img src="img\Heart.svg" alt="Like" />
                        </div>
                        <h3><?=$testimonio->title->rendered?></h3>
                        <h4><?=$testimonio->acf->cargo?></h4>
                        <p><?=$testimonio->content->rendered?></p>
                    </div>
                    </div>
                    <?php } ?>
                </div>
                </div>

                <img src="img\Flecha_derecha.png" alt="Desplazar testimonios a la derecha" />
            </div>
            </div>
        </section>


        <!-- <section class="testimonials">
            <h1>Testimonios</h1>

            <div class="testimonials-cont">
                <?php 
                $testimonios = $a->getTestimonios();
                for ($i=0; $i < count($testimonios); $i++) { 
                    $testimonio = $testimonios[$i];
                ?>
                <div class="testimonials-cont__testimonial">
                    <img
                        class="testimonials-cont__avatar"
                        src="  <?=$testimonio->acf->imagen?> "
                    />
                    <div class="testimonials-cont__texts">
                        <div class="testimonials-cont__top">
                            <div>
                                <p class="testimonials-cont__name">
                                    <?=$testimonio->title->rendered?> 
                                </p>
                                <p class="testimonials-cont__role">  <?=$testimonio->acf->cargo?> </p>
                            </div>
                            <p class="testimonials-cont__date"></p>
                        </div>
                        <p class="testimonials-cont__message">
                        <?=$testimonio->content->rendered?> 
                        </p>
                    </div>
                </div>
                <? } ?>
            </div>
        </section> -->
    </main>
<?php include 'includes/footer.php'; ?>