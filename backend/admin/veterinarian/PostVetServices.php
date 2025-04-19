<?php

include("../../header.php");
include("../../databaseConnection.php");

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['user_id'], $input['service'], $input['price'])) {

    $user_id = $input['user_id'];
    $service = $input['service'];
    $price = $input['price'];

    $insert_service =  $conn->prepare("INSERT INTO veterinarian_services (user_id, vservices, price)VALUES(?,?,?)");

    $insert_service->bind_param("iss", $user_id, $service, $price);
    if ($insert_service->execute()) {
        echo json_encode(['success' => true, 'message' => "Added Successfully"]);
    } else {
        echo json_encode(['success' => false, 'message' => "Cant insert to database" . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => "Invalid Input"]);
}
