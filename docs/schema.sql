
-- Skema Database Sistem Manajemen Sekolah

-- Tabel untuk Mata Pelajaran
CREATE TABLE `subjects` (
  `id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabel untuk Staf (Guru dan Karyawan)
CREATE TABLE `staff` (
  `id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` enum('teacher','employee') NOT NULL,
  `nip` varchar(20) DEFAULT NULL,
  `subjectId` varchar(20) DEFAULT NULL,
  `jobTitle` varchar(100) DEFAULT NULL,
  `avatarUrl` varchar(255) DEFAULT NULL,
  `avatarHint` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nip_UNIQUE` (`nip`),
  KEY `subjectId_idx` (`subjectId`),
  CONSTRAINT `fk_staff_subject` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tabel untuk Kelas
CREATE TABLE `classes` (
  `id` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `walikelasId` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `walikelasId_idx` (`walikelasId`),
  CONSTRAINT `fk_classes_staff` FOREIGN KEY (`walikelasId`) REFERENCES `staff` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabel Pendaftar Siswa Baru
CREATE TABLE `newStudentApplicants` (
  `id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `previousSchool` varchar(100) NOT NULL,
  `registrationDate` datetime NOT NULL,
  `status` enum('Pending','Accepted','Rejected') NOT NULL,
  `parentName` varchar(100) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `birthPlace` varchar(50) NOT NULL,
  `birthDate` date NOT NULL,
  `gender` enum('Laki-laki','Perempuan') NOT NULL,
  `address` text NOT NULL,
  `academicYear` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabel untuk Siswa
CREATE TABLE `students` (
  `id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `classId` varchar(20) DEFAULT NULL,
  `avatarUrl` varchar(255) DEFAULT NULL,
  `avatarHint` varchar(100) DEFAULT NULL,
  `applicantId` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `classId_idx` (`classId`),
  KEY `fk_students_applicant_idx` (`applicantId`),
  CONSTRAINT `fk_students_applicant` FOREIGN KEY (`applicantId`) REFERENCES `newStudentApplicants` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_students_class` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Tabel untuk Jadwal Pelajaran
CREATE TABLE `schedules` (
  `id` varchar(20) NOT NULL,
  `classId` varchar(20) NOT NULL,
  `subjectId` varchar(20) NOT NULL,
  `teacherId` varchar(20) NOT NULL,
  `day` enum('Monday','Tuesday','Wednesday','Thursday','Friday') NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classId_idx` (`classId`),
  KEY `subjectId_idx` (`subjectId`),
  KEY `teacherId_idx` (`teacherId`),
  CONSTRAINT `fk_schedules_class` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_schedules_subject` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_schedules_teacher` FOREIGN KEY (`teacherId`) REFERENCES `staff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabel untuk Pengguna Sistem (Login)
CREATE TABLE `users` (
  `id` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','teacher') NOT NULL,
  `staffId` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `staffId_idx` (`staffId`),
  CONSTRAINT `fk_users_staff` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabel Asosiasi Guru dan Kelas yang Diajar
CREATE TABLE `staff_classes` (
  `staffId` varchar(20) NOT NULL,
  `classId` varchar(20) NOT NULL,
  PRIMARY KEY (`staffId`,`classId`),
  KEY `fk_staffclasses_class_idx` (`classId`),
  CONSTRAINT `fk_staffclasses_class` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_staffclasses_staff` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabel untuk Jurnal Mengajar
CREATE TABLE `teachingJournals` (
  `id` varchar(20) NOT NULL,
  `teacherId` varchar(20) NOT NULL,
  `classId` varchar(20) NOT NULL,
  `subjectId` varchar(20) NOT NULL,
  `date` datetime NOT NULL,
  `topic` varchar(255) NOT NULL,
  `notes` text,
  `materialFile` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId_idx` (`teacherId`),
  KEY `classId_idx` (`classId`),
  KEY `subjectId_idx` (`subjectId`),
  CONSTRAINT `fk_journal_class` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_journal_subject` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_journal_teacher` FOREIGN KEY (`teacherId`) REFERENCES `staff` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabel untuk Catatan Absensi
CREATE TABLE `attendanceRecords` (
  `id` varchar(20) NOT NULL,
  `studentId` varchar(20) DEFAULT NULL,
  `staffId` varchar(20) DEFAULT NULL,
  `timestamp` datetime NOT NULL,
  `status` enum('Present','Late','Absent') NOT NULL,
  `classId` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId_idx` (`studentId`),
  KEY `staffId_idx` (`staffId`),
  KEY `classId_idx` (`classId`),
  CONSTRAINT `fk_attendance_class` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_attendance_staff` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_attendance_student` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
