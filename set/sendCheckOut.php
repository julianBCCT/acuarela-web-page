<?php
include '../includes/config.php';
$array = array();
extract($_POST);
$emailSended = $a->sendCheckout($nameKid,$nameParent,$nameDaycare,$nameAcudiente,$time,$date,$mail,$subject = 'Check out');
$array['emailSended'] = $emailSended;
echo json_encode($array);
