<?php
// sign_up.php

// Database connection details
$servername = "localhost";
$username = "root";   // MySQL username
$password = "password";  // MySQL password
$dbname = "credentials";  // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Hash the password before storing it in the database
    $hashed_password = password_hash($pass, PASSWORD_DEFAULT);

    // SQL query to check if the username already exists
    $sql_check = "SELECT * FROM users WHERE username='$user'";
    $result = $conn->query($sql_check);

    if ($result->num_rows > 0) {
        // Username already exists
        echo "Username already taken. Please choose a different one.";
    } else {
        // Username does not exist, proceed with sign up
        $sql_insert = "INSERT INTO users (username, password) VALUES ('$user', '$hashed_password')";

        if ($conn->query($sql_insert) === TRUE) {
            // Sign-up successful, redirect to dashboard
            header("Location: dashboard.html");  // Redirect to the dashboard page
            exit;  // Stop further script execution
        } else {
            // Error during sign-up
            echo "Error: " . $sql_insert . "<br>" . $conn->error;
        }
    }
}

$conn->close();
?>
