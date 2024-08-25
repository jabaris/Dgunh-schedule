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

$department_id = isset($_GET['department_id']) ? $_GET['department_id'] : 0;

$sql = "SELECT id, CONCAT(last_name, ' ', first_name, ' ', second_name) AS teacher_name 
        FROM teacher
        WHERE department_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $department_id);
$stmt->execute();
$result = $stmt->get_result();

$teachers = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $teachers[] = $row;
    }
}

$stmt->close();
$conn->close();

echo json_encode($teachers);
?>