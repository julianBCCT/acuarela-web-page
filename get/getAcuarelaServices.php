<?php

include '../includes/config.php';
$acuarela = $a->getPrices();
echo json_encode($acuarela);
