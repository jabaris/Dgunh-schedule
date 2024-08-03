let currentDate = new Date();

let formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}


let toggleFormFields = () => {
    var userType = document.getElementById("userType").value;
    document.getElementById("studentFields").style.display = userType === "student" ? "block" : "none";
    document.getElementById("teacherFields").style.display = userType === "teacher" ? "block" : "none";
}

let submitForm = () => {
    const userType = document.getElementById("userType").value;
    const selectedDay = formatDate(currentDate);
    const userForm = document.getElementById("userForm").style.display = "none";
    const heading = document.getElementById("heading");
    heading.innerHTML = 'Расписание';

    let data = { userType: userType, day: selectedDay };
    

    if (userType === "student") {
        data.faculty = document.getElementById("faculty").value;
        data.studyForm = document.getElementById("studyForm").value;
        data.studyLevel = document.getElementById("studyLevel").value;
        data.specialization = document.getElementById("specialization").value;
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
            console.log(schedule);
            displaySchedule(schedule, selectedDay);
            if (schedule.message) {
                console.log(schedule.message);
            }
        }
    });
}

let backToForm = () => {
    const userForm = document.getElementById("userForm").style.display = "block";
    const scheduleContainer = document.getElementById("scheduleContainer").style.display = "none";
    const heading = document.getElementById("heading");
    heading.innerHTML = 'Выберите тип пользователя';
}

let displaySchedule = (schedule, selectedDay) => {
    document.getElementById("selectedDay").innerText = selectedDay;
    const scheduleContainer = document.getElementById("schedule");
    scheduleContainer.innerHTML = '';

    if (schedule.message) {
        scheduleContainer.innerHTML = '<p>' + schedule.message + '</p>';
        return;
    }

    schedule.forEach(item => {
        const scheduleItem = document.createElement("div");
        scheduleItem.classList.add('schedule-item', 'border', 'mt-2');
        scheduleItem.innerHTML = `
            <div class='text-center border-bottom'><strong>${item.lesson_name}</strong></div>
            <p class='m-0 border-bottom'>Преподаватель: ${item.teacher_name}</p>
            <p class='m-0 border-bottom'>Аудитория: ${item.classroom}</p>
            <p class='m-0 border-bottom'>Тип занятия: ${item.lesson_type}</p>
            <p class='m-0 border-bottom'>Длительность: ${item.lesson_duration}</p>
        `;
        scheduleContainer.appendChild(scheduleItem);
    });

    document.getElementById("scheduleContainer").style.display = "block";
}

let changeDay = (direction) => {
    currentDate.setDate(currentDate.getDate() + direction);
    submitForm();
}