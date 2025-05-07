<?php
include '../includes/config.php';
// include 'zohocrm.php';


// Obtener el cuerpo de la solicitud POST
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);



function createLead($data, $a)
{
    $name = $data['name'];
    $lastName = $data['lastName'];
    $email = $data['email'];
    // $phone = $data['phone'];
    $fuenteComunicacion = $data['fuenteComunicacion'];
    $servicioInteres = $data['servicioInteres'];
    $daycareName = $data['daycareName'];


    if ($email) {
        $leadCreated = $a->createLead($name, $lastName, $email, "0000000000", $servicioInteres, $fuenteComunicacion,  $daycareName,);
        if ($leadCreated) {
            return ['success' => true, 'message' => 'Lead creado.'];
        } else {
            return ['success' => false, 'message' => 'Lead no creado.'];
        }
    } else {
        return ['success' => false, 'message' => 'Correo no proporcionado.'];
    }
}

$response = createLead($data, $a);
http_response_code($response['success'] ? 200 : 400);
echo json_encode($response);