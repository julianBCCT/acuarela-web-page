<?php
include '../includes/queryToUpdate.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recuperar el ID de la webInfo de la sesión
    if (!isset($_SESSION['webInfo_id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID de sesión no encontrado.']);
        exit;
    }
    $id = $_SESSION['webInfo_id'];

    // Leer y decodificar el cuerpo de la solicitud
    $body = json_decode(file_get_contents('php://input'), true);

    if (!is_array($body)) {
        http_response_code(400);
        echo json_encode(['error' => 'El cuerpo de la solicitud no es un array.']);
        exit;
    }


    $updateBody = [
        'logo_web' => $body // Encapsula el array validado
    ];

    error_log("Contenido de updateBody del logo: " . json_encode($updateBody, JSON_PRETTY_PRINT));

    // Llamar a la función setWebDayCareInfo
    try {
        $result = setWebDayCareInfo($land, $id, json_encode($updateBody));

        if ($result) {
            echo json_encode(['success' => true, 'message' => 'Logo actualizado correctamente.']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'No se pudo actualizar el logo.']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error interno: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido.']);
}
// include '../includes/queryToUpdate.php';
// session_start();

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     // Recuperar el ID de la webInfo de la sesión
//     $id = $_SESSION['webInfo_id'];

//     // Leer y decodificar el cuerpo de la solicitud
//     $body = json_decode(file_get_contents('php://input'), true);

//     if (!isset($body['logo_web']) || !is_array($body['logo_web'])) {
//         http_response_code(400);
//         echo json_encode(['error' => 'El campo logo_web no está definido o no es un array.']);
//         exit;
//     }

//     // Crear el cuerpo para enviar al endpoint
//     $updateBody = [
//         'logo_web' => $body['logo_web'], // Pasamos directamente el array completo
//     ];

//     // Llamar a la función setWebDayCareInfo
//     try {
//         $result = setWebDayCareInfo($land, $id, json_encode($updateBody));

//         if ($result) {
//             echo json_encode(['success' => true, 'message' => 'Logo actualizado correctamente.']);
//         } else {
//             http_response_code(500);
//             echo json_encode(['error' => 'No se pudo actualizar el logo.']);
//         }
//     } catch (Exception $e) {
//         http_response_code(500);
//         echo json_encode(['error' => 'Error interno: ' . $e->getMessage()]);
//     }
// } else {
//     http_response_code(405);
//     echo json_encode(['error' => 'Método no permitido.']);
// }

