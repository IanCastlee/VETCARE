<?php
session_start();

include("../../header.php");
include("../../databaseConnection.php");

header("Content-Type: application/json");

// Ensure all required POST fields are set
if (
    isset(
        $_POST['client_id'],
        $_POST['dr_id'],
        $_POST['service'],
        $_POST['pet_name'],
        $_POST['pet_type'],
        $_POST['breed'],
        $_POST['age'],
        $_POST['weight'],
        $_POST['gender'],
        $_POST['current_health_issue'],
        $_POST['history_health_issue'],
        $_POST['appointment_date'],
        $_POST['appointment_time'],
        $_POST['price']
    )
) {
    // Sanitize and assign form fields
    $client_id = $_POST['client_id'];
    $dr_id = $_POST['dr_id'];
    $service = $_POST['service'];
    $pet_name = $_POST['pet_name'];
    $pet_type = $_POST['pet_type'];
    $breed = $_POST['breed'];
    $age = $_POST['age'];
    $weight = $_POST['weight'];
    $gender = $_POST['gender'];
    $current_health_issue = $_POST['current_health_issue'];
    $history_health_issue = $_POST['history_health_issue'];
    $appointment_date = $_POST['appointment_date'];
    $appointment_time = $_POST['appointment_time'];
    $price = $_POST['price'];

    // Handle image upload if it exists
    $image_name = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../../uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $tmp_name = $_FILES['image']['tmp_name'];
        $original_name = basename($_FILES['image']['name']);
        $image_ext = pathinfo($original_name, PATHINFO_EXTENSION);
        $new_filename = uniqid("appointment_", true) . '.' . $image_ext;
        $uploadPath = $uploadDir . $new_filename;

        if (move_uploaded_file($tmp_name, $uploadPath)) {
            $image_name = $new_filename;
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to upload image']);
            exit;
        }
    }

    // Insert into DB
    $stmt = $conn->prepare("INSERT INTO appointments (
        client_id, dr_id, service, pet_name, pet_type, breed, age, weight, gender,
        current_health_issue, history_health_issue, appointment_date, appointment_time,
        paid_payment, image
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param(
        "iissssissssssss",
        $client_id,
        $dr_id,
        $service,
        $pet_name,
        $pet_type,
        $breed,
        $age,
        $weight,
        $gender,
        $current_health_issue,
        $history_health_issue,
        $appointment_date,
        $appointment_time,
        $price,
        $image_name
    );

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => "Appointment sent successfully"]);
    } else {
        echo json_encode(['success' => false, 'message' => "Database error: " . $conn->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => "Missing required fields"]);
}
