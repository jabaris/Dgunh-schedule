// Загрузка кафедр из базы данных
let loadDepartments = () => {
    $.ajax({
        url: 'php/get_departments.php', // URL к вашему PHP скрипту
        type: 'GET',
        dataType: "json",
        success: function(response) {
            const departmentSelect = document.getElementById("department");

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
        url: 'php/get_teachers.php',
        type: 'GET',
        dataType: "json",
        data: { department_id: departmentId },
        success: function(response) {
            const teacherSelect = document.getElementById("teacherName");

            // Очищаем текущие опции в селекте преподавателей
            teacherSelect.innerHTML = '';

            if (response.error) {
                console.error("Error loading teachers:", response.error);
                return;
            }

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

// Загрузка факультетов из базы данных
let loadFaculty = () => {
    $.ajax({
        url: 'php/get_faculty.php', // URL к вашему PHP скрипту
        type: 'GET',
        dataType: "json",
        success: function(response) {
            const facultySelect = document.getElementById("faculty");

            response.forEach(faculty => {
                let option = document.createElement("option");
                option.value = faculty.id;
                option.text = faculty.faculty_name;
                facultySelect.appendChild(option);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading departments:", error);
        }
    });
}

// Функция для загрузки списка преподавателей на основе выбранной кафедры
let loadProfile = (facultyId) => {
    $.ajax({
        url: 'php/get_profile.php',
        type: 'GET',
        dataType: "json",
        data: { faculty_id: facultyId },
        success: function(response) {
            const facultySelect = document.getElementById("specialization");

            // Очищаем текущие опции в селекте преподавателей
            facultySelect.innerHTML = '';

            if (response.error) {
                console.error("Error loading teachers:", response.error);
                return;
            }

            response.forEach(profile => {
                let option = document.createElement("option");
                option.value = profile.id;
                option.text = profile.education_profile_name;
                facultySelect.appendChild(option);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading teachers:", error);
        }
    });
}

// Функция для загрузки списка профиля обучения на основе выбранных форм и уровня обучения
let loadProgram = (educationFormId,educationLevelId) => {
    $.ajax({
        url: 'php/get_program.php',
        type: 'GET',
        dataType: "json",
        data: {
            education_form_id: educationFormId,
            education_level_id: educationLevelId
         },
        success: function(response) {
            const programSelect = document.getElementById("profile");

            // Очищаем текущие опции в селекте преподавателей
            programSelect.innerHTML = '';

            if (response.error) {
                console.error("Error loading teachers:", response.error);
                return;
            }

            response.forEach(program => {
                let option = document.createElement("option");
                option.value = program.id;
                option.text = program.education_program_name;
                programSelect.appendChild(option);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading teachers:", error);
        }
    });
}