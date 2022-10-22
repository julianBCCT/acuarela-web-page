<?php
    include '../includes/config.php';
    $array = array();
    extract($_POST);
    $curl = curl_init();

    curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://acuarelacore.com/api/daycares',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS =>'{
        "license":"'.$license.'",
        "name": "'.$daycare.'",
        "active": true
    }',
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json'
    ),
    ));
    $daycare = curl_exec($curl);
    $finalDaycare = json_decode($daycare);
    curl_close($curl);
    $curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://acuarelacore.com/api/acuarelausers/register',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS =>'{
        "pass": "'.$password.'",
        "name": "'.$name.'",
        "mail": "'.$email.'",
        "phone": "'.$phone.'",
        "daycare": ["'.$finalDaycare->id.'"],
        "status": true,
        "rols":["5ff78feb5d6f2e272cfd7393"],
        "country": "",
        "photo": ""
    }',
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json'
    ),
    ));
    $response = curl_exec($curl);
    curl_close($curl);
    $array['message'] = 1;
    $array['user'] = json_decode($response);
    $array['daycare'] = json_decode($daycare);
    echo json_encode($array);
