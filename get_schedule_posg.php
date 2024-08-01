<?php
header('Content-type: application/json;');
$host = "your_host";
$dbname = "your_database";
$user = "your_user";
$password = "your_password";

$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Connection failed: " . pg_last_error());
}

$user_type = $_POST['user_type'];
$selected_day = $_POST['selected_day'];

if ($user_type == 'student') {
    $faculty = $_POST['faculty'];
    $studyForm = $_POST['studyForm'];
    $studyLevel = $_POST['studyLevel'];
    $specialization = $_POST['specialization'];
    $groupNumber = $_POST['groupNumber'];
    $subgroupNumber = $_POST['subgroupNumber'];

    $query = "SELECT * FROM schedule WHERE faculty = '$faculty' AND study_form = '$studyForm' AND study_level = '$studyLevel' AND specialization = '$specialization' AND group_number = '$groupNumber' AND subgroup_number = '$subgroupNumber' AND day = '$selected_day'";
} else if ($user_type == 'teacher') {
    $department = $_POST['department'];
    $teacherName = $_POST['teacherName'];

    $query = "SELECT * FROM schedule WHERE department = '$department' AND teacher_name = '$teacherName' AND day = '$selected_day'";
}

$result = pg_query($conn, $query);

$schedule = [];

while ($row = pg_fetch_assoc($result)) {
    $schedule[] = $row;
}

pg_close($conn);

header('Content-Type: application/json');
echo json_encode($schedule);
?>
