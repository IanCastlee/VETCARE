






<?php
session_start();                  
include("../../header.php");
session_unset();                
session_destroy();                
// Remove session cookie on the client side
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

header("Content-Type: application/json");
echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
