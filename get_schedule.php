<?php
header('Content-type: application/json;');

$host = "localhost"; // ваш хост
$dbname = "schedule"; // имя вашей базы данных
$user = "localhost"; // имя пользователя базы данных
$password = ""; // пароль пользователя базы данных

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$userType = $_POST['userType'];
$day = $_POST['day'];

if ($userType == "student") {
    $faculty = $_POST['faculty'];
    $studyForm = $_POST['studyForm'];
    $studyLevel = $_POST['studyLevel'];
    $specialization = $_POST['specialization'];
    $groupNumber = $_POST['groupNumber'];
    $subgroupNumber = $_POST['subgroupNumber'];

    
    $sql = "SELECT lesson_name, teacher_name, classroom, lesson_type, lesson_duration FROM schedule 
            WHERE faculty = ? AND study_form = ? AND study_level = ? AND specialization = ? 
            AND group_number = ? AND (subgroup_number = ? OR subgroup_number IS NULL)";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }
    $stmt->bind_param("ssssii", $faculty, $studyForm, $studyLevel, $specialization, $groupNumber, $subgroupNumber);
    
} else if ($userType == "teacher") {
    $department = $_POST['department'];
    $teacherName = $_POST['teacherName'];

    $sql = "SELECT lesson_name, teacher_name, classroom, lesson_type, lesson_duration FROM schedule 
            WHERE department = ? AND teacher_name = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }
    $stmt->bind_param("ss", $department, $teacherName);
}


if (!$stmt->execute()) {
    die("Execute failed: " . $stmt->error);
}

$result = $stmt->get_result();
$schedule = array();

while ($row = $result->fetch_assoc()) {
    $schedule[] = $row;
}

$stmt->close();
$conn->close();
// Если данных нет, возвращаем сообщение
if (count($schedule)) {
    echo json_encode($schedule);
} else {
    echo json_encode(array("message" => "Таких данных нет в базе данных."));
}
?>
