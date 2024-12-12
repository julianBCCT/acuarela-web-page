<?php
include '../includes/queryToUpdate.php';
ini_set('display_errors', 0); // No mostrar errores en la salida
error_reporting(E_ALL); // Registrar errores

// Limpia cualquier salida previa
if (ob_get_length()) {
    ob_clean();
}

//session_start();

$id = $_SESSION['webInfo_id'];

// Validar si hay una sesión activa y obtener el ID correspondiente
if (!isset($_SESSION['webInfo_id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "ID de sesión no encontrado."
    ]);
    exit;
}

try {
    // Capturar los datos enviados en el cuerpo de la solicitud
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data || !is_array($data)) {
        echo json_encode([
            "status" => "error",
            "message" => "Datos no válidos o no se recibieron datos en el formato esperado.",
        ]);
        exit;
    }

    // Procesar los datos
    //$fields = $data;

    // Validar que el objeto $land esté disponible
    if (!isset($land)) {
        throw new Exception("El objeto \$land no está definido.");
    }

    $dataToServer = json_encode($data);

    // Llamar a la función para guardar los datos
    $result = setWebDayCareInfo($land, $id, $dataToServer);

    if($result){
        // Respuesta única de éxito
        echo json_encode([
            "status" => "success",
            "message" => "Datos guardados correctamente.",
            "details" => "Respuesta del servidor: " . json_encode($result) . "\nDatos que se envían: " . $dataToServer
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "No se pudieron guardar los datos.",
            "details" => $result 
        ]);
    }
} catch (Exception $e) {
    // Manejo de errores
    error_log("Error en el proceso: " . $e->getMessage());
    echo json_encode([
        "status" => "error",
        "message" => "Hubo un error al procesar la solicitud.",
        "error" => $e->getMessage(), // Opcional: puedes eliminar esto en producción
    ]);
}
