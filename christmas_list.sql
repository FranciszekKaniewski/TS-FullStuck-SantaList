-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 12 Sie 2023, 09:29
-- Wersja serwera: 10.4.22-MariaDB
-- Wersja PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `christmas_list`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kids`
--

CREATE TABLE `kids` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `name` varchar(50) NOT NULL,
  `toyId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `kids`
--

INSERT INTO `kids` (`id`, `name`, `toyId`) VALUES
('609cfe6e-2c64-11ee-9ad4-18c04dda4d85', 'Jacuś', '6a2f6635-248a-11ee-861e-18c04dda4d85'),
('7e7f2c62-d8f3-11ed-b8eb-18c04dda', 'Batrtuś', '8a9b5efb-a400-4e5c-b418-a63aa2cde739'),
('979b6448-d8f3-11ed-b8eb-18c04dda', 'Tomuś', '75d5dbcd-941b-4d03-9815-b0f5ff629fc9'),
('99f16acd-d8f3-11ed-b8eb-18c04dda', 'Ania', 'ed5ed261-9eec-4d94-808c-3f929e99f0fd'),
('9cdeaae0-d8f3-11ed-b8eb-18c04dda', 'Brajanek', '66b5e61e-2488-11ee-861e-18c04dda4d85');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `presents`
--

CREATE TABLE `presents` (
  `id` varchar(36) NOT NULL DEFAULT uuid(),
  `name` varchar(50) DEFAULT NULL,
  `value` int(6) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `presents`
--

INSERT INTO `presents` (`id`, `name`, `value`) VALUES
('66b5e61e-2488-11ee-861e-18c04dda4d85', 'Piłka', 2),
('6a2f6635-248a-11ee-861e-18c04dda4d85', 'Lalka', 4),
('75d5dbcd-941b-4d03-9815-b0f5ff629fc9', 'Ciasteczka', 4),
('8a9b5efb-a400-4e5c-b418-a63aa2cde739', '🎈', 3),
('ed5ed261-9eec-4d94-808c-3f929e99f0fd', 'Węgielek', 6);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `kids`
--
ALTER TABLE `kids`
  ADD PRIMARY KEY (`id`),
  ADD KEY `toyId` (`toyId`);

--
-- Indeksy dla tabeli `presents`
--
ALTER TABLE `presents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `kids`
--
ALTER TABLE `kids`
  ADD CONSTRAINT `FK_kids_presents` FOREIGN KEY (`toyId`) REFERENCES `presents` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
