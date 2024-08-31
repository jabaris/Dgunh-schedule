<?php
header('Content-type: application/json');

$host = "localhost";
$dbname = "schedule";
$user = "root";
$password = ""; 

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM faculty";
$result = $conn->query($sql);

$faculty = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $faculty[] = $row;
    }
}

$conn->close();

echo json_encode($faculty);
?>