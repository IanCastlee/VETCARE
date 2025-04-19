<?php

include("../../header.php");
include("../../databaseConnection.php");

$get_veterinarian = $conn->prepare("SELECT u.*, v.* FROM users AS u JOIN veterinarian_info AS v ON u.user_id = v.user_id WHERE u.acc_type = 1");

$get_veterinarian->execute();
$result =  $get_veterinarian->get_result();

$vets = [];

while ($row = $result->fetch_assoc()) {
    $vets[] = $row;
}

echo json_encode(['success' => true, 'data' => $vets]);
