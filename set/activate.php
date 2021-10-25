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
        "name": "'.$daycare_name.'",
        "active": true,
        "country": "USA",
        "state": "'.$state.'",
        "city": "'.$city.'",
        "license": "'.$licence.'"
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
        "lastname": "'.$lastname.'",
        "name": "'.$name.'",
        "mail": "'.$email.'",
        "phone": "'.$phone.'",
        "daycare": ["'.$finalDaycare->id.'"],
        "status": true,
        "rols":["'.$rols.'"],
        "country": "USA",
        "state": "'.$state.'",
        "city": "'.$city.'",
        "photo": "6154f70effa7c7fa7689f39e",
        "end_demo": "'.date( "Y-m-d", strtotime( date("Y-m-d") ." +1 month")).'"
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
    $a->sendDemoActiveEmail($name,$email,$password);
    echo json_encode($array);
