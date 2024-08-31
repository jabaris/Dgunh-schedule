// Текущая дата
let currentDate = new Date();

// Форматирование даты
let formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}

// Переключение полей формы в зависимости от типа пользователя
let toggleFormFields = () => {
    var userType = document.getElementById("userType").value;
    document.getElementById("studentFields").style.display = userType === "student" ? "block" : "none";
    document.getElementById("teacherFields").style.display = userType === "teacher" ? "block" : "none";

    if (userType === "student") {
        loadFaculty(); // Загружаем список факультетов при выборе "Студент"
    }
    if (userType === "teacher") {
        loadDepartments(); // Загружаем список кафедр при выборе "Преподаватель"
    }
}

// Функция для обработки изменения кафедры
let onDepartmentChange = () => {
    const departmentId = document.getElementById("department").value;
    loadTeachers(departmentId); // Загружаем преподавателей для выбранной кафедры
}

// Функция для обработки изменения faculty
let onFacultyChange = () => {
    const facultyId = document.getElementById("faculty").value;
    loadProfile(facultyId); // Загружаем  профили для выбранного факультета
}

// Отправка формы и запрос на сервер для получения расписания
let submitForm = () => {
    const userType = document.getElementById("userType").value;
    const selectedDay = formatDate(currentDate);
    document.getElementById("userForm").style.display = "none";
    const heading = document.getElementById("heading");
    heading.innerHTML = 'Расписание';
    document.getElementById("scheduleContainer").style.display = "block";

    let data = { 
        userType: userType, 
        date: currentDate.toISOString().split('T')[0], 
        weekday: currentDate.getDay()  // Добавляем день недели для запроса
    };
    
    if (userType === "student") {
        data.faculty = document.getElementById("faculty").value;
        data.studyForm = document.getElementById("studyForm").value;
        data.studyLevel = document.getElementById("studyLevel").value;
        data.specialization = document.getElementById("specialization").value;
        data.profile = document.getElementById("profile").value;
        data.groupNumber = document.getElementById("groupNumber").value;
        data.subgroupNumber = document.getElementById("subgroupNumber").value;
    } else if (userType === "teacher") {
        data.department = document.getElementById("department").value;
        data.teacherName = document.getElementById("teacherName").value;
    }

    console.log(data);

    $.ajax({
        url: 'php/get_schedule.php',
        type: 'POST',
        dataType: "json",
        data: data,
        success: function(response) {
            const schedule = response;
            if (userType === "student") {
                displaySchedule(schedule, selectedDay);
            } else if (userType === "teacher") {
                displayScheduleForTeacher(schedule, selectedDay);
            }
            if (schedule.message) {
                console.log(schedule.message);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error loading schedule:", error);
            document.getElementById("schedule").innerHTML = "<p>Произошла ошибка при загрузке расписания.</p>";
        }
    });
}