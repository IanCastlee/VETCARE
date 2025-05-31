<?php

include("../../header.php");
include("../../databaseConnection.php");

$status = 1;
$isFollowUp = 1;

$getappointment = $conn->prepare("SELECT a.*, u1.fullname AS clientName, u2.profile, u2.fullname AS drFullname FROM appointments AS a LEFT JOIN  users AS u1 ON a.client_id = u1.user_id LEFT JOIN users AS u2 ON u2.user_id = a.dr_id WHERE a.status = ? AND is_followup = ?");
$getappointment->bind_param("ii", $status, $isFollowUp);
$getappointment->execute();

$result = $getappointment->get_result();

$appointment = [];

while ($row = $result->fetch_assoc()) {
    $appointment[] = $row;
}

echo json_encode(['success' => true, 'data' => $appointment]);
