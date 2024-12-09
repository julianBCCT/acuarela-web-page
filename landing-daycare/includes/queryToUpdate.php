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
