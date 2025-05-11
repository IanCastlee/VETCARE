<?php
session_start();

include("../../header.php");
include("../../databaseConnection.php");



$verify_token = rand(1000, 9999);

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['email'], $input['password'])) {

    $email = $input['email'];
    $password = $input['password'];
    $stmt_check_email = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt_check_email->bind_param("s", $email);
    $stmt_check_email->execute();
    $result = $stmt_check_email->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $password_db = $row['password'];
        $acct_type_db = $row['acc_type'];
        $status_db = $row['status'];

        if (password_verify($password, $password_db)) {
            $_SESSION['userid'] = $row['user_id'];

            if ($status_db == 0) {
                echo json_encode(['success' => false, 'message' => "Your email is not verified"]);
            } else {
                //exclude the password
                unset($row['password']);

                if ($row['acc_type'] == 0) {
                    echo json_encode(['success' => true, 'message' => 'Login Succesful', 'uid' => $_SESSION['userid'], 'userType' => "client", 'data' => $row]);
                } else if ($row['acc_type'] == 1) {
                    echo json_encode(['success' => true, 'message' => 'Login Succesful', 'uid' => $_SESSION['userid'], 'userType' => "veterinarian", 'data' => $row]);
                } else {
                    echo json_encode(['success' => true, 'message' => 'WELCOME ADMIN', 'uid' => $_SESSION['userid'], 'userType' => 'admin', 'data' => $row]);
                }
            }
        } else {
            echo json_encode(['success' => false, 'message' => "Password is incorrect"]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => "Email not registered"]);
    }
} else {
    echo json_encode(['success' => false, 'message' => "Invalid Input"]);
}
