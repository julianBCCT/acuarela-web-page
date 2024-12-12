<?php
include '../includes/queryToUpdate.php';


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Obtener el cuerpo de la solicitud
    $body = json_decode(file_get_contents('php://input'), true);

    // Log para depurar
    error_log("Cuerpo recibido: " . print_r($body, true));

    // Verificar si se envió el ID
    if (!isset($body['id'])) {
        error_log("ID no recibido o no está definido en el cuerpo: " . print_r($body, true));
        http_response_code(400);
        echo json_encode(['error' => 'El ID no fue proporcionado.']);
        exit;
    }

    $fileId = $body['id'];

    // Llamar a la función deleteImage
    $result = deleteImage($fileId);

    if ($result) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => "Imagen con ID $fileId eliminada correctamente."]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'No se pudo eliminar la imagen.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido.']);
}

// if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
//     // Obtener el cuerpo de la solicitud
//     $body = json_decode(file_get_contents('php://input'), true);

//     error_log("Cuerpo recibido: " . print_r($body, true));


//     $fileId = (int)$body['id'];

//     // Llamar a la función deleteImage
//     $result = deleteImage($fileId);
    

//     if ($result) {
//         http_response_code(200);
//         echo json_encode(['success' => true, 'message' => "Imagen con ID $filedId eliminada correctamente."]);
//     } else {
//         http_response_code(500);
//         echo json_encode(['error' => 'No se pudo eliminar la imagen.']);
//     }
// } else {
//     http_response_code(405);
//     echo json_encode(['error' => 'Método no permitido.']);
//}