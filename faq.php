<?php $faqs = $a->getFaq(); ?>

<!-- FAQ -->
<section class="faq" id="faq">>
    <h2>Preguntas frecuentes</h2>
    <?php for ($i = 0; $i < count($faqs); $i++) { 
        $faq = $faqs[$i]; ?>
        <div class="faq-item" onclick="toggleAccordion('accordion-<?=$i?>')" data-toggle="accordion-<?=$i?>">
            <b class="faq-item__title"><?=$faq->title->rendered?></b>
            <div class="faq-item__content content"><?=$faq->content->rendered?></div>
        </div>
    <?php } ?>
</section>
