<?php

include("../../header.php");
include("../../databaseConnection.php");



if (isset($_GET['medicine_id'])) {
    $medicine_id = intval($_GET['medicine_id']);

    // Set status to 0 in the users table
    $update_status = $conn->prepare("UPDATE shop SET status = 0 WHERE medicine_id = ?");
    $update_status->bind_param("i", $medicine_id);

    if ($update_status->execute()) {
        echo json_encode(['success' => true, 'message' => 'Medicine status set to 0 (soft deleted)']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update Medicine status']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid user ID']);
}
