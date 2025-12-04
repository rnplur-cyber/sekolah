-- Skema Database MySQL untuk Aplikasi Manajemen Sekolah

-- Hapus tabel jika sudah ada untuk menghindari error saat pembuatan ulang
DROP TABLE IF EXISTS `teaching_journal_class_junction`, `teacher_taught_class_junction`, `schedules`, `teaching_journals`, `attendance_records`, `new_student_applicants`, `students`, `employees`, `classes`, `teachers`, `subjects`;

-- Tabel Mata Pelajaran
CREATE TABLE `subjects` (
  `id` VARCHAR(255) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL
);

-- Tabel Guru
CREATE TABLE `teachers` (
  `id` VARCHAR(255) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `nip` VARCHAR(255) NOT NULL UNIQUE,
  `subject_id` VARCHAR(255) NOT NULL,
  `avatar_url` TEXT,
  `avatar_hint` VARCHAR(255),
  FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`)
);

-- Tabel Karyawan Non-Guru
CREATE TABLE `employees` (
  `id` VARCHAR(255) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL,
  `avatar_url` TEXT,
  `avatar_hint` VARCHAR(255)
);

-- Tabel Kelas
CREATE TABLE `classes` (
  `id` VARCHAR(255) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL UNIQUE,
  `walikelas_id` VARCHAR(255) NOT NULL,
  `student_count` INT NOT NULL DEFAULT 0,
  FOREIGN KEY (`walikelas_id`) REFERENCES `teachers`(`id`)
);

-- Tabel Junction untuk menghubungkan Guru dengan Kelas yang diajar (Relasi Many-to-Many)
CREATE TABLE `teacher_taught_class_junction` (
  `teacher_id` VARCHAR(255),
  `class_id` VARCHAR(255),
  PRIMARY KEY (`teacher_id`, `class_id`),
  FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE CASCADE
);


-- Tabel Siswa
CREATE TABLE `students` (
  `id` VARCHAR(255) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `class_id` VARCHAR(255) NOT NULL,
  `avatar_url` TEXT,
  `avatar_hint` VARCHAR(255),
  FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`)
);

-- Tabel Pendaftar Siswa Baru
CREATE TABLE `new_student_applicants` (
  `id` VARCHAR(255) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `previous_school` VARCHAR(255) NOT NULL,
  `registration_date` DATETIME NOT NULL,
  `status` ENUM('Pending', 'Accepted', 'Rejected') NOT NULL,
  `parent_name` VARCHAR(255) NOT NULL,
  `contact` VARCHAR(50) NOT NULL,
  `birth_place` VARCHAR(100) NOT NULL,
  `birth_date` DATE NOT NULL,
  `gender` ENUM('Laki-laki', 'Perempuan') NOT NULL,
  `address` TEXT NOT NULL,
  `academic_year` VARCHAR(20) NOT NULL
);

-- Tabel Catatan Absensi (Gabungan)
CREATE TABLE `attendance_records` (
  `id` VARCHAR(255) PRIMARY KEY,
  `student_id` VARCHAR(255),
  `teacher_id` VARCHAR(255),
  `employee_id` VARCHAR(255),
  `timestamp` DATETIME NOT NULL,
  `status` ENUM('Present', 'Late', 'Absent') NOT NULL,
  INDEX `idx_timestamp` (`timestamp`),
  FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE SET NULL
);

-- Tabel Jurnal Mengajar
CREATE TABLE `teaching_journals` (
  `id` VARCHAR(255) PRIMARY KEY,
  `teacher_id` VARCHAR(255) NOT NULL,
  `class_id` VARCHAR(255) NOT NULL,
  `subject_id` VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `topic` VARCHAR(255) NOT NULL,
  `notes` TEXT,
  `material_file` VARCHAR(255),
  FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`),
  FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`),
  FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`)
);

-- Tabel Jadwal Pelajaran
CREATE TABLE `schedules` (
  `id` VARCHAR(255) PRIMARY KEY,
  `class_id` VARCHAR(255) NOT NULL,
  `subject_id` VARCHAR(255) NOT NULL,
  `teacher_id` VARCHAR(255) NOT NULL,
  `day` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday') NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  UNIQUE `unique_schedule_entry` (`class_id`, `day`, `start_time`),
  FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`),
  FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`),
  FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`)
);
