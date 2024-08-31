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

let displayScheduleForTeacher = (schedule, selectedDay) => {
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
                <strong>${item.teacher_name}</strong>
            </div>
            <p class='m-0 p-2 border-bottom'>Занятие: ${item.lesson_title}</p>
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