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


// Получаем параметры из POST-запроса
$userType = $_POST['userType'];
$requestedDate = new DateTime($_POST['date']);  // Переданная дата
$currentWeekday = $_POST['weekday'];

// Получаем начало и конец семестра из базы данных
$sql_semester = "SELECT date_start, date_end FROM schedule LIMIT 1"; // предположим, что даты одинаковы для всех записей
$result_semester = $conn->query($sql_semester);

if ($result_semester->num_rows > 0) {
    $row = $result_semester->fetch_assoc();
    $dateStart = new DateTime($row['date_start']);
    $dateEnd = new DateTime($row['date_end']);
} else {
    die("Не удалось получить даты начала и конца семестра");
}

// Рассчитываем текущую неделю семестра
$today = new DateTime();
$weekDifference = $dateStart->diff($requestedDate)->days / 7;
$currentWeek = ceil($weekDifference);

// Определяем, какая сейчас неделя (1 или 2)
$weekType = $currentWeek % 2 == 0 ? 2 : 1;

if ($userType == "student") {
    $faculty = $_POST['faculty'];
    $studyForm = $_POST['studyForm'];
    $studyLevel = $_POST['studyLevel'];
    $specialization = $_POST['specialization'];
    $profile = $_POST['profile'];
    $course = $_POST['course'];
    $groupNumber = $_POST['groupNumber'];
    $subgroupNumber = $_POST['subgroupNumber'];

    $sql = "SELECT s.lesson_title, CONCAT(t.second_name, ' ', t.first_name, ' ', t.last_name) as teacher_name, 
            CONCAT(c.floor, '-', c.num) as class_room, lt.lesson_type_name, sr.time_start, sr.time_end, s.lesson_num
            FROM schedule AS s
            INNER JOIN education_group AS eg ON s.education_group_id = eg.id
            INNER JOIN education_program AS ep ON eg.education_program_id = ep.id
            INNER JOIN education_level AS el ON ep.education_level_id = el.id
            INNER JOIN education_form AS ef ON ep.education_form_id = ef.id
            INNER JOIN schedule_week AS sw ON ef.id = sw.education_form_id
            INNER JOIN education_profile AS epr ON ep.education_profile_id = epr.id
            INNER JOIN teacher AS t ON s.teacher_id = t.id
            INNER JOIN classroom AS c ON s.class_room_id = c.id
            INNER JOIN schedule_ring AS sr ON sr.education_form_id = ef.id AND sr.lesson_num = s.lesson_num
            INNER JOIN lesson_type AS lt ON s.lesson_type = lt.id
            INNER JOIN faculty AS f ON epr.faculty_id = f.id
            WHERE f.id = ? AND ef.education_form_name = ? AND el.education_level_name = ? AND epr.id = ? AND ep.education_program_name = ? AND eg.course = ?
            AND eg.num = ? AND (eg.subnum = ? OR eg.subnum IS NULL) AND s.weekday = ? AND s.week = ?
            ORDER BY s.lesson_num";
    
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }
    $stmt->bind_param("issisiiiii", $faculty, $studyForm, $studyLevel, $specialization, $profile, $course, $groupNumber, $subgroupNumber, $currentWeekday, $weekType);

} else if ($userType == "teacher") {
    $department = $_POST['department'];
    $teacherName = $_POST['teacherName'];

    $sql = "SELECT s.lesson_title, CONCAT(t.second_name, ' ', t.first_name, ' ', t.last_name) as teacher_name,
            CONCAT(c.floor, '-', c.num) as class_room, lt.lesson_type_name, sr.time_start, sr.time_end, s.lesson_num
            FROM schedule AS s
            INNER JOIN teacher AS t ON s.teacher_id = t.id
            INNER JOIN department AS d ON t.department_id = d.id
            INNER JOIN classroom AS c ON s.class_room_id = c.id
            INNER JOIN lesson_type AS lt ON s.lesson_type = lt.id
            INNER JOIN schedule_ring AS sr ON sr.lesson_num = s.lesson_num
            WHERE d.id = ? AND t.id = ? AND s.weekday = ? AND s.week = ?
            ORDER BY s.lesson_num";
    
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }
    $stmt->bind_param("iiii", $department, $teacherName, $currentWeekday, $weekType);
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
    echo json_encode(array("message" => "Не удалось найти расписание."));
}
?>