<?php
header('Content-type: application/json');

$host = "localhost";
$dbname = "schedule";
$user = "root";
$password = "";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$faculty_id = isset($_GET['faculty_id']) ? $_GET['faculty_id'] : 0;

$sql = "SELECT id, education_profile_name 
        FROM education_profile
        WHERE faculty_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $faculty_id);
$stmt->execute();
$result = $stmt->get_result();

$profile = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $profile[] = $row;
    }
}

$stmt->close();
$conn->close();

echo json_encode($profile);
?>