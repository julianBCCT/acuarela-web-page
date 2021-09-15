<?php
     include '../includes/config.php';
     $array = array();
     $array['message'] = 1;
     extract($_POST);

     $a->sendDemoEmail($name,$email,$phone,$daycare_name,$country,$city);
     echo json_encode($array);

?>