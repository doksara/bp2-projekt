-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 22, 2017 at 02:16 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nova_baza`
--

-- --------------------------------------------------------

--
-- Table structure for table `glumac`
--

CREATE TABLE `glumac` (
  `id` int(11) NOT NULL,
  `naziv` varchar(40) NOT NULL,
  `spol` varchar(6) NOT NULL,
  `datum_rodenja` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Triggers `glumac`
--
DELIMITER $$
CREATE TRIGGER `glumci_inkrement` AFTER INSERT ON `glumac` FOR EACH ROW BEGIN
UPDATE statistika SET statistika.broj_glumaca=statistika.broj_glumaca+1;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `serija_glumci`
--

CREATE TABLE `serija_glumci` (
  `id_serije` int(11) NOT NULL,
  `id_glumca` int(11) NOT NULL,
  `id_uloge` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `serija_tvkuca`
--

CREATE TABLE `serija_tvkuca` (
  `id_serije` int(11) NOT NULL,
  `id_tvKuce` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `serije`
--

CREATE TABLE `serije` (
  `id` int(11) NOT NULL,
  `naziv` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `opis` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ocjena` varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Triggers `serije`
--
DELIMITER $$
CREATE TRIGGER `serija_dekrement` AFTER DELETE ON `serije` FOR EACH ROW BEGIN
UPDATE statistika SET statistika.broj_serija = statistika.broj_serija-1;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `serija_inkrement` AFTER INSERT ON `serije` FOR EACH ROW BEGIN
UPDATE statistika SET statistika.broj_serija = statistika.broj_serija+1;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `serije_tagovi`
--

CREATE TABLE `serije_tagovi` (
  `id_serije` int(11) NOT NULL,
  `id_taga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `serije_zanrovi`
--

CREATE TABLE `serije_zanrovi` (
  `id_serije` int(11) NOT NULL,
  `id_zanra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `statistika`
--

CREATE TABLE `statistika` (
  `broj_serija` int(11) NOT NULL DEFAULT '0',
  `broj_glumaca` int(11) NOT NULL DEFAULT '0',
  `broj_tvKuca` int(11) NOT NULL DEFAULT '0',
  `broj_tagova` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `statistika`
--

INSERT INTO `statistika` (`broj_serija`, `broj_glumaca`, `broj_tvKuca`, `broj_tagova`) VALUES
(0, 5, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tagovi`
--

CREATE TABLE `tagovi` (
  `id` int(11) NOT NULL,
  `tag` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Triggers `tagovi`
--
DELIMITER $$
CREATE TRIGGER `tagovi_inkrement` AFTER INSERT ON `tagovi` FOR EACH ROW BEGIN
UPDATE statistika SET statistika.broj_tagova = statistika.broj_tagova+1;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tv_kuca`
--

CREATE TABLE `tv_kuca` (
  `id` int(11) NOT NULL,
  `naziv` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tv_kuca`
--

INSERT INTO `tv_kuca` (`id`, `naziv`) VALUES
(1, 'AMC'),
(4, 'HBO');

--
-- Triggers `tv_kuca`
--
DELIMITER $$
CREATE TRIGGER `tvKuca_inkrement` AFTER INSERT ON `tv_kuca` FOR EACH ROW BEGIN
UPDATE statistika SET statistika.broj_tvKuca = statistika.broj_tvKuca+1;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `uloga`
--

CREATE TABLE `uloga` (
  `id` int(11) NOT NULL,
  `uloga` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `zanrovi`
--

CREATE TABLE `zanrovi` (
  `id` int(11) NOT NULL,
  `naziv` varchar(30) NOT NULL,
  `opis` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `glumac`
--
ALTER TABLE `glumac`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `serija_glumci`
--
ALTER TABLE `serija_glumci`
  ADD KEY `fk_5` (`id_serije`),
  ADD KEY `fk_7` (`id_glumca`),
  ADD KEY `fk_13` (`id_uloge`);

--
-- Indexes for table `serija_tvkuca`
--
ALTER TABLE `serija_tvkuca`
  ADD KEY `fk_8` (`id_serije`),
  ADD KEY `fk_9` (`id_tvKuce`);

--
-- Indexes for table `serije`
--
ALTER TABLE `serije`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `serije_tagovi`
--
ALTER TABLE `serije_tagovi`
  ADD KEY `fk_3` (`id_serije`),
  ADD KEY `fk_4` (`id_taga`);

--
-- Indexes for table `serije_zanrovi`
--
ALTER TABLE `serije_zanrovi`
  ADD KEY `fk_1` (`id_serije`),
  ADD KEY `fk_2` (`id_zanra`);

--
-- Indexes for table `tagovi`
--
ALTER TABLE `tagovi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tv_kuca`
--
ALTER TABLE `tv_kuca`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `uloga`
--
ALTER TABLE `uloga`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zanrovi`
--
ALTER TABLE `zanrovi`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `glumac`
--
ALTER TABLE `glumac`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `serije`
--
ALTER TABLE `serije`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tagovi`
--
ALTER TABLE `tagovi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tv_kuca`
--
ALTER TABLE `tv_kuca`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `uloga`
--
ALTER TABLE `uloga`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zanrovi`
--
ALTER TABLE `zanrovi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `serija_glumci`
--
ALTER TABLE `serija_glumci`
  ADD CONSTRAINT `fk_13` FOREIGN KEY (`id_uloge`) REFERENCES `uloga` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_5` FOREIGN KEY (`id_serije`) REFERENCES `serije` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_7` FOREIGN KEY (`id_glumca`) REFERENCES `glumac` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `serija_tvkuca`
--
ALTER TABLE `serija_tvkuca`
  ADD CONSTRAINT `fk_8` FOREIGN KEY (`id_serije`) REFERENCES `serije` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_9` FOREIGN KEY (`id_tvKuce`) REFERENCES `tv_kuca` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `serije_tagovi`
--
ALTER TABLE `serije_tagovi`
  ADD CONSTRAINT `fk_3` FOREIGN KEY (`id_serije`) REFERENCES `serije` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_4` FOREIGN KEY (`id_taga`) REFERENCES `tagovi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `serije_zanrovi`
--
ALTER TABLE `serije_zanrovi`
  ADD CONSTRAINT `fk_1` FOREIGN KEY (`id_serije`) REFERENCES `serije` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_2` FOREIGN KEY (`id_zanra`) REFERENCES `zanrovi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
