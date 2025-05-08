<?php

include '../includes/config.php';
$testimonios = $a->getTestimonios();
echo json_encode($testimonios);