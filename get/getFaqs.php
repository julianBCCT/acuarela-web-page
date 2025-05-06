<?php

include '../includes/config.php';
$preguntas = $a->getFaq();
echo json_encode($preguntas);