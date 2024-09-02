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

$education_level_id = isset($_GET['education_level_id']) ? $_GET['education_level_id'] : 0;
$education_form_id = isset($_GET['education_form_id']) ? $_GET['education_form_id'] : 0;

$sql = "SELECT id, education_program_name 
        FROM education_program
        WHERE education_level_id = ? AND education_form_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $education_level_id, $education_form_id);
$stmt->execute();
$result = $stmt->get_result();

$program = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $program[] = $row;
    }
}

$stmt->close();
$conn->close();

echo json_encode($program);
?>