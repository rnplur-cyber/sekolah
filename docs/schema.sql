-- Skema Database untuk Aplikasi Manajemen Sekolah

-- Tabel untuk Mata Pelajaran
CREATE TABLE `subjects` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- Tabel untuk Staf (Guru dan Karyawan)
-- Kolom `role` membedakan antara 'teacher' dan 'employee'
CREATE TABLE `staff` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` enum('teacher','employee') NOT NULL,
  `nip` varchar(255) DEFAULT NULL,
  `subjectId` varchar(255) DEFAULT NULL,
  `jobTitle` varchar(255) DEFAULT NULL,
  `avatarUrl` varchar(255) DEFAULT NULL,
  `avatarHint` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subjectId` (`subjectId`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`id`) ON DELETE SET NULL
);

-- Tabel untuk Kelas
-- `walikelasId` adalah foreign key ke tabel `staff`
CREATE TABLE `classes` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `walikelasId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `walikelasId` (`walikelasId`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`walikelasId`) REFERENCES `staff` (`id`) ON DELETE SET NULL
);

-- Tabel pivot untuk hubungan many-to-many antara guru dan kelas yang diajar
CREATE TABLE `staff_classes` (
  `staffId` varchar(255) NOT NULL,
  `classId` varchar(255) NOT NULL,
  PRIMARY KEY (`staffId`,`classId`),
  KEY `classId` (`classId`),
  CONSTRAINT `staff_classes_ibfk_1` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`) ON DELETE CASCADE,
  CONSTRAINT `staff_classes_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
);


-- Tabel untuk Pendaftar Siswa Baru
CREATE TABLE `newStudentApplicants` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `previousSchool` varchar(255) NOT NULL,
  `registrationDate` datetime NOT NULL,
  `status` enum('Pending','Accepted','Rejected') NOT NULL,
  `parentName` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `birthPlace` varchar(255) NOT NULL,
  `birthDate` date NOT NULL,
  `gender` enum('Laki-laki','Perempuan') NOT NULL,
  `address` text NOT NULL,
  `academicYear` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- Tabel untuk Siswa
-- `classId` adalah foreign key ke tabel `classes`
-- `applicantId` (opsional) untuk menautkan siswa ke data pendaftarannya
CREATE TABLE `students` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `classId` varchar(255) DEFAULT NULL,
  `avatarUrl` varchar(255) DEFAULT NULL,
  `avatarHint` varchar(255) DEFAULT NULL,
  `applicantId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `applicantId` (`applicantId`),
  KEY `classId` (`classId`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE SET NULL,
  CONSTRAINT `students_ibfk_2` FOREIGN KEY (`applicantId`) REFERENCES `newStudentApplicants` (`id`) ON DELETE SET NULL
);


-- Tabel untuk Jadwal Pelajaran
CREATE TABLE `schedules` (
  `id` varchar(255) NOT NULL,
  `classId` varchar(255) NOT NULL,
  `subjectId` varchar(255) NOT NULL,
  `teacherId` varchar(255) NOT NULL,
  `day` enum('Monday','Tuesday','Wednesday','Thursday','Friday') NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  KEY `subjectId` (`subjectId`),
  KEY `teacherId` (`teacherId`),
  CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `schedules_ibfk_3` FOREIGN KEY (`teacherId`) REFERENCES `staff` (`id`) ON DELETE CASCADE
);


-- Tabel untuk Pengguna Sistem (untuk login)
-- `staffId` (opsional) untuk menautkan akun pengguna ke data staf
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','teacher') NOT NULL DEFAULT 'teacher',
  `staffId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `staffId` (`staffId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`) ON DELETE SET NULL
);
