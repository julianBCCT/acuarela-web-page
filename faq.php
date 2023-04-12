<?php include 'includes/header.php'; $faqs = $a->getFaq(); ?>
<main class="container">
    <!-- BANNER -->
    <section class="banner banner--short">
        <div class="banner__texts">
            <h1 class="banner__title">Preguntas frecuentes</h1>
        </div>
    </section>

    <!-- FAQ -->

    <section class="faq">
        <?php for ($i=0; $i < count($faqs); $i++) { $faq = $faqs[$i];?>
            <div class="faq-item" onclick="toggleAccordion('accordion-<?=$i?>')" data-toggle="accordion-<?=$i?>">
                <b class="faq-item__title"><?=$faq->title->rendered?></b>
                <div class="faq-item__content content"><?=$faq->content->rendered?></div>
            </div>
        <?php }?>
    </section>
</main>
<?php include 'includes/footer.php'; ?>