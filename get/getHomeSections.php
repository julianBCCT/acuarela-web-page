<?php

include '../includes/config.php';
$homeSections = $a->getHomeSections();
echo json_encode($homeSections);