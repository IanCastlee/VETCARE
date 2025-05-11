<?php

include("../header.php");
include("../databaseConnection.php");

$input = json_decode(file_get_contents('php://input'), true);

if (
    isset($input['appointment_id'], $input['client_id'], $input['title'], $input['desc'])
) {
    $appointment_id = $input['appointment_id'];
    $client_id = $input['client_id'];
    $title = $input['title'];
    $description = $input['desc'];
    $sentDate = date("Y-m-d H:i:s");

    // Insert into followup_appointment
    $insert = $conn->prepare("INSERT INTO followup_appointment (appointment_id, client_id, title, description, sentDate) VALUES (?, ?, ?, ?, ?)");
    $insert->bind_param("iisss", $appointment_id, $client_id, $title, $description, $sentDate);

    if ($insert->execute()) {

        $insertNotif = $conn->prepare("INSERT INTO notifications ( reciever_iid, title, description, sentDate) VALUES (?, ?, ?, ?)");
        $insertNotif->bind_param("isss", $client_id, $title, $description, $sentDate);
        $insertNotif->execute();

        echo json_encode(['success' => true, 'message' => "Follow-up appointment and notification added successfully"]);
    } else {
        echo json_encode(['success' => false, 'message' => "Database error: " . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => "Invalid input"]);
}
