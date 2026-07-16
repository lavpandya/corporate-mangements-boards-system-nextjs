-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2026 at 07:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `board_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tasks`
--

CREATE TABLE `tbl_tasks` (
  `task_id` int(11) NOT NULL,
  `board_id` int(11) DEFAULT NULL,
  `column_id` int(11) DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `assignee` varchar(50) NOT NULL,
  `label` varchar(50) NOT NULL,
  `status` enum('todo','in_progress','done') DEFAULT 'todo',
  `priority` enum('low','medium','high') DEFAULT 'medium',
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `due_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_tasks`
--

INSERT INTO `tbl_tasks` (`task_id`, `board_id`, `column_id`, `title`, `description`, `assignee`, `label`, `status`, `priority`, `created_by`, `created_at`, `due_date`) VALUES
(4, NULL, NULL, 'Title', 'Description', 'Testing', 'Testing', 'todo', 'medium', NULL, '2026-07-14 14:22:24', '2026-07-15'),
(10, NULL, NULL, 'Task 2 one ', 'Task Description', 'Babuncxc', 'Label Task', 'done', 'high', NULL, '2026-07-14 16:29:22', '2026-07-13'),
(14, NULL, NULL, 'First', 'First first Open Form', 'Asd ', 'asd', 'done', 'low', NULL, '2026-07-15 21:46:04', '2026-07-14'),
(17, 1, 1, 'Task Title 12345', 'Descritpion from one two three  1234', 'Man', 'Label', 'done', 'medium', 123, '2026-07-16 06:49:30', '2026-07-05'),
(25, NULL, NULL, 'Title Section', 'Descritpition', 'Asssigne Value', 'Labels one', 'done', 'high', NULL, '2026-07-16 13:16:08', '2026-07-14'),
(26, NULL, NULL, 'Checking Databases', 'Checking Databases', 'Checking Databases', 'Checking Databases', 'done', 'high', NULL, '2026-07-16 14:14:01', '2026-07-14'),
(31, NULL, NULL, 'test Title', 'Test Check title', 'Assigneeas', 'Labels', 'done', 'medium', NULL, '2026-07-16 15:55:45', '2026-07-12'),
(32, NULL, NULL, 'Test', 'test', 'test', 'test', 'todo', 'medium', NULL, '2026-07-16 16:16:12', '2026-07-15'),
(33, NULL, NULL, 'Que', 'QWersdfdf', 'WAS', 'QSD', 'todo', 'low', NULL, '2026-07-16 17:18:11', '2026-07-15');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','member') DEFAULT 'member',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `name`, `email`, `password_hash`, `role`, `created_at`, `updated_at`) VALUES
(1, 'ram', 'ram@example.com', '$2b$10$kDOUNHOUmmNr7ZQevIFLQe.btwUh5Y31YI3/ugNwqy5F.zp3N85k6', 'admin', '2026-07-14 17:01:16', '2026-07-14 17:01:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_tasks`
--
ALTER TABLE `tbl_tasks`
  ADD PRIMARY KEY (`task_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_tasks`
--
ALTER TABLE `tbl_tasks`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
