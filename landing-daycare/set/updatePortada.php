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
        'banner_principal' => $body // Encapsula el array validado
    ];

    error_log("Contenido de updateBody de la portada: " . json_encode($updateBody, JSON_PRETTY_PRINT));
    error_log("Contenido de id: " . json_encode($id, JSON_PRETTY_PRINT));

    // Llamar a la función setWebDayCareInfo
    try {
        $result = setWebDayCareInfo($land, $id, json_encode($updateBody));

        if ($result) {
            echo json_encode(['success' => true, 'message' => 'Portada actualizada correctamente.']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'No se pudo actualizar la portada.']);
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

//     if (!isset($body['banner_principal']) || !is_array($body['banner_principal'])) {
//         http_response_code(400);
//         echo json_encode(['error' => 'El campo banner_principal no está definido o no es un array.']);
//         exit;
//     }

//     // Crear el cuerpo para enviar al endpoint
//     $updateBody = [
//         'banner_principal' => $body['banner_principal'], // Pasamos directamente el array completo
//     ];

//     // Llamar a la función setWebDayCareInfo
//     try {
//         $result = setWebDayCareInfo($land, $id, json_encode($updateBody));

//         if ($result) {
//             echo json_encode(['success' => true, 'message' => 'Portada actualizada correctamente.']);
//         } else {
//             http_response_code(500);
//             echo json_encode(['error' => 'No se pudo actualizar la portada.']);
//         }
//     } catch (Exception $e) {
//         http_response_code(500);
//         echo json_encode(['error' => 'Error interno: ' . $e->getMessage()]);
//     }
// } else {
//     http_response_code(405);
//     echo json_encode(['error' => 'Método no permitido.']);
// }

