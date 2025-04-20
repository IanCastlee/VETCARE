<?php
session_start();

include("../../header.php");
include("../../databaseConnection.php");


$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['client_id'], $input['dr_id'], $input['service'], $input['pet_name'], $input['pet_type'], $input['breed'], $input['age'], $input['weight'], $input['gender'], $input['current_health_issue'], $input['history_health_issue'], $input['appointment_date'], $input['appointment_time'], $input['price'])) {

    $client_id = $input['client_id'];
    $dr_id = $input['dr_id'];
    $service = $input['service'];
    $pet_name = $input['pet_name'];
    $pet_type = $input['pet_type'];
    $breed = $input['breed'];
    $age = $input['age'];
    $weight = $input['weight'];
    $gender = $input['gender'];
    $current_health_issue = $input['current_health_issue'];
    $history_health_issue = $input['history_health_issue'];
    $appointment_date = $input['appointment_date'];
    $appointment_time = $input['appointment_time'];
    $price = $input['price'];

    $insert_appointment = $conn->prepare("INSERT INTO appointments (client_id,dr_id,service,pet_name,pet_type,breed,age,weight,gender,current_health_issue,history_health_issue,appointment_date,appointment_time,paid_payment )VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    $insert_appointment->bind_param("iissssisssssss", $client_id, $dr_id, $service, $pet_name, $pet_type, $breed, $age, $weight, $gender, $current_health_issue, $history_health_issue, $appointment_date, $appointment_time, $price);

    if ($insert_appointment->execute()) {
        echo json_encode(['success' => true, 'message' => "Appointmnet sent succesfully"]);
    } else {
        echo json_encode(['success' => false, 'message' => "There was a problem on database insertion" . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => "Invalid Input"]);
}
