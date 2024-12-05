<?php

function getWebDayCareInfo($id) {
    /*$api_url = "https://acuarelacore.com/api/websites/" . $id;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $api_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $response = curl_exec($ch);
    curl_close($ch);
    
    $info = json_decode($response);

    if (!$info) {
        die('Error: No se pudo obtener la información del endpoint.');
    }
    
    return $info;*/

    $webInfo = $land->queryStrapi("websites/675079ec55984708e0adffc9", "", "GET");
}   
