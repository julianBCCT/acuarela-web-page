<?php
require_once '../includes/queryToUpdate.php';


// if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES)) {
//     $responses = [];
//     foreach ($_FILES as $key => $file) {
//         $result = uploadImage($file);
//         if ($result) {
//             $responses[] = ['hash' => $result]; // Devuelve el hash de cada imagen subida
//         } else {
//             http_response_code(500);
//             echo json_encode(['error' => 'Error al subir la imagen.']);
//             exit;
//         }
//     }
//     echo json_encode($responses);
// } else {
//     http_response_code(400);
//     echo json_encode(['error' => 'Solicitud no válida.']);
// }
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['files'])) {
    $files = $_FILES['files']; // Recibimos el array de archivos
    $results = [];

    // Verificamos que el array contenga archivos
    if (is_array($files['name'])) {
        foreach ($files['name'] as $index => $name) {
            // Creamos un archivo temporal compatible con `uploadImage`
            $file = [
                'name' => $files['name'][$index],
                'type' => $files['type'][$index],
                'tmp_name' => $files['tmp_name'][$index],
                'error' => $files['error'][$index],
                'size' => $files['size'][$index],
            ];

            // Validamos que el archivo se haya subido correctamente
            if ($file['error'] !== UPLOAD_ERR_OK) {
                error_log("Error al subir el archivo '{$file['name']}': " . $file['error']);
                continue;
            }

            // Llamamos a la función `uploadImage` para procesar el archivo
            $result = uploadImage($file);
            error_log("Contenido de id: " . json_encode($result, JSON_PRETTY_PRINT));

            if ($result) {
                $results[] = ['hash' => $result, 'name' => $file['name']];
            } else {
                error_log("Error al procesar el archivo '{$file['name']}'.");
            }
        }
    } else {
        error_log("No se encontraron archivos válidos en el array.");
    }

    // Devolvemos los resultados de los archivos procesados
    if (!empty($results)) {
        echo json_encode(['results' => $results]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'No se pudieron procesar las imágenes.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'No se recibieron archivos.']);
}
