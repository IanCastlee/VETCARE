<?php
include("../../header.php");
include("../../databaseConnection.php");



require '../../vendor/autoload.php';

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['appointment_id'], $input['date'], $input['time_slot'])) {

    $appointment_id = $input['appointment_id'];
    $date = $input['date'];
    $time_slot = $input['time_slot'];


    $update_appointment = $conn->prepare("UPDATE appointments SET appointment_date = ?, appointment_time = ? WHERE appointment_id = ?");
    $update_appointment->bind_param("ssi", $date, $time_slot, $appointment_id);
    if ($update_appointment->execute()) {
        echo json_encode(['success' => true, 'message' => "Appointment Updated Successfully"]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update veterinarian status']);
    }
} else {
    echo json_encode(['success' => false, 'message' => "Invalid Input"]);
}
