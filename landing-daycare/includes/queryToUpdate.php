<?php include '../includes/config.php';

function getWebDayCareInfo($land, $id) {
    if (!isset($land)) {
        throw new Exception("El objeto \$land no está definido.");
    }

    try {
        $result = $land->queryStrapi("websites/" . $id, "", "GET");
        return $result;
    } catch (Exception $e) {
        error_log("Error en getWebDayCareInfo: " . $e->getMessage());
        return null;
    }
}

function getGaleriaInfo($land, $id) {
    if (!isset($land)) {
        throw new Exception("El objeto \$land no está definido.");
    }

    try {
        // Realiza la consulta completa
        $result = $land->queryStrapi("websites/" . $id, "", "GET");

        // Verifica si la consulta retornó un resultado válido
        if ($result && isset($result['galeria']) && is_array($result['galeria'])) {
            // Itera sobre la galería y extrae solo los IDs
            $ids = array_map(function($item) {
                return $item['id'] ?? null; // Devuelve el ID o null si no existe
            }, $result['galeria']);

            // Filtra valores nulos y retorna solo los IDs
            return array_filter($ids);
        } else {
            error_log("El campo 'galeria' no está disponible o no es válido en el resultado.");
            return [];
        }
    } catch (Exception $e) {
        error_log("Error en getGaleriaInfo: " . $e->getMessage());
        return null;
    }
}


/**
 * Función para guardar la información en Web Day Care.
 */
function setWebDayCareInfo($land, $id, $body) {
    if (!isset($land)) {
        throw new Exception("El objeto \$land no está definido.");
    }

    try {
        $resultSet = $land->queryStrapi("websites/" . $id, $body, "PUT");
        return $resultSet;
    } catch (Exception $e) {
        error_log("Error en setWebDayCareInfo: " . $e->getMessage());
        return null;
    }
}

// function uploadImage($file) {
//     $url = "https://acuarelacore.com/api/upload";
//     $headers = [
//         "content-type: multipart/form-data ",
//     ];

//     $postFields = [
//         "files" => new CURLFile($file['tmp_name'], $file['type'], $file['name']),
//     ];

//     $ch = curl_init($url);
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//     curl_setopt($ch, CURLOPT_POST, true);
//     curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
//     curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

//     $response = curl_exec($ch);
//     $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
//     curl_close($ch);

//     if ($status === 200) {
//         return json_decode($response, true)[0];
//     } else {
//         return null;
//     }
// } 
function uploadImage($file) {
    $url = "https://acuarelacore.com/api/upload";
    $headers = [
        "Content-Type: multipart/form-data",
    ];

    // Verifica que el archivo sea válido antes de intentar procesarlo
    if (!isset($file['tmp_name']) || !file_exists($file['tmp_name'])) {
        error_log("El archivo no es válido o no existe: " . print_r($file, true));
        return null;
    }

    // Configura el CURLFile correctamente
    $postFields = [
        "files" => new CURLFile($file['tmp_name'], $file['type'], $file['name']),
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $response = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    // Manejo de errores de cURL
    if (curl_errno($ch)) {
        error_log("Error en cURL: " . curl_error($ch));
    }

    curl_close($ch);

    if ($status === 200) {
        return json_decode($response, true)[0] ?? null;
    } else {
        error_log("Error al subir la imagen: Código de estado HTTP " . $status);
        return null;
    }
}
