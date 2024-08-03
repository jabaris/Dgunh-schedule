CREATE TABLE schedule_old (
    id INT AUTO_INCREMENT PRIMARY KEY,
    faculty VARCHAR(255) NOT NULL,
    study_form VARCHAR(255) NOT NULL,
    study_level VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    group_number INT NOT NULL,
    subgroup_number INT,
    lesson_name VARCHAR(255) NOT NULL,
    teacher_name VARCHAR(255) NOT NULL,
    classroom VARCHAR(255) NOT NULL,
    lesson_type VARCHAR(255) NOT NULL,
    lesson_duration VARCHAR(255) NOT NULL,
    day DATE NOT NULL
);

INSERT INTO schedule_old (faculty, study_form, study_level, specialization, group_number, subgroup_number, lesson_name, teacher_name, classroom, lesson_type, lesson_duration, day)
VALUES 
('ИТиЭ', 'fullTime', 'bachelor', 'CS', 1, 1, 'Программирование', 'Иванов Иван Иванович', '101', 'лекция', '1.5 часа', '2024-07-22'),
('ИТиЭ', 'fullTime', 'bachelor', 'CS', 1, 1, 'Алгоритмы', 'Петров Петр Петрович', '102', 'практическое', '2 часа', '2024-07-22'),
('ИТиЭ', 'fullTime', 'bachelor', 'CS', 1, NULL, 'Базы данных', 'Сидоров Сидор Сидорович', '103', 'лабораторное', '1 час', '2024-07-22');
