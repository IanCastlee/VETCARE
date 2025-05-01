<?php

include("../../header.php");
include("../../databaseConnection.php");

if (isset($_GET['choosenDate'])) {
    $choosenDate = $_GET['choosenDate'];

    $getNotAvailableAppointmentTime = $conn->prepare(
        "SELECT appointment_time FROM appointments WHERE appointment_date = ?"
    );
    $getNotAvailableAppointmentTime->bind_param("s", $choosenDate);
    $getNotAvailableAppointmentTime->execute();

    $result = $getNotAvailableAppointmentTime->get_result();
    $appointmentTime = [];

    while ($row = $result->fetch_assoc()) {
        $appointmentTime[] = $row;
    }

    echo json_encode(['success' => true, 'data' => $appointmentTime]);
} else {
    echo json_encode(['success' => false, 'message' => "Invalid Input"]);
}
