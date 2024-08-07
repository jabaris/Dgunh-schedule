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

    
    // $sql = "SELECT lesson_name, teacher_name, classroom, lesson_type, lesson_duration FROM schedule_old 
    //         WHERE faculty = ? AND study_form = ? AND study_level = ? AND specialization = ? 
    //         AND group_number = ? AND (subgroup_number = ? OR subgroup_number IS NULL)";
    
    // $sql = "SELECT s.lesson_title AS lesson_name, CONCAT(t.last_name, ' ', t.first_name, ' ', t.second_name) AS teacher_name, 
    // CONCAT(c.building, '-', c.floor, '-', c.num) AS classroom, lt.lesson_type_name AS lesson_type, sr.time_start AS lesson_start, sr.time_end AS lesson_end
    // FROM schedule s
    // JOIN education_group eg ON s.education_group_id = eg.id
    // JOIN education_program ep ON eg.education_program_id = ep.id
    // JOIN education_profile epr ON ep.id = epr.id
    // JOIN faculty f ON epr.faculty_id = f.id
    // JOIN education_form ef ON ep.education_form_id = ef.id
    // JOIN education_level el ON ep.education_level_id = el.id
    // JOIN teacher t ON s.teacher_id = t.id
    // JOIN classroom c ON s.class_room_id = c.id
    // JOIN lesson_type lt ON s.lesson_type = lt.id
    // JOIN schedule_ring sr ON sr.education_form_id = ef.id AND sr.lesson_num = s.lesson_num
    // WHERE f.faculty_name = ? AND ef.education_form_name = ? AND el.education_level_name = ? AND epr.education_profile_name = ? 
    // AND eg.num = ? AND (eg.subnum = ? OR eg.subnum IS NULL)";

    $sql = "SELECT s.lesson_title, CONCAT(t.last_name, ' ', t.first_name, ' ', t.second_name) as teacher_name, CONCAT(c.floor, '-', c.num) as class_room, lt.lesson_type_name, sr.time_start, sr.time_end
    FROM schedule AS s
    INNER JOIN education_group AS eg ON s.education_group_id = eg.id
    INNER JOIN education_program AS ep ON eg.education_program_id = ep.id
    INNER JOIN education_level AS el ON ep.education_level_id = el.id
    INNER JOIN education_form AS ef ON ep.education_form_id = ef.id
    INNER JOIN education_profile AS epr ON ep.education_profile_id = epr.id
    INNER JOIN teacher AS t ON s.teacher_id = t.id
    INNER JOIN classroom AS c ON s.class_room_id = c.id
    INNER JOIN schedule_ring AS sr ON sr.education_form_id = ef.id AND sr.lesson_num = s.lesson_num
    INNER JOIN lesson_type AS lt ON s.lesson_type = lt.id
    INNER JOIN faculty AS f ON epr.faculty_id = f.id
    WHERE f.faculty_name = ? AND ef.education_form_name = ? AND el.education_level_name = ? AND epr.education_profile_name = ? 
    AND eg.num = ? AND (eg.subnum = ? OR eg.subnum IS NULL)";
    
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        error_log("Execute failed: " . $stmt->error);
        die("Prepare failed: " . $conn->error);
    }
    $stmt->bind_param("ssssii", $faculty, $studyForm, $studyLevel, $specialization, $groupNumber, $subgroupNumber);

    
} else if ($userType == "teacher") {
    $department = $_POST['department'];
    $teacherName = $_POST['teacherName'];

    $sql = "SELECT lesson_name, teacher_name, classroom, lesson_type, lesson_duration FROM schedule_old 
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
