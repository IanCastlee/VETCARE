<?php


include("../../header.php");
include("../../databaseConnection.php");


$get_veterinarian_services = $conn->prepare("SELECT * FROM veterinarian_services");

$get_veterinarian_services->execute();
$result =  $get_veterinarian_services->get_result();

$vets = [];

while ($row = $result->fetch_assoc()) {
    $vets[] = $row;
}

echo json_encode(['success' => true, 'data' => $vets]);
