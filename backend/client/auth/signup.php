<?php
include("../../header.php");
include("../../databaseConnection.php");

// Decode the payload
$input = json_decode(file_get_contents('php://input'), true);


if (isset($input['fullname'], $input['address'], $input['phone'], $input['email'], $input['password'])) {

    $fullname = $input['fullname'];
    $address = $input['address'];
    $phone = $input['phone'];
    $email = $input['email'];
    $password = password_hash($input['password'], PASSWORD_DEFAULT);

    // Prepare and execute the SQL statement
    $stmt_insert = $conn->prepare("INSERT INTO users (fullname, address, phone, email, password) VALUES (?,?,?,?,?)");
    if ($stmt_insert) {
        $stmt_insert->bind_param("sssss", $fullname, $address, $phone, $email, $password);

        if ($stmt_insert->execute()) {
            echo json_encode(['success' => true, 'message' => "Inserted Successfully"]);
        } else {
            echo json_encode(['success' => false, 'message' => "Database error: " . $conn->error]);
        }

        $stmt_insert->close();
    } else {
        echo json_encode(['success' => false, 'message' => "Prepare failed: " . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => "Invalid Input"]);
}
?>
