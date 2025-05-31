<?php

include("../../header.php");
include("../../databaseConnection.php");

if (isset($_POST['service_id'], $_POST['service'], $_POST['price'])) {
    $serviceId =  $_POST['service_id'];
    $service =  $_POST['service'];
    $price =  $_POST['price'];

    $updateServices = $conn->prepare("UPDATE veterinarian_services SET vservices = ?, price = ? WHERE vservices_id = ?");
    $updateServices->bind_param("ssi", $service, $price, $serviceId);

    if ($updateServices->execute()) {
        echo json_encode(['success' => true, 'message' => "Service Updated Successfully"]);
    } else {
        echo json_encode(['success' => false, 'message' => "Server denied to perform"]);
    }
} else {
    echo json_encode(['success' => false, 'message' => "Invalid Input"]);
}
