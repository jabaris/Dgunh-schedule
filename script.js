// Текущая дата
let currentDate = new Date();

// Форматирование даты
let formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}

// Загрузка кафедр из базы данных
let loadDepartments = () => {
    $.ajax({
        url: 'get_departments.php', // URL к вашему PHP скрипту
        type: 'GET',
        dataType: "json",
        success: function(response) {
            const departmentSelect = document.getElementById("department");
            console.log(response);
            // Очищаем селект перед добавлением новых данных
            departmentSelect.innerHTML = '';

            response.forEach(department => {
                let option = document.createElement("option");
                option.value = department.id;
                option.text = department.department_name;
                departmentSelect.appendChild(option);
            });
            
        },
        error: function(xhr, status, error) {
            console.error("Error loading departments:", error);
        }
    });
}
// Функция для загрузки списка преподавателей на основе выбранной кафедры
let loadTeachers = (departmentId) => {
    $.ajax({
        url: 'get_teachers.php',
        type: 'GET',
        dataType: "json",
        data: { department_id: departmentId },
        success: function(response) {
            const teacherSelect = document.getElementById("teacherName");

            // Очищаем селект перед добавлением новых данных
            teacherSelect.innerHTML = '';

            response.forEach(teacher => {
                let option = document.createElement("option");
                option.value = teacher.id;
                option.text = teacher.teacher_name;
                teacherSelect.appendChild(option);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading teachers:", error);
        }
    });
}

// Переключение полей формы в зависимости от типа пользователя
let toggleFormFields = () => {
    var userType = document.getElementById("userType").value;
    document.getElementById("studentFields").style.display = userType === "student" ? "block" : "none";
    document.getElementById("teacherFields").style.display = userType === "teacher" ? "block" : "none";

    if (userType === "teacher") {
        loadDepartments(); // Загружаем список кафедр при выборе "Преподаватель"
    }
}
// Функция для обработки изменения кафедры
let onDepartmentChange = () => {
    const departmentId = document.getElementById("department").value;
    loadTeachers(departmentId); // Загружаем преподавателей для выбранной кафедры
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
        url: 'get_schedule.php',
        type: 'POST',
        dataType: "json",
        data: data,
        success: function(response) {
            const schedule = response;
            displaySchedule(schedule, selectedDay);
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

// Отображение расписания на странице
let displaySchedule = (schedule, selectedDay) => {
    document.getElementById("selectedDay").innerText = selectedDay;
    const scheduleContainer = document.getElementById("schedule");

    // Очищаем предыдущие результаты
    scheduleContainer.innerHTML = '';

    if (schedule.message) {
        scheduleContainer.innerHTML = '<p>' + schedule.message + '</p>';
        return;
    }

    schedule.forEach(item => {
        const scheduleItem = document.createElement("div");
        scheduleItem.classList.add('schedule-item', 'border', 'mt-2');
        scheduleItem.innerHTML = `
            <div class='text-center border-bottom'>
                <span>${item.lesson_num}</span>
                <strong>${item.lesson_title}</strong>
            </div>
            <p class='m-0 p-2 border-bottom'>Преподаватель: ${item.teacher_name}</p>
            <p class='m-0 p-2 border-bottom'>Аудитория: ${item.class_room}</p>
            <p class='m-0 p-2 border-bottom'>Тип занятия: ${item.lesson_type_name}</p>
            <p class='m-0 p-2 border-bottom'>Начало занятия: ${item.time_start}</p>
            <p class='m-0 p-2'>Конец занятия: ${item.time_end}</p>
        `;
        scheduleContainer.appendChild(scheduleItem);
    });
}

// Изменение дня при нажатии кнопок "вперед" и "назад"
let changeDay = (direction) => {
    currentDate.setDate(currentDate.getDate() + direction);  // Изменяем текущую дату
    submitForm();  // Отправляем обновленные данные на сервер
}